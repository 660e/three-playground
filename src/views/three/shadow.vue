<script setup lang="ts">
import { useThreeScene } from '@/hooks/three';
import { loadModel } from '@/utils/three';
import * as THREE from 'three';

const sceneRef = ref();
const { camera, scene, renderer } = useThreeScene(sceneRef);

camera.position.set(50, 50, 50);

renderer.shadowMap.enabled = true;

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(100, 100, -100);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.bottom = -50;
directionalLight.shadow.camera.far = 300;
directionalLight.shadow.bias = -0.0005;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshStandardMaterial({ color: 0x999999 }));
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

onMounted(async () => {
  const model = await loadModel('/models/building.glb');
  if (model) {
    model.scale.set(10, 10, 10);
    model.traverse((object) => {
      object.castShadow = true;
      object.receiveShadow = true;
    });
    scene.add(model);
  }
});
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
