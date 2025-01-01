<script setup lang="ts">
import { useThreeScene } from '@/hooks/three';
import * as THREE from 'three';
import ColorsImage from '@/assets/colors.png';

const sceneRef = ref();
const { scene, camera } = useThreeScene(sceneRef);

scene.add(new THREE.AxesHelper(6));
scene.add(new THREE.GridHelper(10, 10));

camera.position.set(0, 10, 0);

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;
const backgroundImage = new Image();

backgroundImage.src = ColorsImage;
backgroundImage.onload = () => {
  canvas.width = backgroundImage.width;
  canvas.height = backgroundImage.height;

  context.drawImage(backgroundImage, 0, 0);

  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas) }));
  sprite.position.set(0, 0, 0);

  console.table({ 'canvas.width': canvas.width, 'canvas.height': canvas.height });
  console.table({ 'backgroundImage.width': backgroundImage.width, 'backgroundImage.height': backgroundImage.height });
  console.table(sprite.center);
  console.table(sprite.position);
  console.table(sprite.scale);

  scene.add(sprite);
};
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
