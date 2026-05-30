import { db } from "@/db"
import { prospects, messages, offerings, prompts, conversations } from "@/db/schema"
import { eq, count } from "drizzle-orm"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { DashboardGrid } from "@/components/ui/dashboard-grid"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session) {
    return (
      <div className="flex flex-col min-h-[85vh] p-8 md:p-16 max-w-6xl mx-auto justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F5F0] border border-[#E5E5E0] text-[#78350F] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Intelligence-first cold outreach
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight text-[#1C1C1A] leading-[1.05]">
              Hyper-Personalized <br />
              <span className="italic text-amber-600 font-normal">Outreach</span>
            </h1>
            <p className="text-lg md:text-xl text-[#575752] max-w-2xl leading-relaxed font-medium">
              Kakiyo is a premium sales development platform that crawls your prospects&apos; sites, matches their needs with your offerings, and uses Gemini 2.5 to write responses they cannot ignore.
            </p>
            <div className="flex gap-6 items-center flex-wrap pt-4">
              <Link href="/sign-up" className="border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-8 py-4 font-bold tracking-wide uppercase text-sm hover:bg-transparent hover:text-[#1C1C1A] transition-all duration-300 flex items-center gap-2 group">
                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/sign-in" className="border-2 border-[#E5E5E0] text-[#1C1C1A] px-8 py-4 font-bold tracking-wide uppercase text-sm hover:border-[#1C1C1A] transition-all duration-300">
                Sign In
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-4 border-t-2 md:border-t-0 md:border-l-2 border-[#E5E5E0] pt-8 md:pt-0 md:pl-10 space-y-10">
            <div>
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">01 / Context Extraction</h3>
              <h4 className="text-lg font-serif font-bold text-[#1C1C1A] mb-1">Recursive Crawling</h4>
              <p className="text-sm text-[#575752]">Firecrawl sweeps entire sites to detect core pain points and tech stack markers.</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">02 / Adaptive Engine</h3>
              <h4 className="text-lg font-serif font-bold text-[#1C1C1A] mb-1">Objection Handling</h4>
              <p className="text-sm text-[#575752]">Draft custom cold templates and simulated interactions, continuously updating with Gemini 2.5.</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">03 / Solid Security</h3>
              <h4 className="text-lg font-serif font-bold text-[#1C1C1A] mb-1">Enterprise Workspace</h4>
              <p className="text-sm text-[#575752]">Keep business data protected in secure, isolated tenant accounts.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const userId = session.user.id;

  const [
    prospectCount,
    offeringCount,
    promptCount,
    messageCount
  ] = await Promise.all([
    db.select({ value: count() }).from(prospects).where(eq(prospects.userId, userId)),
    db.select({ value: count() }).from(offerings).where(eq(offerings.userId, userId)),
    db.select({ value: count() }).from(prompts).where(eq(prompts.userId, userId)),
    db.select({ value: count() }).from(messages)
      .innerJoin(conversations, eq(messages.conversationId, conversations.id))
      .where(eq(conversations.userId, userId)),
  ]);

  const stats = [
    { name: "Total Prospects", value: prospectCount[0].value, icon: "Users", href: "/prospects" },
    { name: "Total Offerings", value: offeringCount[0].value, icon: "Briefcase", href: "/offerings" },
    { name: "Custom Prompts", value: promptCount[0].value, icon: "FileText", href: "/prompts" },
    { name: "Messages Generated", value: messageCount[0].value, icon: "MessageSquare", href: "/messages" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 md:p-12 space-y-12">
      <div className="border-b border-[#E5E5E0] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-[#1C1C1A]">
            Welcome back, <span className="italic font-normal text-amber-600">{session.user.name || session.user.email?.split('@')[0]}</span>
          </h2>
          <p className="text-base text-[#575752] mt-2 font-medium">Outreach overview and system analytics.</p>
        </div>
        <Link href="/messages" className="border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-6 py-3 font-bold tracking-wide uppercase text-xs hover:bg-transparent hover:text-[#1C1C1A] transition-all flex items-center gap-2 group self-start md:self-auto">
          New Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <DashboardGrid stats={stats} />
    </div>
  )
}
