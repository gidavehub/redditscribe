// core/paths.ts

// This is the definitive, high-precision drawing library for ScribeAI.
// Version 3.1: Patched square root glyph for dynamic sizing and fixed coordinate calculation errors.
// The character set is vastly expanded with over 50 new mathematical and logical symbols.
// The matrix path logic is refined for better spacing and clarity.

interface Point { x: number; y: number; }

export const getCharacterPath = (char: string, p: Point, s: number): string => {
    // A comprehensive dispatcher function for all supported characters.
    // All glyphs are designed within a {0, 0} to {s, s} bounding box, with consistent typographic metrics.
    // Baseline: y+s, x-height: y+s*0.45, cap-height: y
    switch (char) {
        // --- NUMBERS (LINING FIGURES) ---
        case '0': return `M ${p.x+s/2} ${p.y} C ${p.x+s*0.95} ${p.y}, ${p.x+s*0.95} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.05} ${p.y+s}, ${p.x+s*0.05} ${p.y}, ${p.x+s/2} ${p.y} z`;
        case '1': return `M ${p.x+s*0.3} ${p.y+s*0.2} L ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s} H ${p.x+s*0.8}`;
        case '2': return `M ${p.x+s*0.1} ${p.y+s*0.3} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s*0.4} L ${p.x+s*0.1} ${p.y+s} H ${p.x+s*0.9}`;
        case '3': return `M ${p.x+s*0.2} ${p.y+s*0.1} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s*0.5}, ${p.x+s*0.5} ${p.y+s*0.5} C ${p.x+s*0.9} ${p.y+s*0.5}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.2} ${p.y+s*0.9}`;
        case '4': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s*0.6} H ${p.x+s*0.8} M ${p.x+s*0.6} ${p.y} V ${p.y+s}`;
        case '5': return `M ${p.x+s*0.9} ${p.y} H ${p.x+s*0.2} V ${p.y+s*0.45} C ${p.x+s*0.2} ${p.y+s*0.45}, ${p.x+s} ${p.y+s*0.3}, ${p.x+s*0.8} ${p.y+s*0.9}`;
        case '6': return `M ${p.x+s*0.8} ${p.y} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z`;
        case '7': return `M ${p.x+s*0.1} ${p.y} H ${p.x+s*0.9} L ${p.x+s*0.3} ${p.y+s}`;
        case '8': return `M ${p.x+s/2} ${p.y+s/2} C ${p.x+s*0.9} ${p.y+s/2}, ${p.x+s*0.9} ${p.y}, ${p.x+s/2} ${p.y} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.1} ${p.y+s/2}, ${p.x+s/2} ${p.y+s/2} C ${p.x+s*0.1} ${p.y+s/2}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s/2}, ${p.x+s/2} ${p.y+s/2} z`;
        case '9': return `M ${p.x+s*0.2} ${p.y+s} C ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y}, ${p.x+s/2} ${p.y} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.1} ${p.y+s*0.55}, ${p.x+s/2} ${p.y+s*0.55} z`;

        // --- LOWERCASE ALPHABET --- (x-height: 0.45, baseline: s)
        case 'a': return `M ${p.x+s*0.8} ${p.y+s*0.45} V ${p.y+s} M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z`;
        case 'b': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.2} ${p.y+s}`;
        case 'c': return `M ${p.x+s*0.8} ${p.y+s*0.55} C ${p.x+s*0.8} ${p.y+s*0.45}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s*0.2} ${p.y+s*0.75} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}, ${p.x+s*0.8} ${p.y+s*0.9}`;
        case 'd': return `M ${p.x+s*0.8} ${p.y} V ${p.y+s} M ${p.x+s*0.8} ${p.y+s*0.45} C ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}`;
        case 'e': return `M ${p.x+s*0.1} ${p.y+s*0.7} H ${p.x+s*0.9} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s*0.2} ${p.y+s*0.55}`;
        case 'f': return `M ${p.x+s*0.7} ${p.y} C ${p.x+s*0.7} ${p.y}, ${p.x+s*0.3} ${p.y}, ${p.x+s*0.3} ${p.y+s*0.3} V ${p.y+s} M ${p.x+s*0.1} ${p.y+s/2} H ${p.x+s*0.6}`;
        case 'g': return `M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z M ${p.x+s*0.8} ${p.y+s*0.45} V ${p.y+s*1.2} C ${p.x+s*0.8} ${p.y+s*1.2}, ${p.x} ${p.y+s*1.2}, ${p.x+s*0.3} ${p.y+s*0.9}`;
        case 'h': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}`;
        case 'i': return `M ${p.x+s/2} ${p.y+s*0.45} V ${p.y+s} M ${p.x+s/2} ${p.y+s*0.25} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z`;
        case 'j': return `M ${p.x+s*0.6} ${p.y+s*0.45} V ${p.y+s*1.2} C ${p.x+s*0.6} ${p.y+s*1.2}, ${p.x} ${p.y+s*1.2}, ${p.x+s*0.2} ${p.y+s*0.9} M ${p.x+s*0.6} ${p.y+s*0.25} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z`;
        case 'k': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.8} ${p.y+s*0.45} L ${p.x+s*0.4} ${p.y+s*0.65} L ${p.x+s*0.8} ${p.y+s}`;
        case 'l': return `M ${p.x+s/2} ${p.y} V ${p.y+s}`;
        case 'm': return `M ${p.x+s*0.1} ${p.y+s*0.45} V ${p.y+s} M ${p.x+s*0.1} ${p.y+s*0.45} C ${p.x+s*0.5} ${p.y+s*0.45}, ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.5} ${p.y+s} V ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}`;
        case 'n': return `M ${p.x+s*0.2} ${p.y+s*0.45} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}`;
        case 'o': return `M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z`;
        case 'p': return `M ${p.x+s*0.2} ${p.y+s*0.45} V ${p.y+s*1.2} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.2} ${p.y+s}`;
        case 'q': return `M ${p.x+s*0.8} ${p.y+s*0.45} V ${p.y+s*1.2} M ${p.x+s*0.8} ${p.y+s*0.45} C ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}`;
        case 'r': return `M ${p.x+s*0.2} ${p.y+s*0.45} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.8} ${p.y+s*0.45}, ${p.x+s*0.7} ${p.y+s*0.6}`;
        case 's': return `M ${p.x+s*0.9} ${p.y+s*0.55} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s*0.2} ${p.y+s*0.7} C ${p.x+s*0.9} ${p.y+s*0.7}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.9}`;
        case 't': return `M ${p.x+s/2} ${p.y+s*0.1} V ${p.y+s} C ${p.x+s/2} ${p.y+s}, ${p.x+s} ${p.y+s}, ${p.x+s*0.8} ${p.y+s} M ${p.x+s*0.1} ${p.y+s*0.4} H ${p.x+s*0.9}`;
        case 'u': return `M ${p.x+s*0.15} ${p.y+s*0.45} V ${p.y+s*0.8} C ${p.x+s*0.15} ${p.y+s}, ${p.x+s*0.85} ${p.y+s}, ${p.x+s*0.85} ${p.y+s*0.8} V ${p.y+s*0.45}`;
        case 'v': return `M ${p.x+s*0.1} ${p.y+s*0.45} L ${p.x+s/2} ${p.y+s} L ${p.x+s*0.9} ${p.y+s*0.45}`;
        case 'w': return `M ${p.x} ${p.y+s*0.45} L ${p.x+s*0.3} ${p.y+s} L ${p.x+s/2} ${p.y+s*0.6} L ${p.x+s*0.7} ${p.y+s} L ${p.x+s} ${p.y+s*0.45}`;
        case 'x': return `M ${p.x+s*0.1} ${p.y+s*0.45} L ${p.x+s*0.9} ${p.y+s} M ${p.x+s*0.9} ${p.y+s*0.45} L ${p.x+s*0.1} ${p.y+s}`;
        case 'y': return `M ${p.x+s*0.1} ${p.y+s*0.45} L ${p.x+s/2} ${p.y+s} L ${p.x+s*0.9} ${p.y+s*0.45} M ${p.x+s/2} ${p.y+s} V ${p.y+s*1.2} C ${p.x+s/2} ${p.y+s*1.2}, ${p.x} ${p.y+s*1.2}, ${p.x+s*0.2} ${p.y+s*0.9}`;
        case 'z': return `M ${p.x+s*0.1} ${p.y+s*0.45} H ${p.x+s*0.9} L ${p.x+s*0.1} ${p.y+s} H ${p.x+s*0.9}`;

        // --- UPPERCASE ALPHABET ---
        case 'A': return `M ${p.x+s*0.1} ${p.y+s} L ${p.x+s/2} ${p.y} L ${p.x+s*0.9} ${p.y+s} M ${p.x+s*0.25} ${p.y+s*0.6} H ${p.x+s*0.75}`;
        case 'B': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} H ${p.x+s*0.5} C ${p.x+s} ${p.y+s}, ${p.x+s} ${p.y+s/2}, ${p.x+s*0.5} ${p.y+s/2} C ${p.x+s*0.9} ${p.y+s/2}, ${p.x+s*0.9} ${p.y}, ${p.x+s*0.2} ${p.y} z`;
        case 'C': return `M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.1} ${p.y}, ${p.x+s*0.2} ${p.y+s/2} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.8}`;
        case 'D': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} H ${p.x+s*0.5} C ${p.x+s} ${p.y+s}, ${p.x+s} ${p.y}, ${p.x+s*0.2} ${p.y} z`;
        case 'E': return `M ${p.x+s*0.9} ${p.y} H ${p.x+s*0.2} V ${p.y+s} H ${p.x+s*0.9} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8}`;
        case 'F': return `M ${p.x+s*0.9} ${p.y} H ${p.x+s*0.2} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8}`;
        case 'G': return `M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.1} ${p.y}, ${p.x+s*0.2} ${p.y+s/2} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.8} V ${p.y+s*0.6} H ${p.x+s/2}`;
        case 'H': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.8} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8}`;
        case 'I': return `M ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y} H ${p.x+s*0.8} M ${p.x+s*0.2} ${p.y+s} H ${p.x+s*0.8}`;
        case 'J': return `M ${p.x+s*0.9} ${p.y} V ${p.y+s*0.8} C ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.7}`;
        case 'K': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.9} ${p.y} L ${p.x+s*0.4} ${p.y+s/2} L ${p.x+s*0.9} ${p.y+s}`;
        case 'L': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} H ${p.x+s*0.9}`;
        case 'M': return `M ${p.x+s*0.1} ${p.y+s} V ${p.y} L ${p.x+s/2} ${p.y+s*0.6} L ${p.x+s*0.9} ${p.y} V ${p.y+s}`;
        case 'N': return `M ${p.x+s*0.1} ${p.y+s} V ${p.y} L ${p.x+s*0.9} ${p.y+s} V ${p.y}`;
        case 'O': return `M ${p.x+s/2} ${p.y} C ${p.x+s*0.95} ${p.y}, ${p.x+s*0.95} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.05} ${p.y+s}, ${p.x+s*0.05} ${p.y}, ${p.x+s/2} ${p.y} z`;
        case 'P': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s/2}, ${p.x+s*0.2} ${p.y+s/2}`;
        case 'Q': return `M ${p.x+s/2} ${p.y} C ${p.x+s*0.95} ${p.y}, ${p.x+s*0.95} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.05} ${p.y+s}, ${p.x+s*0.05} ${p.y}, ${p.x+s/2} ${p.y} z M ${p.x+s*0.6} ${p.y+s*0.7} L ${p.x+s} ${p.y+s}`;
        case 'R': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s/2}, ${p.x+s*0.2} ${p.y+s/2} L ${p.x+s*0.9} ${p.y+s}`;
        case 'S': return `M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.1} ${p.y}, ${p.x+s*0.2} ${p.y+s*0.4} C ${p.x} ${p.y+s*0.6}, ${p.x+s} ${p.y+s*0.6}, ${p.x+s*0.8} ${p.y+s*0.9} C ${p.x+s} ${p.y+s}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.8}`;
        case 'T': return `M ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x+s*0.1} ${p.y} H ${p.x+s*0.9}`;
        case 'U': return `M ${p.x+s*0.1} ${p.y} V ${p.y+s*0.7} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.7} V ${p.y}`;
        case 'V': return `M ${p.x} ${p.y} L ${p.x+s/2} ${p.y+s} L ${p.x+s} ${p.y}`;
        case 'W': return `M ${p.x} ${p.y} L ${p.x+s*0.3} ${p.y+s} L ${p.x+s/2} ${p.y+s*0.3} L ${p.x+s*0.7} ${p.y+s} L ${p.x+s} ${p.y}`;
        case 'X': return `M ${p.x} ${p.y} L ${p.x+s} ${p.y+s} M ${p.x+s} ${p.y} L ${p.x} ${p.y+s}`;
        case 'Y': return `M ${p.x} ${p.y} L ${p.x+s/2} ${p.y+s/2} L ${p.x+s} ${p.y} M ${p.x+s/2} ${p.y+s/2} V ${p.y+s}`;
        case 'Z': return `M ${p.x} ${p.y} H ${p.x+s} L ${p.x} ${p.y+s} H ${p.x+s}`;
        
        // --- COMMON PUNCTUATION & SYMBOLS ---
        case ' ': return '';
        case '.': return `M ${p.x+s/2} ${p.y+s-s*0.1} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z`;
        case ',': return `M ${p.x+s/2} ${p.y+s-s*0.1} v ${s*0.15} a ${s*0.1} ${s*0.1} 0 0 0 -${s*0.1} 0`;
        case '!': return `M ${p.x+s/2} ${p.y} V ${p.y+s*0.75} M ${p.x+s/2} ${p.y+s*0.9} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z`;
        case '?': return `M ${p.x+s*0.1} ${p.y+s*0.2} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.9} ${p.y}, ${p.x+s/2} ${p.y+s*0.5} V ${p.y+s*0.7} M ${p.x+s/2} ${p.y+s*0.9} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z`;
        case ':': return `M ${p.x+s/2} ${p.y+s*0.4} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z M ${p.x+s/2} ${p.y+s-s*0.1} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z`;
        case ';': return `M ${p.x+s/2} ${p.y+s*0.4} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z M ${p.x+s/2} ${p.y+s-s*0.1} v ${s*0.15} a ${s*0.1} ${s*0.1} 0 0 0 -${s*0.1} 0`;
        case '-': return `M ${p.x+s*0.15} ${p.y+s*0.5} H ${p.x+s*0.85}`;
        case '–': return `M ${p.x+s*0.1} ${p.y+s*0.5} H ${p.x+s*0.9}`; // En dash
        case '—': return `M ${p.x} ${p.y+s*0.5} H ${p.x+s}`; // Em dash
        case '_': return `M ${p.x} ${p.y+s} H ${p.x+s}`;
        case '(': return `M ${p.x+s*0.7} ${p.y} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.7} ${p.y+s}`;
        case ')': return `M ${p.x+s*0.3} ${p.y} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.3} ${p.y+s}`;
        case '[': return `M ${p.x+s*0.6} ${p.y} H ${p.x+s*0.3} V ${p.y+s} H ${p.x+s*0.6}`;
        case ']': return `M ${p.x+s*0.4} ${p.y} H ${p.x+s*0.7} V ${p.y+s} H ${p.x+s*0.4}`;
        case '{': return `M ${p.x+s*0.8} ${p.y} C ${p.x+s*0.5} ${p.y}, ${p.x+s*0.2} ${p.y+s*0.3}, ${p.x+s*0.2} ${p.y+s/2} C ${p.x+s*0.2} ${p.y+s*0.7}, ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}`;
        case '}': return `M ${p.x+s*0.2} ${p.y} C ${p.x+s*0.5} ${p.y}, ${p.x+s*0.8} ${p.y+s*0.3}, ${p.x+s*0.8} ${p.y+s/2} C ${p.x+s*0.8} ${p.y+s*0.7}, ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.2} ${p.y+s}`;
        case '|': return `M ${p.x+s/2} ${p.y} V ${p.y+s}`; // Absolute value
        case "'": return `M ${p.x+s/2} ${p.y} v ${s*0.3}`;
        case '"': return `M ${p.x+s*0.35} ${p.y} v ${s*0.3} M ${p.x+s*0.65} ${p.y} v ${s*0.3}`;
        case '‘': return `M ${p.x+s*0.4} ${p.y+s*0.3} C ${p.x+s*0.4} ${p.y}, ${p.x+s*0.2} ${p.y}, ${p.x+s*0.2} ${p.y+s*0.1}`; // Left single quote
        case '’': return `M ${p.x+s*0.2} ${p.y} C ${p.x+s*0.2} ${p.y+s*0.3}, ${p.x+s*0.4} ${p.y+s*0.3}, ${p.x+s*0.4} ${p.y+s*0.2}`; // Right single quote / apostrophe
        case '“': return `M ${p.x+s*0.4} ${p.y+s*0.3} C ${p.x+s*0.4} ${p.y}, ${p.x+s*0.2} ${p.y}, ${p.x+s*0.2} ${p.y+s*0.1} M ${p.x+s*0.6} ${p.y+s*0.3} C ${p.x+s*0.6} ${p.y}, ${p.x+s*0.4} ${p.y}, ${p.x+s*0.4} ${p.y+s*0.1}`; // Left double quote
        case '”': return `M ${p.x+s*0.2} ${p.y} C ${p.x+s*0.2} ${p.y+s*0.3}, ${p.x+s*0.4} ${p.y+s*0.3}, ${p.x+s*0.4} ${p.y+s*0.2} M ${p.x+s*0.4} ${p.y} C ${p.x+s*0.4} ${p.y+s*0.3}, ${p.x+s*0.6} ${p.y+s*0.3}, ${p.x+s*0.6} ${p.y+s*0.2}`; // Right double quote
        case '/': return `M ${p.x+s*0.1} ${p.y+s} L ${p.x+s*0.9} ${p.y}`;
        case '\\':return `M ${p.x+s*0.1} ${p.y} L ${p.x+s*0.9} ${p.y+s}`;
        case '…': return `M ${p.x+s*0.1} ${p.y+s-s*0.1} a ${s*0.05} ${s*0.05} 0 1 0 .01 0z M ${p.x+s*0.5} ${p.y+s-s*0.1} a ${s*0.05} ${s*0.05} 0 1 0 .01 0z M ${p.x+s*0.9} ${p.y+s-s*0.1} a ${s*0.05} ${s*0.05} 0 1 0 .01 0z`;
        case '•': return `M ${p.x+s/2} ${p.y+s/2} a ${s*0.1} ${s*0.1} 0 1 0 .01 0z`;
        
        // --- MATHEMATICAL OPERATORS ---
        case '+': return `M ${p.x+s/2} ${p.y+s*0.2} V ${p.y+s*0.8} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8}`;
        case '=': return `M ${p.x+s*0.1} ${p.y+s*0.4} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y+s*0.6} H ${p.x+s*0.9}`;
        case '±': return `M ${p.x+s/2} ${p.y+s*0.1} V ${p.y+s*0.5} M ${p.x+s*0.3} ${p.y+s*0.3} H ${p.x+s*0.7} M ${p.x+s*0.2} ${p.y+s*0.8} H ${p.x+s*0.8}`;
        case '*': return `M ${p.x+s/2} ${p.y+s*0.3} V ${p.y+s*0.7} M ${p.x+s*0.3} ${p.y+s/2} H ${p.x+s*0.7} M ${p.x+s*0.35} ${p.y+s*0.35} L ${p.x+s*0.65} ${p.y+s*0.65} M ${p.x+s*0.65} ${p.y+s*0.35} L ${p.x+s*0.35} ${p.y+s*0.65}`;
        case '×': return `M ${p.x+s*0.2} ${p.y+s*0.3} L ${p.x+s*0.8} ${p.y+s*0.7} M ${p.x+s*0.8} ${p.y+s*0.3} L ${p.x+s*0.2} ${p.y+s*0.7}`;
        case '÷': return `M ${p.x+s*0.1} ${p.y+s/2} H ${p.x+s*0.9} M ${p.x+s/2} ${p.y+s*0.3} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z M ${p.x+s/2} ${p.y+s*0.7} a ${s*0.06} ${s*0.06} 0 1 0 0.01 0 z`;
        case '√': return `M ${p.x+s*0.1} ${p.y+s*0.6} L ${p.x+s*0.3} ${p.y+s} L ${p.x+s*0.5} ${p.y}`; // Square Root (vinculum/bar removed)
        case '%': return `M ${p.x+s*0.2} ${p.y+s*0.2} a ${s*0.15} ${s*0.15} 0 1 0 0.01 0 z M ${p.x+s*0.8} ${p.y+s*0.8} a ${s*0.15} ${s*0.15} 0 1 0 0.01 0 z M ${p.x+s*0.1} ${p.y+s} L ${p.x+s*0.9} ${p.y}`;
        case '@': return `M ${p.x+s*0.8} ${p.y+s/2} A ${s*0.3} ${s*0.3} 0 1 0 ${p.x+s/2} ${p.y+s*0.8} C ${p.x+s*0.6} ${p.y+s*0.8}, ${p.x+s*0.6} ${p.y+s*0.3}, ${p.x+s*0.2} ${p.y+s*0.3} M ${p.x+s/2} ${p.y} A ${s/2} ${s/2} 0 1 0 ${p.x+s*0.85} ${p.y+s*0.85}`;
        case '&': return `M ${p.x+s*0.9} ${p.y+s} C ${p.x} ${p.y+s}, ${p.x} ${p.y}, ${p.x+s*0.6} ${p.y} S ${p.x+s*0.3} ${p.y+s*0.8}, ${p.x} ${p.y+s*0.7} L ${p.x+s} ${p.y}`;
        case '#': return `M ${p.x+s*0.3} ${p.y} V ${p.y+s} M ${p.x+s*0.7} ${p.y} V ${p.y+s} M ${p.x} ${p.y+s*0.35} H ${p.x+s} M ${p.x} ${p.y+s*0.65} H ${p.x+s}`;
        case '$': return `M ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x} ${p.y}, ${p.x} ${p.y+s/2}, ${p.x+s/2} ${p.y+s/2} C ${p.x} ${p.y+s/2}, ${p.x+s} ${p.y+s/2}, ${p.x+s*0.1} ${p.y+s*0.8}`;
        case '^': return `M ${p.x+s*0.2} ${p.y+s*0.3} L ${p.x+s/2} ${p.y} L ${p.x+s*0.8} ${p.y+s*0.3}`;
        case '<': return `M ${p.x+s*0.8} ${p.y+s*0.1} L ${p.x+s*0.2} ${p.y+s/2} L ${p.x+s*0.8} ${p.y+s*0.9}`;
        case '>': return `M ${p.x+s*0.2} ${p.y+s*0.1} L ${p.x+s*0.8} ${p.y+s/2} L ${p.x+s*0.2} ${p.y+s*0.9}`;
        case '≤': return `M ${p.x+s*0.8} ${p.y+s*0.1} L ${p.x+s*0.2} ${p.y+s/2} L ${p.x+s*0.8} ${p.y+s*0.9} M ${p.x+s*0.1} ${p.y+s} H ${p.x+s*0.9}`;
        case '≥': return `M ${p.x+s*0.2} ${p.y+s*0.1} L ${p.x+s*0.8} ${p.y+s/2} L ${p.x+s*0.2} ${p.y+s*0.9} M ${p.x+s*0.1} ${p.y+s} H ${p.x+s*0.9}`;
        case '≠': return `M ${p.x+s*0.1} ${p.y+s*0.4} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y+s*0.6} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y+s} L ${p.x+s*0.9} ${p.y}`;
        case '≈': return `M ${p.x+s*0.1} ${p.y+s*0.3} C ${p.x+s/2} ${p.y+s*0.1}, ${p.x+s/2} ${p.y+s*0.5}, ${p.x+s*0.9} ${p.y+s*0.3} M ${p.x+s*0.1} ${p.y+s*0.7} C ${p.x+s/2} ${p.y+s*0.5}, ${p.x+s/2} ${p.y+s*0.9}, ${p.x+s*0.9} ${p.y+s*0.7}`;
        
        // --- SUPERSCRIPTS ---
        case '²': return `M ${p.x+s*0.1} ${p.y+s*0.15} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.5} ${p.y}, ${p.x+s*0.5} ${p.y+s*0.2} L ${p.x+s*0.1} ${p.y+s*0.5} H ${p.x+s*0.5}`;
        case '³': return `M ${p.x+s*0.1} ${p.y+s*0.05} C ${p.x+s*0.5} ${p.y}, ${p.x+s*0.5} ${p.y+s*0.25}, ${p.x+s*0.3} ${p.y+s*0.25} C ${p.x+s*0.5} ${p.y+s*0.25}, ${p.x+s*0.5} ${p.y+s*0.5}, ${p.x+s*0.1} ${p.y+s*0.45}`;

        // --- GREEK & ADVANCED MATH ---
        case 'π': return `M ${p.x} ${p.y+s*0.2} h ${s} M ${p.x+s*0.2} ${p.y+s*0.2} v ${s*0.8} M ${p.x+s*0.8} ${p.y+s*0.2} v ${s*0.8}`;
        case 'Σ': return `M ${p.x} ${p.y} H ${p.x+s} L ${p.x+s/2} ${p.y+s/2} L ${p.x+s} ${p.y+s} H ${p.x}`;
        case 'Δ': return `M ${p.x} ${p.y+s} L ${p.x+s/2} ${p.y} L ${p.x+s} ${p.y+s} z`;
        case 'θ': return `M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z M ${p.x+s*0.2} ${p.y+s*0.7} H ${p.x+s*0.8}`;
        case 'α': return `M ${p.x+s*0.9} ${p.y+s} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s*0.3} ${p.y+s*0.5} C ${p.x} ${p.y}, ${p.x+s*0.8} ${p.y}, ${p.x+s*0.7} ${p.y+s}`;
        case 'β': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s*1.2} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.2} ${p.y+s}`;
        case '∫': return `M ${p.x+s*0.8} ${p.y} C ${p.x+s*0.2} ${p.y}, ${p.x+s*0.8} ${p.y+s}, ${p.x+s*0.2} ${p.y+s}`;
        case '∞': return `M ${p.x+s*0.25} ${p.y+s/2} C ${p.x} ${p.y+s*0.1}, ${p.x+s*0.5} ${p.y+s*0.9}, ${p.x+s*0.75} ${p.y+s/2} C ${p.x+s} ${p.y+s*0.9}, ${p.x+s*0.5} ${p.y+s*0.1}, ${p.x+s*0.25} ${p.y+s/2} z`;
        case '∂': return `M ${p.x+s*0.6} ${p.y} C ${p.x} ${p.y}, ${p.x+s} ${p.y+s}, ${p.x+s*0.4} ${p.y+s} S ${p.x+s*0.8} ${p.y+s*0.3}, ${p.x+s/2} ${p.y+s*0.3}`;

        // --- LOGIC & SET THEORY ---
        case '∀': return `M ${p.x+s*0.1} ${p.y} L ${p.x+s/2} ${p.y+s} L ${p.x+s*0.9} ${p.y} M ${p.x+s*0.25} ${p.y+s*0.6} H ${p.x+s*0.75}`;
        case '∃': return `M ${p.x+s*0.9} ${p.y} H ${p.x+s*0.1} C ${p.x} ${p.y}, ${p.x} ${p.y+s}, ${p.x+s*0.9} ${p.y+s} M ${p.x+s*0.1} ${p.y+s/2} H ${p.x+s*0.8}`;
        case '∈': return `M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.1} ${p.y}, ${p.x+s*0.2} ${p.y+s/2} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.8} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8}`;
        case '∉': return `M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.1} ${p.y}, ${p.x+s*0.2} ${p.y+s/2} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.8} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8} M ${p.x+s*0.1} ${p.y+s} L ${p.x+s*0.9} ${p.y}`;
        case '⊂': return `M ${p.x+s*0.9} ${p.y+s*0.1} C ${p.x+s*0.2} ${p.y+s*0.1}, ${p.x+s*0.2} ${p.y+s*0.9}, ${p.x+s*0.9} ${p.y+s*0.9}`;
        case '⊃': return `M ${p.x+s*0.1} ${p.y+s*0.1} C ${p.x+s*0.8} ${p.y+s*0.1}, ${p.x+s*0.8} ${p.y+s*0.9}, ${p.x+s*0.1} ${p.y+s*0.9}`;
        case '⊆': return `M ${p.x+s*0.9} ${p.y+s*0.1} C ${p.x+s*0.2} ${p.y+s*0.1}, ${p.x+s*0.2} ${p.y+s*0.8}, ${p.x+s*0.9} ${p.y+s*0.8} M ${p.x+s*0.2} ${p.y+s} H ${p.x+s*0.9}`;
        case '⊇': return `M ${p.x+s*0.1} ${p.y+s*0.1} C ${p.x+s*0.8} ${p.y+s*0.1}, ${p.x+s*0.8} ${p.y+s*0.8}, ${p.x+s*0.1} ${p.y+s*0.8} M ${p.x+s*0.1} ${p.y+s} H ${p.x+s*0.8}`;
        case '∩': return `M ${p.x+s*0.1} ${p.y} V ${p.y+s*0.7} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s*0.7} V ${p.y}`;
        case '∪': return `M ${p.x+s*0.1} ${p.y+s} V ${p.y+s*0.3} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.3} V ${p.y+s}`;
        
        // --- ARROWS ---
        case '→': return `M ${p.x} ${p.y+s/2} H ${p.x+s} M ${p.x+s*0.7} ${p.y+s*0.2} L ${p.x+s} ${p.y+s/2} L ${p.x+s*0.7} ${p.y+s*0.8}`;
        case '←': return `M ${p.x} ${p.y+s/2} H ${p.x+s} M ${p.x+s*0.3} ${p.y+s*0.2} L ${p.x} ${p.y+s/2} L ${p.x+s*0.3} ${p.y+s*0.8}`;
        case '↑': return `M ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.3} L ${p.x+s/2} ${p.y} L ${p.x+s*0.8} ${p.y+s*0.3}`;
        case '↓': return `M ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.7} L ${p.x+s/2} ${p.y+s} L ${p.x+s*0.8} ${p.y+s*0.7}`;

                // --- GEOMETRY & TRIGONOMETRY ---
        case '°': return `M ${p.x+s/2} ${p.y+s*0.15} a ${s*0.15} ${s*0.15} 0 1 0 0.01 0 z`; // Degree symbol
        case '∠': return `M ${p.x+s*0.1} ${p.y} L ${p.x+s*0.1} ${p.y+s} H ${p.x+s}`; // Angle
        case '⊥': return `M ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x} ${p.y+s} H ${p.x+s}`; // Perpendicular
        case '∥': return `M ${p.x+s*0.3} ${p.y} V ${p.y+s} M ${p.x+s*0.7} ${p.y} V ${p.y+s}`; // Parallel
        case '△': return `M ${p.x+s/2} ${p.y} L ${p.x} ${p.y+s} H ${p.x+s} z`; // Triangle
        case '⊙': return `M ${p.x+s/2} ${p.y+s/2} a ${s/2} ${s/2} 0 1 0 0.01 0 z M ${p.x+s/2} ${p.y+s/2} a ${s*0.1} ${s*0.1} 0 1 0 0.01 0 z`; // Circle with dot center
        
        // --- CALCULUS & ANALYSIS ---
        case '∇': return `M ${p.x} ${p.y} L ${p.x+s} ${p.y} L ${p.x+s/2} ${p.y+s} z`; // Nabla (Del)
        case '∬': return `M ${p.x+s*0.7} ${p.y} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.7} ${p.y+s}, ${p.x+s*0.1} ${p.y+s} M ${p.x+s*0.9} ${p.y} C ${p.x+s*0.3} ${p.y}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.3} ${p.y+s}`; // Double Integral
        case '∭': return `M ${p.x+s*0.6} ${p.y} C ${p.x+s*0.0} ${p.y}, ${p.x+s*0.6} ${p.y+s}, ${p.x+s*0.0} ${p.y+s} M ${p.x+s*0.8} ${p.y} C ${p.x+s*0.2} ${p.y}, ${p.x+s*0.8} ${p.y+s}, ${p.x+s*0.2} ${p.y+s} M ${p.x+s} ${p.y} C ${p.x+s*0.4} ${p.y}, ${p.x+s} ${p.y+s}, ${p.x+s*0.4} ${p.y+s}`; // Triple Integral
        case '∮': return `M ${p.x+s/2} ${p.y+s/2} a ${s*0.3} ${s*0.3} 0 1 0 0.01 0 z M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.1} ${p.y+s}`; // Contour Integral
        case '′': return `M ${p.x+s*0.4} ${p.y} L ${p.x+s*0.6} ${p.y+s*0.3}`; // Prime
        case '″': return `M ${p.x+s*0.3} ${p.y} L ${p.x+s*0.5} ${p.y+s*0.3} M ${p.x+s*0.6} ${p.y} L ${p.x+s*0.8} ${p.y+s*0.3}`; // Double Prime

        // --- VECTORS & LINEAR ALGEBRA ---
        case '⋅': return `M ${p.x+s/2} ${p.y+s/2} a ${s*0.08} ${s*0.08} 0 1 0 0.01 0 z`; // Dot product
        case '⊗': return `M ${p.x+s/2} ${p.y+s/2} a ${s*0.4} ${s*0.4} 0 1 0 0.01 0 z M ${p.x+s*0.2} ${p.y+s*0.2} L ${p.x+s*0.8} ${p.y+s*0.8} M ${p.x+s*0.8} ${p.y+s*0.2} L ${p.x+s*0.2} ${p.y+s*0.8}`; // Tensor Product
        case '⊕': return `M ${p.x+s/2} ${p.y+s/2} a ${s*0.4} ${s*0.4} 0 1 0 0.01 0 z M ${p.x+s/2} ${p.y+s*0.1} V ${p.y+s*0.9} M ${p.x+s*0.1} ${p.y+s/2} H ${p.x+s*0.9}`; // Direct Sum / XOR
        
        // --- MORE LOGIC & SET THEORY ---
        case '∧': return `M ${p.x+s*0.1} ${p.y+s} L ${p.x+s/2} ${p.y} L ${p.x+s*0.9} ${p.y+s}`; // Conjunction (AND)
        case '∨': return `M ${p.x+s*0.1} ${p.y} L ${p.x+s/2} ${p.y+s} L ${p.x+s*0.9} ${p.y}`; // Disjunction (OR)
        case '¬': return `M ${p.x+s*0.2} ${p.y+s*0.4} H ${p.x+s*0.8} V ${p.y+s}`; // Negation
        case '⇔': return `M ${p.x} ${p.y+s/2} H ${p.x+s} M ${p.x+s*0.3} ${p.y+s*0.2} L ${p.x} ${p.y+s/2} L ${p.x+s*0.3} ${p.y+s*0.8} M ${p.x+s*0.7} ${p.y+s*0.2} L ${p.x+s} ${p.y+s/2} L ${p.x+s*0.7} ${p.y+s*0.8}`; // Equivalence
        case '⇒': return `M ${p.x} ${p.y+s/2} H ${p.x+s} M ${p.x+s*0.7} ${p.y+s*0.2} L ${p.x+s} ${p.y+s/2} L ${p.x+s*0.7} ${p.y+s*0.8} M ${p.x} ${p.y+s/2} H ${p.x+s*0.4}`; // Implication
        case '∅': return `M ${p.x+s/2} ${p.y} C ${p.x+s} ${p.y}, ${p.x+s} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x} ${p.y+s}, ${p.x} ${p.y}, ${p.x+s/2} ${p.y} z M ${p.x+s*0.1} ${p.y+s*0.1} L ${p.x+s*0.9} ${p.y+s*0.9}`; // Empty Set
        case '∁': return `M ${p.x+s*0.9} ${p.y+s*0.2} C ${p.x+s*0.9} ${p.y}, ${p.x*0.1} ${p.y}, ${p.x+s*0.2} ${p.y+s/2} C ${p.x*0.1} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s*0.8}`; // Complement (Same as C)
        case '⊄': return `M ${p.x+s*0.9} ${p.y+s*0.1} C ${p.x+s*0.2} ${p.y+s*0.1}, ${p.x+s*0.2} ${p.y+s*0.9}, ${p.x+s*0.9} ${p.y+s*0.9} M ${p.x+s*0.1} ${p.y+s} L ${p.x+s*0.9} ${p.y}`; // Not a subset
        
        // --- OTHER COMMON SYMBOLS ---
        case '∝': return `M ${p.x+s*0.25} ${p.y+s/2} C ${p.x} ${p.y+s*0.1}, ${p.x+s*0.5} ${p.y+s*0.9}, ${p.x+s*0.75} ${p.y+s/2} C ${p.x+s} ${p.y+s*0.9}, ${p.x+s*0.5} ${p.y+s*0.1}, ${p.x+s*0.25} ${p.y+s/2}`; // Proportional to (no close path 'z')
        case '≡': return `M ${p.x+s*0.1} ${p.y+s*0.3} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y+s*0.5} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y+s*0.7} H ${p.x+s*0.9}`; // Congruent to
        case '∴': return `M ${p.x+s/2} ${p.y+s*0.2} a ${s*0.08} ${s*0.08} 0 1 0 .01 0z M ${p.x+s*0.2} ${p.y+s*0.8} a ${s*0.08} ${s*0.08} 0 1 0 .01 0z M ${p.x+s*0.8} ${p.y+s*0.8} a ${s*0.08} ${s*0.08} 0 1 0 .01 0z`; // Therefore
        case '∵': return `M ${p.x+s/2} ${p.y+s*0.8} a ${s*0.08} ${s*0.08} 0 1 0 .01 0z M ${p.x+s*0.2} ${p.y+s*0.2} a ${s*0.08} ${s*0.08} 0 1 0 .01 0z M ${p.x+s*0.8} ${p.y+s*0.2} a ${s*0.08} ${s*0.08} 0 1 0 .01 0z`; // Because
        case 'ℵ': return `M ${p.x+s*0.1} ${p.y+s} L ${p.x+s*0.9} ${p.y} M ${p.x+s*0.9} ${p.y+s} L ${p.x+s*0.1} ${p.y} M ${p.x+s*0.3} ${p.y+s/2} C ${p.x+s*0.5} ${p.y+s*0.3}, ${p.x+s*0.5} ${p.y+s*0.7}, ${p.x+s*0.7} ${p.y+s/2}`; // Aleph

        // --- MORE GREEK ALPHABET (LOWERCASE) ---
        case 'γ': return `M ${p.x+s*0.1} ${p.y+s*0.6} C ${p.x+s*0.1} ${p.y+s*0.4}, ${p.x+s*0.9} ${p.y+s*0.4}, ${p.x+s*0.9} ${p.y+s*0.6} L ${p.x+s*0.5} ${p.y+s*1.2} C ${p.x+s*0.5} ${p.y+s*1.2}, ${p.x} ${p.y+s*1.2}, ${p.x+s*0.2} ${p.y+s*0.9}`;
        case 'δ': return `M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z M ${p.x+s*0.7} ${p.y} C ${p.x+s*0.7} ${p.y}, ${p.x+s*0.9} ${p.y}, ${p.x+s*0.5} ${p.y+s*0.45}`;
        case 'ε': return `M ${p.x+s*0.8} ${p.y+s*0.55} C ${p.x+s*0.8} ${p.y+s*0.45}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s*0.2} ${p.y+s*0.75} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}, ${p.x+s*0.8} ${p.y+s*0.9} M ${p.x+s*0.2} ${p.y+s*0.75} H ${p.x+s*0.8}`;
        case 'ζ': return `M ${p.x+s*0.2} ${p.y+s*0.45} H ${p.x+s*0.8} C ${p.x} ${p.y+s*0.45}, ${p.x+s} ${p.y+s*0.9}, ${p.x+s*0.3} ${p.y+s*1.2} C ${p.x+s*0.3} ${p.y+s*1.2}, ${p.x} ${p.y+s*1.2}, ${p.x+s*0.2} ${p.y+s*0.9}`;
        case 'η': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.8} ${p.y+s}`;
        case 'ι': return `M ${p.x+s/2} ${p.y+s*0.45} V ${p.y+s}`;
        case 'κ': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.8} ${p.y+s*0.45} L ${p.x+s*0.4} ${p.y+s*0.65} L ${p.x+s*0.8} ${p.y+s}`; // Same as 'k'
        case 'λ': return `M ${p.x+s*0.2} ${p.y+s} L ${p.x+s*0.6} ${p.y} L ${p.x+s*0.8} ${p.y+s*0.3} M ${p.x+s*0.4} ${p.y+s*0.7} L ${p.x+s*0.9} ${p.y+s}`;
        case 'μ': return `M ${p.x+s*0.1} ${p.y+s*0.45} V ${p.y+s*1.2} M ${p.x+s*0.1} ${p.y+s*0.45} C ${p.x+s*0.5} ${p.y+s*0.45}, ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.5} ${p.y+s} V ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.9} ${p.y+s}`;
        case 'ν': return `M ${p.x+s*0.1} ${p.y+s*0.45} L ${p.x+s/2} ${p.y+s} L ${p.x+s*0.9} ${p.y+s*0.45}`; // Same as 'v'
        case 'ξ': return `M ${p.x+s*0.1} ${p.y} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.1} ${p.y+s/2}, ${p.x+s*0.9} ${p.y+s/2} C ${p.x+s*0.1} ${p.y+s/2}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s*0.1} ${p.y+s}`;
        case 'ο': return `M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z`; // Same as 'o'
        case 'ρ': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y}, ${p.x+s*0.2} ${p.y}`;
        case 'σ': return `M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.7}, ${p.x+s*0.5} ${p.y+s*0.7} H ${p.x+s*0.9}`;
        case 'τ': return `M ${p.x+s/2} ${p.y+s*0.1} V ${p.y+s} C ${p.x+s/2} ${p.y+s}, ${p.x+s} ${p.y+s}, ${p.x+s*0.8} ${p.y+s} M ${p.x+s*0.1} ${p.y+s*0.4} H ${p.x+s*0.9}`; // Same as 't'
        case 'υ': return `M ${p.x+s*0.15} ${p.y+s*0.45} V ${p.y+s*0.8} C ${p.x+s*0.15} ${p.y+s}, ${p.x+s*0.85} ${p.y+s}, ${p.x+s*0.85} ${p.y+s*0.8} V ${p.y+s*0.45}`; // Same as 'u'
        case 'φ': return `M ${p.x+s/2} ${p.y+s*0.45} C ${p.x+s*0.9} ${p.y+s*0.45}, ${p.x+s*0.9} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.1} ${p.y+s}, ${p.x+s*0.1} ${p.y+s*0.45}, ${p.x+s/2} ${p.y+s*0.45} z M ${p.x+s/2} ${p.y} V ${p.y+s}`;
        case 'χ': return `M ${p.x+s*0.1} ${p.y+s*0.45} C ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.9} ${p.y+s} M ${p.x+s*0.9} ${p.y+s*0.45} C ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.5} ${p.y+s}, ${p.x+s*0.1} ${p.y+s}`;
        case 'ψ': return `M ${p.x+s*0.15} ${p.y+s*0.45} V ${p.y+s*0.8} C ${p.x+s*0.15} ${p.y+s}, ${p.x+s*0.85} ${p.y+s}, ${p.x+s*0.85} ${p.y+s*0.8} V ${p.y+s*0.45} M ${p.x+s/2} ${p.y} V ${p.y+s}`;
        case 'ω': return `M ${p.x+s*0.1} ${p.y+s} C ${p.x+s*0.1} ${p.y+s*0.6}, ${p.x+s*0.9} ${p.y+s*0.6}, ${p.x+s*0.9} ${p.y+s} M ${p.x+s*0.3} ${p.y+s*0.8} C ${p.x+s*0.4} ${p.y+s*0.7}, ${p.x+s*0.6} ${p.y+s*0.7}, ${p.x+s*0.7} ${p.y+s*0.8}`;

        // --- MORE GREEK ALPHABET (UPPERCASE) ---
        case 'Γ': return `M ${p.x+s*0.1} ${p.y} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y} V ${p.y+s}`;
        case 'Ε': return `M ${p.x+s*0.9} ${p.y} H ${p.x+s*0.2} V ${p.y+s} H ${p.x+s*0.9} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8}`; // Same as E
        case 'Ζ': return `M ${p.x} ${p.y} H ${p.x+s} L ${p.x} ${p.y+s} H ${p.x+s}`; // Same as Z
        case 'Η': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.8} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y+s/2} H ${p.x+s*0.8}`; // Same as H
        case 'Κ': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.9} ${p.y} L ${p.x+s*0.4} ${p.y+s/2} L ${p.x+s*0.9} ${p.y+s}`; // Same as K
        case 'Λ': return `M ${p.x+s*0.1} ${p.y+s} L ${p.x+s/2} ${p.y} L ${p.x+s*0.9} ${p.y+s}`;
        case 'Μ': return `M ${p.x+s*0.1} ${p.y+s} V ${p.y} L ${p.x+s/2} ${p.y+s*0.6} L ${p.x+s*0.9} ${p.y} V ${p.y+s}`; // Same as M
        case 'Ν': return `M ${p.x+s*0.1} ${p.y+s} V ${p.y} L ${p.x+s*0.9} ${p.y+s} V ${p.y}`; // Same as N
        case 'Ξ': return `M ${p.x+s*0.1} ${p.y} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y+s/2} H ${p.x+s*0.9} M ${p.x+s*0.1} ${p.y+s} H ${p.x+s*0.9}`;
        case 'Π': return `M ${p.x} ${p.y+s*0.2} h ${s} M ${p.x+s*0.2} ${p.y+s*0.2} v ${s*0.8} M ${p.x+s*0.8} ${p.y+s*0.2} v ${s*0.8}`; // Same as pi
        case 'Ρ': return `M ${p.x+s*0.2} ${p.y} V ${p.y+s} M ${p.x+s*0.2} ${p.y} C ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s/2}, ${p.x+s*0.2} ${p.y+s/2}`; // Same as P
        case 'Τ': return `M ${p.x+s/2} ${p.y} V ${p.y+s} M ${p.x+s*0.1} ${p.y} H ${p.x+s*0.9}`; // Same as T
        case 'Υ': return `M ${p.x} ${p.y} L ${p.x+s/2} ${p.y+s/2} L ${p.x+s} ${p.y} M ${p.x+s/2} ${p.y+s/2} V ${p.y+s}`; // Same as Y
        case 'Φ': return `M ${p.x+s/2} ${p.y} C ${p.x+s*0.95} ${p.y}, ${p.x+s*0.95} ${p.y+s}, ${p.x+s/2} ${p.y+s} C ${p.x+s*0.05} ${p.y+s}, ${p.x+s*0.05} ${p.y}, ${p.x+s/2} ${p.y} z M ${p.x+s/2} ${p.y} V ${p.y+s}`;
        case 'Ψ': return `M ${p.x+s*0.1} ${p.y} V ${p.y+s/2} C ${p.x+s*0.1} ${p.y}, ${p.x+s*0.9} ${p.y}, ${p.x+s*0.9} ${p.y+s/2} V ${p.y} M ${p.x+s/2} ${p.y+s/2} V ${p.y+s}`;
        case 'Ω': return `M ${p.x} ${p.y+s*0.3} C ${p.x} ${p.y}, ${p.x+s} ${p.y}, ${p.x+s} ${p.y+s*0.3} V ${p.y+s} H ${p.x+s*0.7} M ${p.x} ${p.y+s} H ${p.x+s*0.3}`;

        default: return `M ${p.x} ${p.y} h ${s} v ${s} h -${s} z M ${p.x} ${p.y} L ${p.x+s} ${p.y+s} M ${p.x+s} ${p.y} L ${p.x} ${p.y+s}`;
    }
};

/**
 * Generates the SVG path for a matrix, including brackets and cell content.
 * @param data 2D array of strings representing the matrix cells.
 * @param p Top-left starting point.
 * @param cellSize The size allocated for each cell's character drawing.
 * @returns An array of SVG path strings (brackets first, then each cell element).
 */
export const getMatrixDimensions = (data: string[][], cellSize: number): { width: number, height: number } => {
    if (!data || data.length === 0) return { width: 0, height: 0 };
    const rows = data.length;
    
    const colContents: string[][] = [];
    const numCols = Math.max(0, ...data.map(row => row.length));
    for (let c = 0; c < numCols; c++) {
        colContents[c] = data.map(row => row[c] || '');
    }
    const colWidths = colContents.map(col =>
        Math.max(1, ...col.map(cell => cell.length)) * cellSize * 0.8
    );
    
    const height = rows * cellSize + (rows > 1 ? (rows - 1) * (cellSize * 0.3) : 0);
    const bracketWidth = cellSize * 0.2;
    const bracketPadding = cellSize * 0.4;
    const colPadding = cellSize * 0.5;

    const totalContentWidth = colWidths.reduce((a, b) => a + b, 0) + (colWidths.length > 1 ? (colWidths.length - 1) * colPadding : 0);
    const width = bracketPadding + totalContentWidth + bracketPadding + bracketWidth;
    
    return { width, height };
};


/**
 * Generates the SVG path for a matrix, including brackets and cell content.
 */
export const getMatrixPath = (data: string[][], p: { x: number, y: number }, cellSize: number): string[] => {
    if (!data || data.length === 0) return [];

    const paths: string[] = [];
    const { width, height: matrixHeight } = getMatrixDimensions(data, cellSize);
    
    // --- Bracket Drawing Logic ---
    // This defines the short horizontal lines at the top and bottom of the brackets.
    const bracketSerifWidth = cellSize * 0.3;

    // 1. Draw the Left Bracket: [
    // It's a single path command: Move to top-right, line to top-left, line down, line to bottom-right.
    const leftBracketX = p.x;
    const leftBracketPath = `M ${leftBracketX + bracketSerifWidth} ${p.y} L ${leftBracketX} ${p.y} L ${leftBracketX} ${p.y + matrixHeight} L ${leftBracketX + bracketSerifWidth} ${p.y + matrixHeight}`;
    paths.push(leftBracketPath);

    // 2. Draw the Right Bracket: ]
    // Similar path: Move to top-left, line to top-right, line down, line to bottom-left.
    const rightBracketX = p.x + width - bracketSerifWidth;
    const rightBracketPath = `M ${rightBracketX - bracketSerifWidth} ${p.y} L ${rightBracketX} ${p.y} L ${rightBracketX} ${p.y + matrixHeight} L ${rightBracketX - bracketSerifWidth} ${p.y + matrixHeight}`;
    paths.push(rightBracketPath);
    
    // --- Cell Content Drawing Logic (this part is unchanged) ---
    const colContents: string[][] = [];
    const numCols = Math.max(0, ...data.map(row => row.length));
    for (let c = 0; c < numCols; c++) {
        colContents[c] = data.map(row => row[c] || '');
    }
    const colWidths = colContents.map(col =>
        Math.max(1, ...col.map(cell => cell.length)) * cellSize * 0.8
    );
    
    const bracketPadding = cellSize * 0.4;
    const colPadding = cellSize * 0.5;

    // Draw cell contents
    let currentY = p.y + (cellSize * 0.5); 
    for (const row of data) {
        // The starting X for content is after the left bracket and its padding.
        let currentX = leftBracketX + bracketSerifWidth + bracketPadding;
        for (let c = 0; c < row.length; c++) {
            const cellText = row[c] || '';
            let tempX = currentX;
            for(const char of cellText){
                 const charPath = getCharacterPath(char, {x: tempX, y: currentY - (cellSize * 0.5)}, cellSize);
                 if(charPath) paths.push(charPath);
                 tempX += cellSize * 0.8; 
            }
            currentX += colWidths[c] + colPadding;
        }
        currentY += cellSize * 1.3;
    }
    return paths;
};
/**
 * Generates an SVG path 'd' string for a complete circle.
 * @param cx Center x-coordinate.
 * @param cy Center y-coordinate.
 * @param r Radius.
 * @returns An SVG path string.
 */
export const getCirclePath = (cx: number, cy: number, r: number): string => {
    // We draw a circle using two semi-circular arc commands for SVG path compatibility.
    return `M ${cx - r},${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
};

/**
 * Converts polar coordinates (angle, radius) to Cartesian coordinates (x, y).
 */
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

/**
 * Generates an SVG path 'd' string for an arc.
 * Used for drawing parts of a circle, like sectors or angle indicators.
 * @param cx Center x-coordinate.
 * @param cy Center y-coordinate.
 * @param r Radius.
 * @param startAngle Starting angle in degrees.
 * @param endAngle Ending angle in degrees.
 * @returns An SVG path string.
 */
export const getArcPath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number): string => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};