
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerativePart } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BASE_PROMPT = "Transform the person in this photo into a fun and expressive anime character. Emphasize their key features but render them in a vibrant, modern anime art style with dynamic lines and bright colors. Focus on creating a unique and memorable character design.";

export const generateAnimeCharacter = async (imagePart: GenerativePart, userPrompt: string): Promise<string> => {
    const fullPrompt = `${BASE_PROMPT} ${userPrompt}`.trim();

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: imagePart.data,
                            mimeType: imagePart.mimeType,
                        },
                    },
                    {
                        text: fullPrompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return part.inlineData.data;
                }
            }
        }
        
        throw new Error("The AI did not return an image. Please try a different photo or prompt.");

    } catch (error) {
        console.error("Error generating anime character:", error);
        throw new Error("Failed to generate character. The API call may have failed or the content was blocked.");
    }
};
