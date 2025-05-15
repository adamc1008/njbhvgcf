<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import postCard from '@/components/postCard.vue'
import { fetchStoryIds, fetchItem } from '@/utils/apiHelpers'

const props = defineProps({
  type: {
    type: String,
    default: "top"
  }
})

const stories = ref([])
const loading = ref(true)
const currentPage = ref(1)
const pageSize = 12
const totalPages = ref(0)
const storyIds = ref([])

const fetchStories = async () => {
  loading.value = true
  try {
    storyIds.value = await fetchStoryIds(props.type)
    totalPages.value = Math.ceil(storyIds.value.length / pageSize)
    await loadPage(1)
  } catch (err) {
    console.error(`Failed to fetch ${props.type} stories`, err)
  } finally {
    loading.value = false
  }
}

const loadPage = async (page) => {
  loading.value = true;
  currentPage.value = page;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const ids = storyIds.value.slice(start, end);

  try {
    const responses = await Promise.all(ids.map(fetchItem))
    stories.value = responses
  } catch (err) {
    console.error('Failed to load page:', err);
  } finally {
    loading.value = false;
  }
};
watch(currentPage, (newPage) => {
  console.log(`Page changed to: ${newPage}`);
  loadPage(newPage);
});

watch(() => props.type, fetchStories, { immediate: true })

onMounted(fetchStories)
watch(() => props.type, fetchStories)
</script>

<template>
  <div class="full-width-container">
    <div class="content-wrapper">
      <h2 id="feed-heading" class="mb-4 text-center" tabindex="-1">
        {{
          {
            top: 'Top Stories',
            new: 'New Stories',
            ask: 'Ask HN',
            show: 'Show HN',
            job: 'Job Listings'
          }[props.type]
        }}
      </h2>
      <section aria-labelledby="feed-heading">
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <div v-else class="row mx-0">
        <div v-for="story in stories" :key="story.id" class="col-12 col-md-4 mb-4 px-2">	
          <postCard :item="story" :type="props.type" />
        </div>
      </div>
      </section>
      <div class="d-flex justify-content-center my-4">
        <b-pagination
          v-model="currentPage"
          :total-rows="storyIds.length"
          :per-page="pageSize"
          align="center"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.full-width-container {
  background-color: hwb(176 86% 3%);
  top: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: absolute;
  left: 0;
  right: 0;
}

.content-wrapper {
  width: 100%;
  padding: 56px 0 0 0;
}

.row {
  width: 100%;
  margin: 0;
}

</style>
