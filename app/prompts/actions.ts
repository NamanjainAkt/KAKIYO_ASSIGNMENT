"use server"

import { db } from "@/db"
import { prompts } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    });
}

export async function createPrompt(data: { name: string, content: string, tone: string }) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    await db.insert(prompts).values({
        userId: session.user.id,
        ...data
    });
    revalidatePath("/prompts");
}

export async function deletePrompt(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    await db.delete(prompts).where(and(
        eq(prompts.id, id),
        eq(prompts.userId, session.user.id)
    ));
    revalidatePath("/prompts");
}
