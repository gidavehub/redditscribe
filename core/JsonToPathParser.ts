// core/JsonToPathParser.ts

import { DrawCommand } from '../services/geminiService';
import {
    getArcPath,
    getCharacterPath,
    getCirclePath,
    getMatrixDimensions,
    getMatrixPath
} from './paths';

export interface PathInstruction {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}

export type OrchestratorInstruction =
  | PathInstruction
  | { type: 'pause'; duration: number }
  | { type: 'speak'; text: string }; // <-- Added speak instruction type

export interface ParsedScript {
    instructions: OrchestratorInstruction[];
    viewBox: string | null;
}


/**
 * Helper function to find the content inside a pair of matching braces.
 * It correctly handles nested braces.
 */
const extractBracedContent = (text: string): { content: string; remainder: string } | null => {
    if (text.charAt(0) !== '{') {
        return null;
    }

    let braceDepth = 1;
    for (let i = 1; i < text.length; i++) {
        if (text.charAt(i) === '{') {
            braceDepth++;
        } else if (text.charAt(i) === '}') {
            braceDepth--;
        }

        if (braceDepth === 0) {
            return {
                content: text.substring(1, i),
                remainder: text.substring(i + 1),
            };
        }
    }
    return null; // Unmatched brace
};


/**
 * A robust layout engine for equations that handles fractions, superscripts, square roots, and matrices.
 */
const layoutEquation = (equation: string, startX: number, startY: number, charSize: number): { paths: PathInstruction[], bounds: { minX: number, minY: number, maxX: number, maxY: number } } => {
    const instructions: PathInstruction[] = [];
    let cursorX = startX;
    let cursorY = startY;
    
    let tempEquation = equation
      .replace(/\\pm/g, '±')
      .replace(/\\int/g, '∫')
      .trim();

    while (tempEquation.length > 0) {
        if (tempEquation.startsWith('\\begin{bmatrix}')) {
            const startIndex = tempEquation.indexOf('}') + 1;
            const endIndex = tempEquation.indexOf('\\end{bmatrix}');
            
            if (endIndex === -1) { // Malformed
                tempEquation = tempEquation.substring(startIndex); 
                continue;
            }

            const matrixContent = tempEquation.substring(startIndex, endIndex).trim();
            const rows = matrixContent.split('\\\\');
            const data = rows.map(row => row.split('&').map(cell => cell.trim()));
            
            const { height } = getMatrixDimensions(data, charSize);
            const matrixStartY = cursorY - height / 2;

            const matrixPaths = getMatrixPath(data, { x: cursorX, y: matrixStartY }, charSize);
            matrixPaths.forEach(path => instructions.push({ d: path }));

            const { width } = getMatrixDimensions(data, charSize);
            cursorX += width + (charSize * 0.5);

            tempEquation = tempEquation.substring(endIndex + '\\end{bmatrix}'.length).trim();
            continue;
        }
        
        if (tempEquation.startsWith('\\frac')) {
            const afterFrac = tempEquation.substring(5);
            const numResult = extractBracedContent(afterFrac);
            if (!numResult) { tempEquation = afterFrac; continue; }

            const denResult = extractBracedContent(numResult.remainder);
            if (!denResult) { tempEquation = numResult.remainder; continue; }

            const itemSize = charSize * 0.8;
            const { bounds: numBounds } = layoutEquation(numResult.content, 0, 0, itemSize);
            const { bounds: denBounds } = layoutEquation(denResult.content, 0, 0, itemSize);
            const maxWidth = Math.max(numBounds.maxX, denBounds.maxX);

            const numOffsetX = (maxWidth - numBounds.maxX) / 2;
            const denOffsetX = (maxWidth - denBounds.maxX) / 2;

            const { paths: numPaths } = layoutEquation(numResult.content, cursorX + numOffsetX, cursorY - charSize * 0.7, itemSize);
            const { paths: denPaths } = layoutEquation(denResult.content, cursorX + denOffsetX, cursorY + charSize * 0.3, itemSize);

            const barY = cursorY + charSize * 0.1;
            instructions.push({ d: `M ${cursorX} ${barY} H ${cursorX + maxWidth}` });
            instructions.push(...numPaths, ...denPaths);

            cursorX += maxWidth + charSize * 0.2;
            tempEquation = denResult.remainder.trim();
            continue;
        }

        if (tempEquation.startsWith('\\sqrt')) {
            const afterSqrt = tempEquation.substring(5);
            const contentResult = extractBracedContent(afterSqrt);
            if (!contentResult) { tempEquation = afterSqrt; continue; }

            const sqrtSymbolWidth = charSize * 0.6;
            const sqrtPath = getCharacterPath('√', { x: cursorX, y: cursorY }, charSize);
            if (sqrtPath) instructions.push({ d: sqrtPath });

            const contentStartX = cursorX + sqrtSymbolWidth;
            const { paths: contentPaths, bounds: contentBounds } = layoutEquation(contentResult.content, contentStartX, cursorY, charSize);
            instructions.push(...contentPaths);

            const roofY = cursorY - charSize * 0.05;
            instructions.push({ d: `M ${contentStartX - (charSize * 0.1)} ${roofY} H ${contentBounds.maxX}` });

            cursorX = contentBounds.maxX + charSize * 0.1;
            tempEquation = contentResult.remainder.trim();
            continue;
        }

        const char = tempEquation[0];
        let advance = charSize * (char === ' ' ? 0.4 : 0.8);
        
        if (char === '_') {
            let content = '';
            let remainder = '';

            if (tempEquation.charAt(1) === '{') {
                const result = extractBracedContent(tempEquation.substring(1));
                 if(result) {
                    content = result.content;
                    remainder = result.remainder;
                }
            } else {
                content = tempEquation.substring(1, 2);
                remainder = tempEquation.substring(2);
            }
            if(content) {
                const subSize = charSize * 0.6;
                const subY = cursorY + charSize * 0.3;
                const { paths: subPaths, bounds: subBounds } = layoutEquation(content, cursorX, subY, subSize);
                instructions.push(...subPaths);
                cursorX = subBounds.maxX;
                tempEquation = remainder.trim();
                continue;
            }
        }

        if (char === '^') {
            let content = '';
            let remainder = '';
            
            if (tempEquation.charAt(1) === '{') {
                const result = extractBracedContent(tempEquation.substring(1));
                if(result) {
                    content = result.content;
                    remainder = result.remainder;
                }
            } else {
                content = tempEquation.substring(1, 2);
                remainder = tempEquation.substring(2);
            }
            
            if (content) {
                const superSize = charSize * 0.6;
                const superY = cursorY - charSize * 0.5;
                const { paths: superPaths, bounds: superBounds } = layoutEquation(content, cursorX, superY, superSize);
                instructions.push(...superPaths);
                cursorX = superBounds.maxX;
                tempEquation = remainder.trim();
                continue;
            }
        }
        
        if (char !== ' ') {
            const charPath = getCharacterPath(char, { x: cursorX, y: cursorY }, charSize);
            if (charPath) instructions.push({ d: charPath });
        }
        
        cursorX += advance;
        tempEquation = tempEquation.substring(1);
    }
    
    const finalBounds = { minX: startX, minY: startY, maxX: cursorX, maxY: startY + charSize };
    return { paths: instructions, bounds: finalBounds };
};

