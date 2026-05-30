"use client"

import { useState } from 'react'
import { createConversation } from '@/app/messages/actions'
import { Loader2, Zap } from 'lucide-react'

type Props = {
  offerings: { id: string; name: string }[]
  prospects: { id: string; name: string }[]
  prompts: { id: string; name: string }[]
}

export function GenerateForm({ offerings, prospects, prompts }: Props) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      await createConversation(formData)
    } catch (err) {
      console.error(err)
      alert("Failed to generate message. Make sure you have a prospect with analyzed context.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-2 border-[#1C1C1A] p-6 bg-white h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-amber-600" />
        <h2 className="font-serif text-xl font-bold text-[#1C1C1A]">New Campaign</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#575752] mb-2">Select Offering</label>
          <select name="offeringId" required className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all appearance-none text-sm">
            <option value="">— Choose Offering —</option>
            {offerings.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#575752] mb-2">Select Prospect</label>
          <select name="prospectId" required className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all appearance-none text-sm">
            <option value="">— Choose Prospect —</option>
            {prospects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#575752] mb-2">Select Prompt <span className="text-[#999] font-normal normal-case">(Optional)</span></label>
          <select name="promptId" className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all appearance-none text-sm">
            <option value="">— Default Generation —</option>
            {prompts.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-4 py-3.5 font-bold tracking-wide uppercase text-xs hover:bg-transparent hover:text-[#1C1C1A] transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Generating with Gemini...' : 'Generate Outreach'}
        </button>
      </form>
      {loading && (
        <div className="mt-4 p-3 bg-[#F5F5F0] border border-[#E5E5E0] text-center">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-wider animate-pulse">
            Analyzing prospect context & crafting message...
          </p>
        </div>
      )}
    </div>
  )
}
