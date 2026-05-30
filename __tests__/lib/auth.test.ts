import { describe, it, expect } from 'vitest'
import { auth } from '@/lib/auth'

describe('Better Auth Config', () => {
  it('should initialize auth instance', () => {
    expect(auth).toBeDefined()
  })
})
