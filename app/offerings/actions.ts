"use server"

import { db } from "@/db"
import { offerings } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    });
}

export async function createOffering(data: { name: string, description: string, targetAudience: string, valueProposition: string }) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    await db.insert(offerings).values({
        userId: session.user.id,
        ...data
    });
    revalidatePath("/offerings");
}

export async function deleteOffering(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    await db.delete(offerings).where(and(
        eq(offerings.id, id),
        eq(offerings.userId, session.user.id)
    ));
    revalidatePath("/offerings");
}
