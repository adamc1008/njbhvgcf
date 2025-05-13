<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import postCard from '@/components/postCard.vue'

const stories = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const { data: ids } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
    const topIds = ids.slice(0, 12)

    const storyPromises = topIds.map(id =>
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    )

    const responses = await Promise.all(storyPromises)
    stories.value = responses.map(res => res.data)
  } catch (err) {
    console.error('Failed to fetch stories:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container-fluid px-0">
    <div class="content-wrapper">
      <h2 class="mb-4 text-center">Top Stories</h2>

      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <b-row v-else>
        <b-col v-for="story in stories" :key="story.id" cols="12" md="4" class="mb-4">	
          <postCard :item="story" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  background-color: hwb(176 2% 1%);
  width: 100vw;
  max-width: 100%;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
}

.content-wrapper {
  padding: 1rem;
  width: 100%;
  padding-top: 56px;
}
</style>

