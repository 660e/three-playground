import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/playground',
  children: [
    {
      path: 'scene',
      component: () => import('@/views/playground/scene.vue'),
    },
  ],
} as RouteRecordRaw;
