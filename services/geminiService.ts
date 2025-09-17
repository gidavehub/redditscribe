// services/geminiService.ts

import { GoogleGenerativeAI, Part } from '@google/generative-ai';

// services/geminiService.ts
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const PROMPT_TEMPLATE = `
You are an expert math and geometry tutor AI. Your goal is to provide step-by-step visual explanations for math problems. You must respond ONLY with a valid JSON array of drawing commands, wrapped in a markdown code block.

If the user provides an image, use it as the primary context for the problem. For example, if they send a picture of a triangle from their homework, solve the problem based on that triangle. If they only provide text, use that.

**Output Format:**
- Your entire response must be a single markdown JSON block.
- Do not add any text before or after the \`\`\`json block.

**Notation Guide:**
- **Unicode Characters:** Use direct Unicode characters for symbols (e.g., ∫, ±, √, °, θ, Δ).
- **Exponents & Fractions:** Use caret notation (x^2) and LaTeX \\frac{num}{den}.

**Command Reference:**
- {"command": "drawEquation", "payload": {"equation": "string", "x": number, "y": number, "charSize": number}}
- {"command": "drawText", "payload": {"text": "string", "x": number, "y": number, "fontSize": number}}
- {"command": "pause", "payload": {"duration": number}}
- {"command": "drawLine", "payload": {"x1": number, "y1": number, "x2": number, "y2": number}}
- {"command": "drawCircle", "payload": {"cx": number, "cy": number, "r": number}}
- {"command": "drawArc", "payload": {"cx": number, "cy": number, "r": number, "startAngle": number, "endAngle": number}}
- {"command": "drawShape", "payload": {"d": "SVG Path String", "fill": "rgba(r,g,b,a)"}}

**Geometry Guide:**
- Use 'drawCircle' for circles.
- Use 'drawLine' for lines, chords, radii, and triangle sides.
- Use 'drawText' to label points (A, B, C) and add explanations. Place the text coordinates slightly away from the point itself.
- Use 'drawArc' to indicate angles. Use a small radius (e.g., 15-20).
- Use 'drawShape' to highlight areas. Construct the 'd' path string by combining Move (M), Line (L), Arc (A), and Close (Z) commands. Use a semi-transparent fill color.

The canvas origin (0,0) is the top-left corner.

---
**EXAMPLE: Circle Theorem**
**Problem:** Explain why the angle at the center is double the angle at the circumference.
**Your JSON Response:**
\`\`\`json
[
  {"command": "drawText", "payload": {"text": "Let's start with a circle and a center point 'O'.", "x": 20, "y": 40, "fontSize": 18}},
  {"command": "drawCircle", "payload": {"cx": 200, "cy": 250, "r": 100}},
  {"command": "drawText", "payload": {"text": "O", "x": 195, "y": 245, "fontSize": 16}},
  {"command": "pause", "payload": {"duration": 750}},
  {"command": "drawText", "payload": {"text": "Take two points on the circumference, A and B.", "x": 20, "y": 70, "fontSize": 18}},
  {"command": "drawLine", "payload": {"x1": 200, "y1": 250, "x2": 129, "y2": 179}},
  {"command": "drawText", "payload": {"text": "A", "x": 120, "y": 170, "fontSize": 16}},
  {"command": "drawLine", "payload": {"x1": 200, "y1": 250, "x2": 271, "y2": 179}},
  {"command": "drawText", "payload": {"text": "B", "x": 275, "y": 170, "fontSize": 16}},
  {"command": "pause", "payload": {"duration": 750}},
  {"command": "drawText", "payload": {"text": "The angle at the center is ∠AOB.", "x": 20, "y": 100, "fontSize": 18}},
  {"command": "drawArc", "payload": {"cx": 200, "cy": 250, "r": 25, "startAngle": 225, "endAngle": 315}},
  {"command": "drawEquation", "payload": {"equation": "2θ", "x": 190, "y": 210, "charSize": 16}},
  {"command": "pause", "payload": {"duration": 750}},
  {"command": "drawText", "payload": {"text": "And an angle at the circumference, ∠APB.", "x": 20, "y": 130, "fontSize": 18}},
  {"command": "drawLine", "payload": {"x1": 129, "y1": 179, "x2": 200, "y2": 350}},
  {"command": "drawLine", "payload": {"x1": 271, "y1": 179, "x2": 200, "y2": 350}},
  {"command": "drawText", "payload": {"text": "P", "x": 195, "y": 355, "fontSize": 16}},
  {"command": "drawArc", "payload": {"cx": 200, "cy": 350, "r": 20, "startAngle": 248, "endAngle": 292}},
  {"command": "drawEquation", "payload": {"equation": "θ", "x": 195, "y": 320, "charSize": 16}},
  {"command": "pause", "payload": {"duration": 750}},
  {"command": "drawText", "payload": {"text": "The theorem states: ∠AOB = 2 * ∠APB", "x": 20, "y": 450, "fontSize": 18}}
]
\`\`\`
---
**ACTUAL PROBLEM**
**Problem:** \${userProblem}
**Your JSON Response:**
`;

