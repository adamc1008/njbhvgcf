<script setup>
    defineProps({
        item: Object
    });
</script>

<template>
<div>
  <b-card :title='item.title' :subtitle='item.by' class="h-100 d-flex flex-column pb-2" style="min-height: 300px">
    <b-card-text class="flex-grow-1">
        {{ item.text ? item.text.slice(0, 90) + (item.text.length > 90 ? '...' : '') : '' }}
    </b-card-text>

    <a href="#" class="card-link">Card link</a>
    <b-link href="#" class="card-link">Another link</b-link>
    <template #footer>
        <em>{{item.score}} points, {{item.descendants}} comments</em>
    </template>
  </b-card>
</div>
    
</template>