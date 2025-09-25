import { GoogleGenAI, Modality } from "@google/genai";
import type { HistoricalImage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a single historical photo for a given era.
 * @param base64ImageData The base64 encoded image data.
 * @param mimeType The MIME type of the image.
 * @param eraEnglishName The historical era name in English for the AI prompt.
 * @param eraKey The unique key for the era.
 * @returns A promise that resolves to a HistoricalImage object.
 */
export const generateHistoricalPhoto = async (
  base64ImageData: string,
  mimeType: string,
  eraEnglishName: string,
  eraKey: string
): Promise<HistoricalImage> => {
  try {
    const prompt = `Reimagine the person in this photo in the style of the ${eraEnglishName}. The setting, clothing, hair, and photo style (e.g., sepia tone, color saturation, film grain) should be authentic to that period. Maintain the person's core facial features and identity. Do not add any text or logos to the image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes = part.inlineData.data;
        const imageMimeType = part.inlineData.mimeType;
        const imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
        return { eraKey, src: imageUrl };
      }
    }

    throw new Error(`No image was generated for the era: ${eraEnglishName}. The model may have refused the request.`);

  } catch (error) {
    console.error(`Error generating image for ${eraEnglishName}:`, error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate an image for the ${eraEnglishName}. Details: ${error.message}`);
    }
    throw new Error(`Failed to generate an image for the ${eraEnglishName}. Please try again or use a different photo.`);
  }
};