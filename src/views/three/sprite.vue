<script setup lang="ts">
import { useThreeScene } from '@/hooks/three';
import * as THREE from 'three';
import ColorsImage from '@/assets/colors.png';

const sceneRef = ref();
const { scene, camera } = useThreeScene(sceneRef);

scene.add(new THREE.AxesHelper(6));
scene.add(new THREE.GridHelper(10, 10));

camera.position.set(0, 5, 0);

const text = 'ABC';
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;
const backgroundImage = new Image();

backgroundImage.src = ColorsImage;
backgroundImage.onload = () => {
  canvas.width = backgroundImage.width;
  canvas.height = backgroundImage.height;

  context.drawImage(backgroundImage, 0, 0);
  context.font = '20px Monaco';
  context.fillStyle = '#fff';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas) }));
  scene.add(sprite);

  console.log(context);
  console.log(context.measureText(text));
  console.table({ 'canvas.width': canvas.width, 'canvas.height': canvas.height });
  console.table({ 'backgroundImage.width': backgroundImage.width, 'backgroundImage.height': backgroundImage.height });
  console.log(sprite.center);
  console.log(sprite.position);
  console.log(sprite.scale);
};
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
