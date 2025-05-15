import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchItem, fetchStoryIds, fetchItemsByIds } from '@/utils/apiHelpers'

vi.mock('axios')

beforeEach(() => {
  vi.resetAllMocks()
})

describe('API utilities', () => {
  it('fetchItem returns a single item', async () => {
    axios.get.mockResolvedValue({ data: { id: 1, title: 'Story 1' } })
    const result = await fetchItem(1)
    expect(result).toEqual({ id: 1, title: 'Story 1' })
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/item/1.json'))
  })

  it('fetchStoryIds returns an array of IDs', async () => {
    axios.get.mockResolvedValue({ data: [1, 2, 3] })
    const result = await fetchStoryIds('top')
    expect(result).toEqual([1, 2, 3])
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/topstories.json'))
  })

  it('fetchItemsByIds returns multiple items', async () => {
    const mockData = [
      { id: 1, title: 'Comment 1' },
      { id: 2, title: 'Comment 2' }
    ]
    axios.get
      .mockResolvedValueOnce({ data: mockData[0] })
      .mockResolvedValueOnce({ data: mockData[1] })

    const result = await fetchItemsByIds([1, 2])
    expect(result).toEqual(mockData)
  })
})
