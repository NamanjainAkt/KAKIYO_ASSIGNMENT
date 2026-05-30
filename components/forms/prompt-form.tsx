"use client"
import { useState } from 'react'
import { createPrompt } from '@/app/prompts/actions'
import { motion } from 'framer-motion'
import { Loader2, Type } from 'lucide-react'

export function PromptForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      await createPrompt({
        name: formData.get('name') as string,
        content: formData.get('content') as string,
        tone: formData.get('tone') as string,
      })
      form.reset()
    } catch (err) {
      console.error(err)
      alert("Failed to save prompt")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 border-[#1C1C1A] p-6 bg-white"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">New Prompt</h3>
        </div>
        <input name="name" placeholder="Prompt Name (e.g. Sales Outreach)" required className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all" />
        <textarea name="content" placeholder="Prompt Content / Instructions..." required className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all h-32 resize-none" />
        <input name="tone" placeholder="Tone (e.g. Professional, Casual)" className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all" />
        <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-4 py-3 font-bold tracking-wide uppercase text-xs hover:bg-transparent hover:text-[#1C1C1A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{loading ? 'Saving...' : 'Save Prompt'}</span>
        </button>
      </form>
    </motion.div>
  )
}
