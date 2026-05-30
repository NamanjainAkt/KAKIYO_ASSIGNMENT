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

export async function analyzeProspectText(text: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent([SYSTEM_PROMPT, text]);
  const response = await result.response;
  let responseText = response.text().trim();
  // Strip potential markdown
  if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json\n?/, '').replace(/```$/, '').trim();
  } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```\n?/, '').replace(/```$/, '').trim();
  }
  return JSON.parse(responseText);
}

export async function analyzeProspectImage(base64Image: string, mimeType: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent([
    SYSTEM_PROMPT,
    {
      inlineData: {
        data: base64Image,
        mimeType
      }
    }
  ]);
  const response = await result.response;
  let responseText = response.text().trim();
  if (responseText.startsWith('```json')) {
      responseText = responseText.replace(/```json\n?/, '').replace(/```$/, '').trim();
  } else if (responseText.startsWith('```')) {
      responseText = responseText.replace(/```\n?/, '').replace(/```$/, '').trim();
  }
  return JSON.parse(responseText);
}
