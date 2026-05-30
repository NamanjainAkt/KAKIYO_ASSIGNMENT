"use client"

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export function UserMenu() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
          router.refresh()
        },
      },
    })
  }

  return (
    <button 
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2.5 text-[#575752] font-bold text-xs uppercase tracking-wider hover:text-red-600 transition-colors disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" />
      <span>{loading ? 'Signing out...' : 'Sign Out'}</span>
    </button>
  )
}
