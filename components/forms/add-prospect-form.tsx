"use client"
import { useState } from 'react'
import { processProspectUrl, processProspectImage } from '@/app/prospects/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Link as LinkIcon, Image as ImageIcon, Sparkles } from 'lucide-react'

export function AddProspectForm() {
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'url' | 'image'>('url')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    
    try {
      if (mode === 'url') {
        await processProspectUrl(formData)
      } else {
        await processProspectImage(formData)
      }
      form.reset()
    } catch (err) {
      console.error(err)
      alert("Failed to process prospect")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 border-[#1C1C1A] p-6 bg-white space-y-6"
    >
      <div className="flex border border-[#E5E5E0] p-1 bg-[#FBFBFA]">
        <button 
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 transition-all duration-300 font-bold text-xs uppercase tracking-wider ${mode === 'url' ? 'bg-[#1C1C1A] text-white' : 'text-[#575752] hover:text-[#1C1C1A]'}`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          URL
        </button>
        <button 
          type="button"
          onClick={() => setMode('image')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 transition-all duration-300 font-bold text-xs uppercase tracking-wider ${mode === 'image' ? 'bg-[#1C1C1A] text-white' : 'text-[#575752] hover:text-[#1C1C1A]'}`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Screenshot
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1C1C1A] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Analyze Prospect
          </h3>
          <p className="text-xs text-[#575752] mt-1">Firecrawl + Gemini extracts and analyzes their context instantly.</p>
        </div>
        
        <div className="space-y-4">
          <input 
            name="name" 
            placeholder="Prospect / Company Name" 
            required 
            className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all"
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {mode === 'url' ? (
                <input 
                  name="url" 
                  type="url" 
                  placeholder="https://example.com" 
                  required 
                  className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all"
                />
              ) : (
                <input 
                  name="image" 
                  type="file" 
                  accept="image/*"
                  required 
                  className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all file:mr-4 file:py-1 file:px-3 file:border file:border-[#E5E5E0] file:text-xs file:font-bold file:bg-white file:text-[#1C1C1A] hover:file:bg-[#FBFBFA] file:uppercase file:tracking-wider"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full flex justify-center items-center gap-2 border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-4 py-3 font-bold tracking-wide uppercase text-xs hover:bg-transparent hover:text-[#1C1C1A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{loading ? 'Analyzing...' : 'Save & Analyze'}</span>
        </button>
      </form>
    </motion.div>
  )
}
