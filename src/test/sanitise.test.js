import { describe, it, expect } from 'vitest'
import { cleanHTML } from '@/utils/sanitise'

describe('cleanHTML', () => {
  it('removes dangerous tags', () => {
    const dirty = '<img src=x onerror=alert(1)>Hello'
    const result = cleanHTML(dirty)
    expect(result).toBe('<img src="x">Hello') 
  })

  it('returns empty string if input is undefined', () => {
    const result = cleanHTML(undefined)
    expect(result).toBe('')
  })
})
