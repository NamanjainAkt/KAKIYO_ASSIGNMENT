import { db } from "@/db"
import { prospects, offerings, prompts, conversations, messages as messagesTable } from "@/db/schema"
import { eq, desc, inArray } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { ChatInterface } from "@/components/chat/reply-interface"
import { GenerateForm } from "@/components/forms/generate-form"

export default async function MessagesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return <div>Unauthorized</div>

  const userId = session.user.id;

  const [myProspects, myOfferings, myPrompts] = await Promise.all([
    db.query.prospects.findMany({ where: eq(prospects.userId, userId) }),
    db.query.offerings.findMany({ where: eq(offerings.userId, userId) }),
    db.query.prompts.findMany({ where: eq(prompts.userId, userId) }),
  ]);

  const convsRaw = await db
    .select({
      conversation: conversations,
      prospect: prospects,
      offering: offerings,
      prompt: prompts
    })
    .from(conversations)
    .where(eq(conversations.userId, userId))
    .leftJoin(prospects, eq(conversations.prospectId, prospects.id))
    .leftJoin(offerings, eq(conversations.offeringId, offerings.id))
    .leftJoin(prompts, eq(conversations.promptId, prompts.id))
    .orderBy(desc(conversations.createdAt));

  const convIds = convsRaw.map(c => c.conversation.id);
  
  let allMessages: typeof messagesTable.$inferSelect[] = [];
  if (convIds.length > 0) {
      allMessages = await db.select().from(messagesTable).where(inArray(messagesTable.conversationId, convIds)).orderBy(messagesTable.createdAt);
  }

  return (
    <div className="mx-auto max-w-6xl p-8 md:p-12 space-y-12">
      <div className="border-b border-[#E5E5E0] pb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1C1C1A]">Message Generator</h1>
        <p className="text-base text-[#575752] mt-2 font-medium">Combine your offerings and prospects to generate highly personalized AI outreach.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Generator Form */}
        <div className="lg:col-span-4">
          <GenerateForm 
            offerings={myOfferings.map(o => ({ id: o.id, name: o.name }))}
            prospects={myProspects.map(p => ({ id: p.id, name: p.name }))}
            prompts={myPrompts.map(p => ({ id: p.id, name: p.name }))}
          />
        </div>

        {/* Existing Conversations */}
        <div className="lg:col-span-8 space-y-8">
          {convsRaw.length === 0 ? (
            <div className="text-[#575752] text-center py-20 border border-[#E5E5E0] bg-white">
              <p className="font-bold uppercase tracking-wider text-xs">No generated campaigns yet.</p>
              <p className="text-sm mt-1">Select options on the left to initialize.</p>
            </div>
          ) : (
            convsRaw.map((data) => {
              const msgs = allMessages.filter(m => m.conversationId === data.conversation.id);
              return (
                <div key={data.conversation.id} className="border border-[#E5E5E0] bg-white overflow-hidden hover:border-[#1C1C1A] transition-all duration-300">
                  <div className="px-6 py-4 bg-[#FBFBFA] border-b border-[#E5E5E0] flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1C1C1A]">Target: {data.prospect?.name}</h3>
                      <p className="text-xs font-semibold text-amber-600 mt-1">
                        <span className="text-[#575752] font-normal uppercase tracking-wider text-[10px] mr-1">Offering:</span> {data.offering?.name} 
                        {data.prompt && <span className="ml-3"><span className="text-[#575752] font-normal uppercase tracking-wider text-[10px] mr-1">| Prompt:</span> {data.prompt.name}</span>}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ChatInterface conversationId={data.conversation.id} initialMessages={msgs} />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
