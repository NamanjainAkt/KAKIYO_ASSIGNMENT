import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateReply(
    prospectContext: unknown,
    offeringName: string,
    offeringDescription: string,
    offeringValueProp: string,
    customPrompt: string | null,
    tone: string | null,
    chatHistory: { role: 'user' | 'model', parts: { text: string }[] }[],
    newMessage: string
) {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `You are an SDR continuing an existing conversation with a prospect. This is NOT a cold outreach — you are replying to an ongoing thread.

## YOUR IDENTITY
You are the same person who sent the original message. Stay in character. You're having a real conversation.

## ABSOLUTE RULES
- NEVER restart the conversation or re-introduce yourself
- NEVER repeat your value proposition from scratch
- NEVER use generic AI phrases ("Great question!", "Absolutely!", "I'd be happy to help!")
- NEVER ignore what the prospect actually said — address their specific points
- Match the length of your reply to the prospect's message. If they wrote 2 sentences, don't reply with 5 paragraphs
- Use contractions naturally
- If they raised an objection, acknowledge it honestly before responding
- If they asked a question, answer it directly first, then add context
- Keep the same tone as the original outreach

## CONTEXT
Prospect Intelligence: ${JSON.stringify(prospectContext)}

Your Offering:
- Product: ${offeringName}
- Description: ${offeringDescription}
- Value: ${offeringValueProp || 'Infer from description'}

${tone ? `Tone: ${tone}` : 'Tone: Match the tone of the conversation so far.'}

${customPrompt ? `Custom Instructions (FOLLOW THESE): ${customPrompt}` : ''}

## INSTRUCTIONS
The prospect just replied to your conversation. Read the full chat history to understand the context, then write a natural follow-up response. Your reply should feel like the next message in a real human conversation — not a fresh AI generation.`
    });

    const formattedHistory = chatHistory.map(m => {
        const sender = m.role === 'model' ? 'SDR (You)' : 'Prospect';
        return `${sender}: ${m.parts[0].text}`;
    }).join('\n\n');

    const prompt = `## CONVERSATION HISTORY
${formattedHistory}

Prospect: ${newMessage}

## INSTRUCTIONS
Write a natural follow-up response from the SDR. Your response should feel like the next message in a real human conversation — not a fresh AI generation. Do not prefix your response with "SDR:" or anything else, just write the message.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
}
