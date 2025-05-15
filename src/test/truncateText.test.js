import { describe, it, expect } from 'vitest'
import { truncate } from '@/utils/truncateText'

describe('truncate', () => {
  it('returns the same string if under the limit', () => {
    const input = 'Short text'
    expect(truncate(input, 20)).toBe('Short text')
  })

  it('truncates long text', () => {
    const input = 'a'.repeat(120)
    const result = truncate(input, 100)
    expect(result).toBe('a'.repeat(100) + '…')
  })

  it('returns empty string for undefined/null', () => {
    expect(truncate(undefined)).toBe('')
    expect(truncate(null)).toBe('')
  })
})
