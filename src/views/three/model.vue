<script setup lang="ts">
import { useThreeModelLoader, useThreeScene } from '@/hooks';
import * as THREE from 'three';

const sceneRef = ref();
const { scene } = useThreeScene(sceneRef);

scene.add(new THREE.AxesHelper(60));
scene.add(new THREE.GridHelper(100, 10));

onMounted(async () => {
  const model = await useThreeModelLoader('/models/school-building.glb');

  if (!model) return;
  console.log(model);
  model.position.set(0, 0, -10);
  model.scale.set(20, 20, 20);
  scene.add(model);
});
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
