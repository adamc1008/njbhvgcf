import { mount, flushPromises } from '@vue/test-utils'
import PostComments from '@/components/postComments.vue'
import axios from 'axios'
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('axios')
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: '123' } })
}))

const mockStory = {
  id: 123,
  title: 'Mock Story',
  by: 'testuser',
  score: 100,
  kids: [1, 2]
}

const mockComments = [
  {
    id: 1,
    by: 'commenter1',
    text: '<p>First comment</p>'
  },
  {
    id: 2,
    by: 'commenter2',
    text: '<p>Second comment</p>'
  }
]

describe('PostComments.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('shows story details and comments', async () => {
    vi.spyOn(axios, 'get').mockImplementation((url) => {
      if (url.includes('/item/123')) return Promise.resolve({ data: mockStory })
      if (url.includes('/item/1')) return Promise.resolve({ data: mockComments[0] })
      if (url.includes('/item/2')) return Promise.resolve({ data: mockComments[1] })
    })

    const wrapper = mount(PostComments, {
      global: {
        stubs: {
          'b-container': { template: '<div><slot /></div>' },
          'b-row': { template: '<div><slot /></div>' },
          'b-col': { template: '<div><slot /></div>' },
          'b-card': {
            props: ['title'],
            template: `<div class="mock-card"><slot /></div>`
          },
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Mock Story')
    expect(wrapper.text()).toContain('testuser')
    expect(wrapper.text()).toContain('100')

    const comments = wrapper.findAll('.mock-card')
    expect(comments).toHaveLength(2)
    expect(wrapper.html()).toContain('First comment')
    expect(wrapper.html()).toContain('Second comment')
  })

  it('shows loading spinner initially', async () => {
    vi.spyOn(axios, 'get').mockImplementation(() => new Promise(() => {}))

    const wrapper = mount(PostComments, {
      global: {
        stubs: {
          'b-container': true,
          'b-row': true,
          'b-col': true,
          'b-card': true,
        },
      },
    })

    expect(wrapper.html()).toContain('spinner-border')
  })
})
