import { describe, it, expect, vi } from 'vitest'
import { timeAgo } from '@/utils/formatTime'

describe('timeAgo', () => {
  const now = Math.floor(Date.now() / 1000)

  it('returns "just now" for 0 seconds ago', () => {
    expect(timeAgo(now)).toBe('just now')
  })

  it('returns "1 second ago"', () => {
    expect(timeAgo(now - 1)).toBe('1 second ago')
  })

  it('returns "2 minutes ago"', () => {
    expect(timeAgo(now - 120)).toBe('2 minutes ago')
  })

  it('returns "1 hour ago"', () => {
    expect(timeAgo(now - 3600)).toBe('1 hour ago')
  })

  it('returns "1 day ago"', () => {
    expect(timeAgo(now - 86400)).toBe('1 day ago')
  })

  it('returns "1 year ago"', () => {
    expect(timeAgo(now - 31536000)).toBe('1 year ago')
  })
})
