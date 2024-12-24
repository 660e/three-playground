import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/three',
  children: [
    {
      path: 'scene',
      component: () => import('@/views/three/scene.vue'),
    },
  ],
} as RouteRecordRaw;
