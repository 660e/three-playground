import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/three',
  children: [
    {
      path: 'model',
      component: () => import('@/views/three/model.vue'),
    },
    {
      path: 'raycaster',
      component: () => import('@/views/three/raycaster.vue'),
    },
    {
      path: 'scene',
      component: () => import('@/views/three/scene.vue'),
    },
    {
      path: 'shadow',
      component: () => import('@/views/three/shadow.vue'),
    },
    {
      path: 'skybox',
      component: () => import('@/views/three/skybox.vue'),
    },
    {
      path: 'sprite',
      component: () => import('@/views/three/sprite.vue'),
    },
  ],
} as RouteRecordRaw;
