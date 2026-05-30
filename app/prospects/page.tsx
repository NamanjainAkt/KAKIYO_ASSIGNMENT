import { db } from "@/db"
import { prospects, prospect_contexts } from "@/db/schema"
import { AddProspectForm } from "@/components/forms/add-prospect-form"
import { deleteProspect } from "./actions"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq, desc } from "drizzle-orm"

type ProspectContextType = {
  companyName?: string;
  industry?: string;
  recentNewsOrFocus?: string;
  keyDecisionMakers?: string[];
  painPoints?: string[];
  valueHypothesis?: string;
};

export default async function ProspectsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return <div>Unauthorized</div>

  // Fetch prospects and their contexts
  const myProspects = await db
    .select()
    .from(prospects)
    .where(eq(prospects.userId, session.user.id))
    .leftJoin(prospect_contexts, eq(prospects.id, prospect_contexts.prospectId))
    .orderBy(desc(prospects.createdAt));

  return (
    <div className="mx-auto max-w-6xl p-8 md:p-12 space-y-12">
      <div className="border-b border-[#E5E5E0] pb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1C1C1A]">Prospect Intelligence</h1>
        <p className="text-base text-[#575752] mt-2 font-medium">Scrape websites, perform deep analysis, and store structural signals.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <AddProspectForm />
        </div>
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">Analyzed Targets</h2>
          {myProspects.length === 0 ? (
            <p className="text-[#575752] text-sm bg-white border border-[#E5E5E0] p-6 text-center">No prospects analyzed yet. Submit a website URL to begin intelligence collection.</p>
          ) : null}
          <div className="grid gap-8">
            {myProspects.map(({ prospects: p, prospect_contexts: pc }) => {
              const ctx = (pc?.unifiedContext as ProspectContextType) || {};
              
              return (
                <div key={p.id} className="bg-white border border-[#E5E5E0] hover:border-[#1C1C1A] p-6 transition-all duration-300 relative group">
                  <div className="absolute top-6 right-6">
                    <form action={async () => {
                      "use server"
                      await deleteProspect(p.id)
                    }}>
                      <button type="submit" className="text-xs font-bold text-red-600 hover:underline uppercase tracking-wider">
                        Remove
                      </button>
                    </form>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-[#1C1C1A] pr-20 mb-1">{p.name}</h3>
                  <p className="text-xs font-semibold text-slate-400 mb-6 truncate max-w-md">
                    <a href={p.source} target="_blank" rel="noreferrer" className="hover:underline hover:text-amber-600 transition-colors">
                      {p.source}
                    </a>
                  </p>
                  
                  {Object.keys(ctx).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-[#E5E5E0] bg-[#FBFBFA] divide-y md:divide-y-0 md:divide-x divide-[#E5E5E0]">
                      <div className="p-4 space-y-4">
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">Company Info</span>
                          <p className="text-sm font-semibold text-[#1C1C1A]">{ctx.companyName} <span className="text-xs font-normal text-[#575752]">({ctx.industry})</span></p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">Key Decision Makers</span>
                          <ul className="text-xs text-[#575752] space-y-1 list-disc pl-4 font-medium">
                            {ctx.keyDecisionMakers?.map((dm: string, i: number) => <li key={i}>{dm}</li>)}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">Pain Points</span>
                          <ul className="text-xs text-[#575752] space-y-1 list-disc pl-4 font-medium">
                            {ctx.painPoints?.map((pp: string, i: number) => <li key={i}>{pp}</li>)}
                          </ul>
                        </div>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">Recent News & Focus</span>
                          <p className="text-xs text-[#575752] leading-relaxed font-medium">{ctx.recentNewsOrFocus}</p>
                        </div>
                        <div className="border-t border-[#E5E5E0] pt-4">
                          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block mb-1">Value Hypothesis</span>
                          <p className="text-xs font-serif italic text-[#1C1C1A] leading-relaxed">{ctx.valueHypothesis}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-[#E5E5E0] bg-[#FBFBFA] p-4 text-center text-xs font-bold uppercase tracking-wider text-amber-600 animate-pulse">
                      Intelligence processing in progress...
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
