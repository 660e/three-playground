<script setup lang="ts">
import { useThreeScene } from '@/hooks/three';
import { loadModel } from '@/utils/three';
import * as THREE from 'three';

const sceneRef = ref();
const { camera, scene, width: sceneWidth, height: sceneHeight } = useThreeScene(sceneRef);

scene.add(new THREE.AxesHelper(60));
scene.add(new THREE.GridHelper(100, 10));

camera.position.set(50, 50, 50);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

onMounted(async () => {
  window.addEventListener('pointermove', onPointerMove);

  const model = await loadModel('/models/home.glb');
  if (model) {
    scene.add(model);
    console.log(scene.children);
  }
});
onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove);
});

const onPointerMove = (event: MouseEvent) => {
  pointer.x = (event.clientX / sceneWidth.value) * 2 - 1;
  pointer.y = -(event.clientY / sceneHeight.value) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length) {
    const intersected = intersects[0];
    console.log(intersected);
  }
};
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
