<script setup lang="ts">
import { useThreeScene } from '@/hooks/three';
import { loadModel } from '@/utils/three';
import * as THREE from 'three';

const sceneRef = ref();
const { camera, scene, width: sceneWidth, height: sceneHeight } = useThreeScene(sceneRef);

camera.position.set(30, 30, 30);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

onMounted(async () => {
  window.addEventListener('pointermove', onPointerMove);

  const model = await loadModel('/models/building.glb');
  if (model) {
    model.scale.set(10, 10, 10);
    scene.add(model);
  }
});
onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove);
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let uuid: string | undefined;
let intersected: THREE.Object3D | undefined;

const onPointerMove = (event: MouseEvent) => {
  pointer.x = (event.clientX / sceneWidth.value) * 2 - 1;
  pointer.y = -(event.clientY / sceneHeight.value) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length) {
    const { object } = intersects[0];
    if (object.parent?.uuid !== uuid) {
      emissive(intersected);
      uuid = object.parent?.uuid;
      intersected = object;
      emissive(intersected, 0x0000ff);
      console.log(uuid);
    }
  } else {
    if (uuid) {
      emissive(intersected);
      uuid = undefined;
      intersected = undefined;
      console.log(uuid);
    }
  }
};

const emissive = (object?: THREE.Object3D, color = 0x000000) => {
  object?.parent?.traverse((child) => {
    const item = child as THREE.Mesh;
    if (item.isMesh) {
      (item.material as THREE.MeshStandardMaterial).emissive.set(color);
    }
  });
};
</script>

<template>
  <div class="h-screen" ref="sceneRef"></div>
</template>
