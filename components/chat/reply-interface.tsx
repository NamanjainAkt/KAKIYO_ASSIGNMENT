"use client"
import { useState, useRef, useEffect } from 'react'
import { replyToConversation, regenerateMessage } from '@/app/messages/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, Copy, Check, RefreshCw } from 'lucide-react'

export function ChatInterface({ conversationId, initialMessages }: { conversationId: string, initialMessages: { id: string, role: string, content: string }[] }) {
  const [loading, setLoading] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [initialMessages])

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyText.trim()) return

    setLoading(true)
    try {
      await replyToConversation(conversationId, replyText)
      setReplyText('')
    } catch (err) {
      console.error(err)
      alert("Failed to send reply")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleRegenerate = async (messageId: string) => {
    setRegeneratingId(messageId)
    try {
      await regenerateMessage(conversationId, messageId)
    } catch (err) {
      console.error(err)
      alert("Failed to regenerate")
    } finally {
      setRegeneratingId(null)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-6 min-h-[300px]">
        <AnimatePresence initial={false}>
          {initialMessages.map((msg, index) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex flex-col ${msg.role === 'model' ? 'items-start' : 'items-end'}`}
            >
              <div className={`flex items-center gap-2 mb-2 px-1 ${msg.role === 'model' ? 'flex-row' : 'flex-row-reverse'}`}>
                {msg.role === 'model' ? (
                  <div className="w-5 h-5 bg-[#1C1C1A] text-white flex items-center justify-center text-[10px] font-bold uppercase tracking-wider">
                    AI
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold uppercase tracking-wider">
                    PR
                  </div>
                )}
                <span className="text-[10px] font-bold text-[#575752] uppercase tracking-widest">
                  {msg.role === 'model' ? 'Generated Outreach' : 'Prospect Reply'}
                </span>
              </div>
              <div className={`p-4 rounded-none max-w-[90%] border ${msg.role === 'model' ? 'bg-white border-[#E5E5E0] text-[#1C1C1A]' : 'bg-[#F5F5F0] border-[#E5E5E0] text-[#1C1C1A]'}`}>
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
                {msg.role === 'model' && (
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#F0F0EC]">
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#575752] hover:text-[#1C1C1A] transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <><Check className="w-3 h-3 text-emerald-600" /> Copied</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                    {index === 0 && (
                      <button
                        onClick={() => handleRegenerate(msg.id)}
                        disabled={regeneratingId === msg.id}
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#575752] hover:text-amber-600 transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3 h-3 ${regeneratingId === msg.id ? 'animate-spin' : ''}`} />
                        {regeneratingId === msg.id ? 'Regenerating...' : 'Regenerate'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="w-5 h-5 bg-[#1C1C1A] text-white flex items-center justify-center text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  AI
                </div>
                <span className="text-[10px] font-bold text-[#575752] uppercase tracking-widest animate-pulse">Composing response...</span>
              </div>
              <div className="p-4 rounded-none bg-white border border-[#E5E5E0] flex gap-1.5">
                <div className="w-2 h-2 bg-[#1C1C1A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#1C1C1A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#1C1C1A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleReply} className="p-4 bg-white border-t border-[#E5E5E0] flex gap-3 items-center mt-4">
        <input 
          type="text" 
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)} 
          placeholder="Simulate a prospect's reply to test conversation continuity..." 
          className="flex-1 bg-[#FBFBFA] border border-[#E5E5E0] focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] rounded-none px-4 py-3 outline-none transition-all text-sm"
          disabled={loading}
        />
        <button 
          disabled={loading || !replyText.trim()} 
          type="submit" 
          className="border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white p-3 hover:bg-transparent hover:text-[#1C1C1A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  )
}
