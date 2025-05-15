import axios from 'axios'

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export async function fetchItem(id) {
  const { data } = await axios.get(`${BASE_URL}/item/${id}.json`)
  return data
}

export async function fetchStoryIds(type = 'top') {
  const { data } = await axios.get(`${BASE_URL}/${type}stories.json`)
  return data
}

export async function fetchItemsByIds(ids = []) {
  const results = await Promise.all(ids.map(fetchItem))
  return results.filter(item => item && item.id)
}
