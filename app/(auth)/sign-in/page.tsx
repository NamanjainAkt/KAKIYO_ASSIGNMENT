"use client"
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/'
      })
      if (result.error) {
        setError(result.error.message || 'Invalid credentials')
        setLoading(false)
        return
      }
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <div className="w-full max-w-md border-2 border-[#1C1C1A] bg-white p-8 space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-black text-[#1C1C1A]">Welcome Back</h1>
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">Sign in to your Kakiyo account</p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#575752] mb-1.5">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all text-sm" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#575752] mb-1.5">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all text-sm"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-4 py-3.5 font-bold tracking-wide uppercase text-xs hover:bg-transparent hover:text-[#1C1C1A] transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-[#575752]">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-amber-600 font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
