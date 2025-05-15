<script setup>
  import { ref } from 'vue';
  import Navbar from '@/components/navbar.vue';
  import CardGroup from '@/components/cardGroup.vue';

  const storyType = ref('top')

</script>


<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped>
 body, html {
  padding: 0 !important;
  margin: 0 !important;
  overflow-x: hidden !important;
 }
 </style>