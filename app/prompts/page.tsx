import { db } from "@/db"
import { prompts } from "@/db/schema"
import { PromptForm } from "@/components/forms/prompt-form"
import { deletePrompt } from "./actions"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq } from "drizzle-orm"

export default async function PromptsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return <div>Unauthorized</div>

  const myPrompts = await db.query.prompts.findMany({
    where: eq(prompts.userId, session.user.id)
  })

  return (
    <div className="mx-auto max-w-5xl p-8 md:p-12 space-y-12">
      <div className="border-b border-[#E5E5E0] pb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1C1C1A]">Custom Prompts</h1>
        <p className="text-base text-[#575752] mt-2 font-medium">Create custom templates and instructions for the outreach generator.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <PromptForm />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">Stored Instructions</h2>
          {myPrompts.length === 0 ? (
            <p className="text-[#575752] text-sm bg-white border border-[#E5E5E0] p-6 text-center">No custom prompts added yet. Use the form on the left to add one.</p>
          ) : null}
          <div className="grid gap-6">
            {myPrompts.map(p => (
              <div key={p.id} className="bg-white border border-[#E5E5E0] p-6 flex flex-col justify-between hover:border-[#1C1C1A] transition-all duration-300">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1C1A] mb-2">{p.name}</h3>
                  <p className="text-sm text-[#575752] leading-relaxed mb-4 line-clamp-3">{p.content}</p>
                  <div className="border-t border-[#F0F0EC] pt-4 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-[#F5F5F0] border border-[#E5E5E0] px-2 py-0.5">Tone: {p.tone}</span>
                    <form action={async () => {
                      "use server"
                      await deletePrompt(p.id)
                    }}>
                      <button type="submit" className="text-xs font-bold text-red-600 hover:underline uppercase tracking-wider">
                        Delete Prompt
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
