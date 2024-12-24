import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/babylon',
  children: [
    {
      path: 'scene',
      component: () => import('@/views/babylon/scene.vue'),
    },
  ],
} as RouteRecordRaw;
