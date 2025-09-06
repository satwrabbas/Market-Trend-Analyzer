
import { GoogleGenAI, Type } from "@google/genai";
import type { MarketAnalysis, Language } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING, description: "The industry or topic being analyzed." },
    summary: { type: Type.STRING, description: "A high-level overview of the market analysis." },
    current_trends: {
      type: Type.ARRAY,
      description: "A list of key current trends in the market.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the trend." },
          description: { type: Type.STRING, description: "A detailed description of the trend." },
        },
        required: ["name", "description"]
      },
    },
    opportunities: {
      type: Type.ARRAY,
      description: "A list of potential areas for growth or investment.",
      items: { type: Type.STRING },
    },
    threats: {
      type: Type.ARRAY,
      description: "A list of potential challenges or risks to the market.",
      items: { type: Type.STRING },
    },
    key_players: {
      type: Type.ARRAY,
      description: "A list of major companies or entities in this space.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the company or player." },
          description: { type: Type.STRING, description: "A brief description of their role or significance." },
        },
        required: ["name", "description"]
      },
    },
    future_outlook: {
      type: Type.STRING,
      description: "A forecast for the market over the next 3-5 years, including potential developments.",
    },
  },
  required: ["topic", "summary", "current_trends", "opportunities", "threats", "key_players", "future_outlook"],
};

export const fetchMarketAnalysis = async (topic: string, language: Language): Promise<MarketAnalysis> => {
  const languageInstruction = language === 'ar' ? 'Arabic' : 'English';
  
  const prompt = `
    Provide a comprehensive and professional market trend analysis for the following topic: "${topic}".
    Your analysis should be structured, insightful, and based on current information.
    Please cover the following areas:
    1.  **Summary:** A concise executive summary of the market.
    2.  **Current Trends:** Identify and describe at least 3-5 major trends.
    3.  **Opportunities:** List key opportunities for new or existing businesses.
    4.  **Threats:** Outline significant threats or challenges facing the market.
    5.  **Key Players:** Name the most influential companies or organizations and briefly describe their role.
    6.  **Future Outlook:** Project the market's direction over the next 3-5 years.

    Format the entire output as a single JSON object that conforms to the provided schema.
    IMPORTANT: The keys of the JSON object must remain in English as defined in the schema. All string values within the JSON object MUST be in ${languageInstruction}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const analysisData: MarketAnalysis = JSON.parse(jsonText);
    return analysisData;
  } catch (error) {
    console.error("Error fetching market analysis from Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
