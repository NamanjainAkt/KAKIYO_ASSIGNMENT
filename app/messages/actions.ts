"use server"

import { db } from "@/db"
import { conversations, messages, offerings, prompts, prospect_contexts } from "@/db/schema"
import { eq, asc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { generateInitialOutreach } from "@/lib/ai/message-generator"
import { generateReply } from "@/lib/ai/reply-generator"

async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    });
}

export async function createConversation(data: FormData) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const prospectId = data.get('prospectId') as string;
    const offeringId = data.get('offeringId') as string;
    const promptId = (data.get('promptId') as string) || null;

    if (!prospectId || !offeringId) throw new Error("Missing inputs");

    const prospectCtx = await db.query.prospect_contexts.findFirst({ where: eq(prospect_contexts.prospectId, prospectId) });
    const offering = await db.query.offerings.findFirst({ where: eq(offerings.id, offeringId) });
    const prompt = promptId ? await db.query.prompts.findFirst({ where: eq(prompts.id, promptId) }) : null;

    if (!prospectCtx || !offering) throw new Error("Data not found");

    const generatedMessage = await generateInitialOutreach(
        prospectCtx.unifiedContext,
        offering.name,
        offering.description,
        offering.valueProposition || "",
        prompt?.content || null,
        prompt?.tone || null
    );

    const [conv] = await db.insert(conversations).values({
        userId: session.user.id,
        prospectId,
        offeringId,
        promptId
    }).returning();

    await db.insert(messages).values({
        conversationId: conv.id,
        role: 'model',
        content: generatedMessage
    });

    revalidatePath("/messages");
}

export async function replyToConversation(conversationId: string, userMessage: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const conv = await db.query.conversations.findFirst({ where: eq(conversations.id, conversationId) });
    if (!conv || conv.userId !== session.user.id) throw new Error("Not found");

    const prospectCtx = await db.query.prospect_contexts.findFirst({ where: eq(prospect_contexts.prospectId, conv.prospectId) });
    const offering = await db.query.offerings.findFirst({ where: eq(offerings.id, conv.offeringId) });
    const prompt = conv.promptId ? await db.query.prompts.findFirst({ where: eq(prompts.id, conv.promptId) }) : null;

    const existingMessages = await db.query.messages.findMany({ 
        where: eq(messages.conversationId, conversationId),
        orderBy: [asc(messages.createdAt)]
    });

    await db.insert(messages).values({
        conversationId,
        role: 'user',
        content: userMessage
    });

    const chatHistory = existingMessages.map(m => ({
        role: m.role as 'user' | 'model',
        parts: [{ text: m.content }]
    }));

    const aiReply = await generateReply(
        prospectCtx?.unifiedContext || {},
        offering?.name || "",
        offering?.description || "",
        offering?.valueProposition || "",
        prompt?.content || null,
        prompt?.tone || null,
        chatHistory as { role: 'user' | 'model', parts: { text: string }[] }[],
        userMessage
    );

    await db.insert(messages).values({
        conversationId,
        role: 'model',
        content: aiReply
    });

    revalidatePath("/messages");
}

export async function regenerateMessage(conversationId: string, messageId: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const conv = await db.query.conversations.findFirst({ where: eq(conversations.id, conversationId) });
    if (!conv || conv.userId !== session.user.id) throw new Error("Not found");

    const prospectCtx = await db.query.prospect_contexts.findFirst({ where: eq(prospect_contexts.prospectId, conv.prospectId) });
    const offering = await db.query.offerings.findFirst({ where: eq(offerings.id, conv.offeringId) });
    const prompt = conv.promptId ? await db.query.prompts.findFirst({ where: eq(prompts.id, conv.promptId) }) : null;

    if (!prospectCtx || !offering) throw new Error("Data not found");

    const newMessage = await generateInitialOutreach(
        prospectCtx.unifiedContext,
        offering.name,
        offering.description,
        offering.valueProposition || "",
        prompt?.content || null,
        prompt?.tone || null
    );

    await db.update(messages).set({ content: newMessage }).where(eq(messages.id, messageId));

    revalidatePath("/messages");
}
