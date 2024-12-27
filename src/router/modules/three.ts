import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/three',
  children: [
    {
      path: 'model',
      component: () => import('@/views/three/model.vue'),
    },
    {
      path: 'scene',
      component: () => import('@/views/three/scene.vue'),
    },
  ],
} as RouteRecordRaw;
