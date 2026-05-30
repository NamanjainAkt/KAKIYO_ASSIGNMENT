"use client"
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/'
      })
      if (result.error) {
        setError(result.error.message || 'Registration failed')
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
          <h1 className="font-serif text-3xl font-black text-[#1C1C1A]">Get Started</h1>
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">Create a new Kakiyo account</p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-medium">
            {error}
          </div>
        )}
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#575752] mb-1.5">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full rounded-none border border-[#E5E5E0] bg-[#FBFBFA] p-3 outline-none focus:border-[#1C1C1A] focus:ring-1 focus:ring-[#1C1C1A] transition-all text-sm" 
              required
            />
          </div>
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
              minLength={8}
            />
            <p className="text-[10px] text-[#575752] mt-1">Minimum 8 characters</p>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 border-2 border-[#1C1C1A] bg-[#1C1C1A] text-white px-4 py-3.5 font-bold tracking-wide uppercase text-xs hover:bg-transparent hover:text-[#1C1C1A] transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-sm text-[#575752]">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-amber-600 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