// TypeScript Types
type DrawEquationPayload = { equation?: string; x: number; y: number; charSize?: number; };
type DrawTextPayload = { text?: string; x: number; y: number; fontSize?: number; };
type PausePayload = { duration?: number; };
type DrawMatrixPayload = { data: string[][]; x: number; y: number; cellSize: number; };
type DrawLinePayload = { x1: number, y1: number, x2: number, y2: number };
type DrawCirclePayload = { cx: number, cy: number, r: number };
type DrawArcPayload = { cx: number, cy: number, r: number, startAngle: number, endAngle: number };
type DrawShapePayload = { d: string; fill: string; stroke?: string; strokeWidth?: number; };

export type DrawCommand = 
  | { command: 'drawEquation'; payload: DrawEquationPayload }
  | { command: 'drawText'; payload: DrawTextPayload }
  | { command: 'pause'; payload: PausePayload }
  | { command: 'drawMatrix'; payload: DrawMatrixPayload }
  | { command: 'drawLine'; payload: DrawLinePayload }
  | { command: 'drawCircle'; payload: DrawCirclePayload }
  | { command: 'drawArc'; payload: DrawArcPayload }
  | { command: 'drawShape'; payload: DrawShapePayload };


/**
 * Generates a drawing script from Gemini, handling either text-only or multimodal (text + image) input.
 * @param userProblem The text prompt from the user.
 * @param imageBase64 An optional Base64 encoded image string.
 * @returns A promise that resolves to an array of DrawCommand objects.
 */
export const getDrawingScriptFromGemini = async (userProblem: string, imageBase64: string | null): Promise<DrawCommand[]> => {
    if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_GOES_HERE') {
        return [{
            command: 'drawText',
            payload: { text: `Error: Please set your API key in services/geminiService.ts`, x: 10, y: 100, fontSize: 14 }
        }];
    }
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        // Use a model that supports vision, like gemini-1.5-flash or gemini-pro-vision
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const fullPrompt = PROMPT_TEMPLATE.replace('\${userProblem}', userProblem || 'See attached image.');

        // Build the request parts for the Gemini API
        const requestParts: Part[] = [];

        // Add the image data first if it exists
        if (imageBase64) {
            requestParts.push({
                inlineData: {
                    mimeType: 'image/jpeg', // Assuming JPEG, adjust if you handle PNGs etc.
                    data: imageBase64,
                },
            });
        }

        // Add the text prompt last
        requestParts.push({ text: fullPrompt });
        
        // Use the parts array to generate content
        const result = await model.generateContent({ contents: [{ role: "user", parts: requestParts }] });
        const response = await result.response;
        const rawText = response.text();
        console.log('Raw Gemini response:', rawText);

        const match = rawText.match(/```json\n([\s\S]*?)\n```/);
        const jsonString = match ? match[1] : null;

        if (!jsonString) {
          throw new Error("AI did not return valid JSON. Response: " + rawText);
        }
        
        const parsedCommands: DrawCommand[] = JSON.parse(jsonString);
        if (!Array.isArray(parsedCommands)) {
          throw new Error('Invalid response: expected an array of commands');
        }

        return parsedCommands;

    } catch (error) {
        console.error("Error in getDrawingScriptFromGemini:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";

        return [{
          command: 'drawText',
          payload: { text: `Error: ${errorMessage.substring(0, 300)}`, x: 10, y: 100, fontSize: 14 }
        }];
    }
};