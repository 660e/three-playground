<script setup lang="ts">
import { useThreeScene } from '@/hooks/three';
import { loadModel } from '@/utils/three';
import * as THREE from 'three';

const sceneRef = ref();
const { camera, scene } = useThreeScene(sceneRef);

scene.add(new THREE.AxesHelper(60));
scene.add(new THREE.GridHelper(100, 10));

camera.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

onMounted(async () => {
  const model = await loadModel('/models/building.glb');
  if (model) {
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    scene.add(model);
  }
});
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
