import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `
You are an expert sales intelligence AI. 
Extract key information from the provided prospect data (either text from a website or an image).
Return ONLY a valid JSON object with the following structure:
{
  "companyName": "string",
  "industry": "string",
  "keyDecisionMakers": ["string"],
  "recentNewsOrFocus": "string",
  "painPoints": ["string"],
  "valueHypothesis": "string"
}
If information is missing, use "Unknown" or empty arrays. Do not wrap in markdown codeblocks like \`\`\`json.
`;

function cleanAndParseJson(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/```json\n?/, '').replace(/```$/, '').trim();
  } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/```\n?/, '').replace(/```$/, '').trim();
  }

  try {
      return JSON.parse(cleaned);
  } catch (e) {
      console.error("Failed to parse JSON directly, trying regex extraction:", e);
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          try {
              const candidate = cleaned.slice(firstBrace, lastBrace + 1);
              return JSON.parse(candidate);
          } catch (innerErr) {
              console.error("Failed to extract JSON using braces:", innerErr);
          }
      }
      return {
          companyName: "Unknown Company",
          industry: "Unknown Industry",
          keyDecisionMakers: [],
          recentNewsOrFocus: "No news retrieved.",
          painPoints: [],
          valueHypothesis: "Analysis failed to parse structure. Proceeding with raw data."
      };
  }
}

export async function analyzeProspectText(text: string, notes?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  let inputContent = text;
  if (notes) {
    inputContent += `\n\nADDITIONAL PROSPECT NOTES PROVIDED BY USER:\n${notes}`;
  }
  const result = await model.generateContent([SYSTEM_PROMPT, inputContent]);
  const response = await result.response;
  const responseText = response.text().trim();
  const parsed = cleanAndParseJson(responseText);
  if (notes) {
    parsed.customNotes = notes;
  }
  return parsed;
}

export async function analyzeProspectImage(base64Image: string, mimeType: string, notes?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const promptParts: (string | { inlineData: { data: string; mimeType: string } })[] = [
    SYSTEM_PROMPT,
    {
      inlineData: {
        data: base64Image,
        mimeType
      }
    }
  ];
  if (notes) {
    promptParts.push(`\n\nADDITIONAL PROSPECT NOTES PROVIDED BY USER:\n${notes}`);
  }
  const result = await model.generateContent(promptParts);
  const response = await result.response;
  const responseText = response.text().trim();
  const parsed = cleanAndParseJson(responseText);
  if (notes) {
    parsed.customNotes = notes;
  }
  return parsed;
}
