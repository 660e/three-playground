<script setup lang="ts">
import { CreateGround, CreateSphere, Engine, FreeCamera, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';

const renderCanvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  const engine = new Engine(renderCanvasRef.value!);
  const scene = new Scene(engine);

  const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(renderCanvasRef.value, true);

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const material = new GridMaterial('grid', scene);
  const sphere = CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);
  sphere.position.y = 2;
  sphere.material = material;

  const ground = CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, scene);
  ground.material = material;

  engine.runRenderLoop(() => {
    scene.render();
  });
});
</script>

<template>
  <canvas class="h-screen" ref="renderCanvasRef"></canvas>
</template>
