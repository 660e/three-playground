<script setup lang="ts">
import { useThreeScene } from '@/hooks/three';
import { modelLoader } from '@/utils/three';
import * as THREE from 'three';

const sceneRef = ref();
const { camera, scene } = useThreeScene(sceneRef);

scene.add(new THREE.AxesHelper(60));
scene.add(new THREE.GridHelper(100, 10));

camera.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

onMounted(async () => {
  const model = await modelLoader('/models/building.glb');
  if (model) scene.add(model);
});
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
