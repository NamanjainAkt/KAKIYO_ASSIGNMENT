import { db } from "@/db"
import { offerings } from "@/db/schema"
import { OfferingForm } from "@/components/forms/offering-form"
import { deleteOffering } from "./actions"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq } from "drizzle-orm"

export default async function OfferingsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return <div>Unauthorized</div>

  const myOfferings = await db.query.offerings.findMany({
    where: eq(offerings.userId, session.user.id)
  })

  return (
    <div className="mx-auto max-w-5xl p-8 md:p-12 space-y-12">
      <div className="border-b border-[#E5E5E0] pb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-black text-[#1C1C1A]">Offerings</h1>
        <p className="text-base text-[#575752] mt-2 font-medium">Define the products, services, or SaaS platforms you are pitching.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <OfferingForm />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xs font-bold text-amber-600 uppercase tracking-widest">Active Portfolio</h2>
          {myOfferings.length === 0 ? (
            <p className="text-[#575752] text-sm bg-white border border-[#E5E5E0] p-6 text-center">No offerings added yet. Use the form on the left to add one.</p>
          ) : null}
          <div className="grid gap-6">
            {myOfferings.map(off => (
              <div key={off.id} className="bg-white border border-[#E5E5E0] p-6 flex flex-col justify-between hover:border-[#1C1C1A] transition-all duration-300 relative group">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1C1A] mb-2">{off.name}</h3>
                  <p className="text-sm text-[#575752] leading-relaxed mb-4">{off.description}</p>
                  <div className="space-y-1 border-t border-[#F0F0EC] pt-4 text-xs text-[#575752] font-semibold">
                    <div><span className="text-amber-600 uppercase tracking-wider text-[10px]">Target Audience:</span> {off.targetAudience}</div>
                    <div><span className="text-amber-600 uppercase tracking-wider text-[10px]">Value Proposition:</span> {off.valueProposition}</div>
                  </div>
                </div>
                <form action={async () => {
                  "use server"
                  await deleteOffering(off.id)
                }} className="mt-6 flex justify-end">
                  <button type="submit" className="text-xs font-bold text-red-600 hover:underline uppercase tracking-wider">
                    Delete Offering
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
