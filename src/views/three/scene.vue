<script setup lang="ts">
import { useThreeScene } from '@/hooks';
import * as THREE from 'three';

const sceneRef = ref();
const { scene } = useThreeScene(sceneRef);

scene.add(new THREE.AxesHelper(60));
scene.add(new THREE.GridHelper(100, 10));
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
