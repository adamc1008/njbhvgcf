<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import DOMPurify from 'dompurify';
import { fetchStoryIds, fetchItem, fetchItemsByIds } from '@/utils/apiHelpers'
import { cleanHTML } from '@/utils/sanitise'

const route = useRoute()
const story = ref(null)
const comments = ref([])
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id
  try {
    story.value = await fetchItem(id)

    if (story.value.kids && story.value.kids.length) {
      const rawComments = await fetchItemsByIds(story.value.kids)

      comments.value = rawComments.map(comment => ({
        ...comment,
        text: cleanHTML(comment.text || '')
      }))
    }
  } catch (err) {
    console.error('Failed to fetch story/comments:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="wrapper">
  <b-container fluid>
    <h3>{{ story?.title }}</h3>
    <p><strong>By:</strong> {{ story?.by }}</p>
    <p><strong>Score:</strong> {{ story?.score }}</p>

    <hr />

    <h4>Comments</h4>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <b-row v-else>
      <b-col v-for="comment in comments" :key="comment.id" cols="12" md="6" lg="4" class="mb-4">
        <b-card role="comment" :aria-labelledby="`comment-${comment.id}-by`">
          <div v-html="comment.text" />
          <template #footer>
            <p id="comment-{{ comment.id }}-by">by {{ comment.by }}</p>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<style>
.wrapper {
  padding: 150px 0 0 0;
}
</style>