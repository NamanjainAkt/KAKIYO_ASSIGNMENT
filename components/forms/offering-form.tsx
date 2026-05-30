"use client"
import { useState } from 'react'
import { createOffering } from '@/app/offerings/actions'
import { motion } from 'framer-motion'
import { Loader2, PlusCircle } from 'lucide-react'

export function OfferingForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      await createOffering({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        targetAudience: formData.get('targetAudience') as string,
        valueProposition: formData.get('valueProposition') as string,
      })
      form.reset()
    } catch (err) {
      console.error(err)
      alert("Failed to save offering")
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
          <PlusCircle className="w-5 h-5 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-[#1C1C1A]">New Offering</h3>
        </div>
        <input name="name" placeholder="Offering Name" required className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all" />
        <textarea name="description" placeholder="Description" required rows={3} className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all resize-none" />
        <input name="targetAudience" placeholder="Target Audience" className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all" />
        <input name="valueProposition" placeholder="Value Proposition" className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all" />
        <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-4 py-3 font-bold tracking-wide uppercase text-xs hover:bg-transparent hover:text-[#1C1C1A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{loading ? 'Saving...' : 'Save Offering'}</span>
        </button>
      </form>
    </motion.div>
  )
}
