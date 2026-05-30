import { describe, it, expect } from 'vitest'
import { user, session, account, offerings, prompts } from '@/db/schema'

describe('Database Schema (Better Auth)', () => {
  it('should export user table', () => {
    expect(user).toBeDefined()
  })

  it('should export session table', () => {
    expect(session).toBeDefined()
  })

  it('should export account table', () => {
    expect(account).toBeDefined()
  })

  it('should export offerings table', () => {
    expect(offerings).toBeDefined()
  })

  it('should export prompts table', () => {
    expect(prompts).toBeDefined()
  })
})