export const parseAiCommandsToInstructions = (commands: DrawCommand[]): ParsedScript => {
    const instructions: OrchestratorInstruction[] = [];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    const updateBounds = (x: number, y: number, w: number, h: number) => {
        if (!isFinite(x) || !isFinite(y)) return;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + w);
        maxY = Math.max(maxY, y + h);
    };

    commands.forEach(cmd => {
        switch (cmd.command) {
            case 'drawEquation':
            case 'drawText': {
                const text = cmd.command === 'drawEquation' ? cmd.payload.equation! : cmd.payload.text!;
                const size = cmd.payload.charSize || cmd.payload.fontSize || 20;

                // --- THE FIX IS HERE: Add a "speak" instruction before drawing ---
                if (text) {
                  instructions.push({ type: 'speak', text });
                }

                const { paths, bounds } = layoutEquation(text, cmd.payload.x, cmd.payload.y, size);
                instructions.push(...paths);
                updateBounds(bounds.minX, bounds.minY - size, bounds.maxX - bounds.minX, (bounds.maxY - bounds.minY) + size * 2);
                break;
            }
            case 'drawLine': {
                const { x1, y1, x2, y2 } = cmd.payload;
                instructions.push({ d: `M ${x1} ${y1} L ${x2} ${y2}` });
                updateBounds(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
                break;
            }
            case 'drawCircle': {
                const { cx, cy, r } = cmd.payload;
                instructions.push({ d: getCirclePath(cx, cy, r) });
                updateBounds(cx - r, cy - r, r * 2, r * 2);
                break;
            }
            case 'drawArc': {
                const { cx, cy, r, startAngle, endAngle } = cmd.payload;
                instructions.push({ d: getArcPath(cx, cy, r, startAngle, endAngle) });
                updateBounds(cx - r, cy - r, r * 2, r * 2);
                break;
            }
            case 'drawShape': {
                const { d, fill, stroke, strokeWidth } = cmd.payload;
                instructions.push({ d, fill, stroke, strokeWidth });
                // Note: Bounding box for arbitrary shapes is not calculated here.
                // This would require a more complex SVG path parser.
                break;
            }
            case 'drawMatrix': {
                const { data, cellSize, x, y } = cmd.payload;
                const paths = getMatrixPath(data, { x, y }, cellSize);
                paths.forEach(path => instructions.push({ d: path }));
                const { width, height } = getMatrixDimensions(data, cellSize);
                updateBounds(x, y, width, height);
                break;
            }
            case 'pause': {
                instructions.push({ type: 'pause', duration: cmd.payload.duration! });
                break;
            }
        }
    });
    
    let viewBox: string | null = null;
    if (isFinite(minX) && isFinite(minY) && isFinite(maxX) && isFinite(maxY)) {
        const padding = 30;
        const width = (maxX - minX) + padding * 2;
        const height = (maxY - minY) + padding * 2;
        viewBox = `${minX - padding} ${minY - padding} ${width} ${height}`;
    }
    
    return { instructions, viewBox };
};