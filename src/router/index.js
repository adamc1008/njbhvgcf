import { createRouter, createWebHashHistory } from 'vue-router'
import CardGroup from '@/components/cardGroup.vue'
import PostComments from '@/components/postComments.vue';

const routes = [
  { path: '/', redirect: '/top' },
  { path: '/:type', name: 'StoryType', component: CardGroup, props: true },
  { path: '/item/:id', name: 'Item', component: PostComments, props: true }
]

export default createRouter({
  history: createWebHashHistory(), 
  routes
});
