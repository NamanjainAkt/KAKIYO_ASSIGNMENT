import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SignInPage from '@/app/(auth)/sign-in/page'
import SignUpPage from '@/app/(auth)/sign-up/page'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: { email: vi.fn() },
    signUp: { email: vi.fn() }
  }
}))

describe('Auth Pages', () => {
  it('renders sign in form', () => {
    render(<SignInPage />)
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeDefined()
  })

  it('renders sign up form', () => {
    render(<SignUpPage />)
    expect(screen.getByRole('heading', { name: /create an account/i })).toBeDefined()
  })
})
