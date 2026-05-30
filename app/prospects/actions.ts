"use server"

import { db } from "@/db"
import { prospects, prospect_contexts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { scrapeWithFirecrawl } from "@/lib/scraper/firecrawl"
import { scrapeWithCheerio } from "@/lib/scraper/cheerio"
import { uploadFileToCloudinary } from "@/lib/cloudinary/upload"
import { analyzeProspectText, analyzeProspectImage } from "@/lib/ai/prospect-analyzer"

async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    });
}

export async function processProspectUrl(data: FormData) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const url = data.get('url') as string;
    const name = data.get('name') as string;
    const notes = data.get('notes') as string || "";
    if (!url || !name) throw new Error("Missing url or name");

    let textContent = "";
    try {
        textContent = await scrapeWithFirecrawl(url);
    } catch (e) {
        console.warn("Firecrawl failed, falling back to Cheerio", e);
        try {
            textContent = await scrapeWithCheerio(url);
        } catch (cheerioErr) {
            console.warn("Cheerio failed as well", cheerioErr);
            if (notes.trim()) {
                textContent = `Website: ${url}\n(Note: Scraping failed, falling back to user notes)\nUser Notes:\n${notes}`;
            } else {
                throw new Error("Unable to scrape the URL, and no custom notes were provided to fall back on.");
            }
        }
    }

    const unifiedContext = await analyzeProspectText(textContent, notes);

    const [newProspect] = await db.insert(prospects).values({
        userId: session.user.id,
        name,
        source: url
    }).returning();

    await db.insert(prospect_contexts).values({
        prospectId: newProspect.id,
        unifiedContext
    });

    revalidatePath("/prospects");
}

export async function processProspectImage(data: FormData) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const file = data.get('image') as File;
    const name = data.get('name') as string;
    const notes = data.get('notes') as string || "";
    if (!file || !name) throw new Error("Missing image or name");

    const imageUrl = await uploadFileToCloudinary(file);
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    const mimeType = file.type || 'image/png';

    const unifiedContext = await analyzeProspectImage(base64Image, mimeType, notes);

    const [newProspect] = await db.insert(prospects).values({
        userId: session.user.id,
        name,
        source: imageUrl
    }).returning();

    await db.insert(prospect_contexts).values({
        prospectId: newProspect.id,
        unifiedContext
    });

    revalidatePath("/prospects");
}

export async function deleteProspect(id: string) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const prospect = await db.query.prospects.findFirst({ where: eq(prospects.id, id) });
    if (prospect?.userId === session.user.id) {
        await db.delete(prospects).where(eq(prospects.id, id));
    }
    revalidatePath("/prospects");
}
