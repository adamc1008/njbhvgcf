import { mount, flushPromises } from '@vue/test-utils'
import CardGroup from '@/components/cardGroup.vue'
import axios from 'axios'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('axios')

const mockStories = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Story ${i + 1}`,
  by: `user${i + 1}`,
  score: i * 10,
  descendants: i * 2,
}))

describe('CardGroup.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('displays top stories', async () => {
    vi.spyOn(axios, 'get').mockImplementation((url) => {
      if (url.includes('topstories')) {
        return Promise.resolve({ data: mockStories.map((s) => s.id) })
      }
      if (url.includes('/item/')) {
        const id = parseInt(url.split('/item/')[1])
        return Promise.resolve({ data: mockStories.find((s) => s.id === id) })
      }
    })

    const wrapper = mount(CardGroup, {
      props: { type: 'top' },
      global: {
        stubs: {
          postCard: {
            props: ['item'],
            template: `<div class="mock-post-card">{{ item.title }}</div>`,
          },
          'b-row': { template: '<div><slot /></div>' },
          'b-col': { template: '<div><slot /></div>' },
          'b-pagination': true,
        },
      },
    })

    await flushPromises()

    const cards = wrapper.findAll('.mock-post-card')
    expect(cards.length).toBe(12)
    expect(cards[0].text()).toContain('Story 1')
  })

  it('pagination test', async () => {
    vi.spyOn(axios, 'get').mockImplementation((url) => {
      if (url.includes('askstories')) {
        return Promise.resolve({ data: [999] })
      }
      if (url.includes('/item/999')) {
        return Promise.resolve({
          data: { id: 999, title: 'Ask Something', by: 'curious' }
        })
      }
    })

    const wrapper = mount(CardGroup, {
      props: { type: 'top' },
      global: {
        stubs: {
          postCard: {
            props: ['item'],
            template: `<div class="mock-post-card">{{ item.title }}</div>`,
          },
          'b-row': true,
          'b-col': true,
          'b-pagination': true,
        },
      },
    })

    await wrapper.setProps({ type: 'ask' })
    await flushPromises()

    const cards = wrapper.findAll('.mock-post-card')
    expect(cards.length).toBe(1)
    expect(cards[0].text()).toContain('Ask Something')
  })
})
