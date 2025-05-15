<script setup>
import { timeAgo } from '@/utils/formatTime'
import { truncate } from '@/utils/truncateText'

    defineProps({
        item: Object,
        type: String,
    });
</script>

<template>
<div>
  <b-card
  class="h-100 d-flex flex-column pb-2"
  :title="null"
  role="article"
  style="min-height: 300px;"
  :aria-labelledby="`post-${item.id}-title`"
  data-testid="post-card"
>
  <h3 id="post-{{ item.id }}-title">{{ item.title }}</h3>
  <p><strong>By:</strong> {{ item.by }}</p>
    <b-card-text v-if="item.text" class="flex-grow-1">
        {{ truncate(item.text, 100) }}
    </b-card-text>

    <b-link v-if="item.url" :href="item.url" target="_blank">Read More</b-link>

    <b-link :to="`/item/${item.id}`" class="card-link">View Comments</b-link>

    <template #footer>
      <p aria-label="Post meta information">
        <time :datetime="new Date(item.time * 1000).toISOString()">
          {{ timeAgo(item.time) }}
        </time>,
        {{ item.score }} points
        <template v-if="type !== 'job' && item.descendants">
          , {{ item.descendants }} comments
        </template>
      </p>
</template>
  </b-card>
</div>
    
</template>

