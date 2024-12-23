import { useElementSize } from '@vueuse/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export const useThreeScene = (el: Ref) => {
  const { width, height } = useElementSize(el);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const renderer = new THREE.WebGLRenderer();
  const orbitControls = new OrbitControls(camera, renderer.domElement);

  camera.position.set(100, 100, 100);
  renderer.setAnimationLoop(animate);

  onMounted(() => {
    camera.aspect = width.value / height.value;
    camera.updateProjectionMatrix();
    renderer.setSize(width.value, height.value);
    el.value.appendChild(renderer.domElement);
  });

  function animate() {
    orbitControls.update();
    renderer.render(scene, camera);
  }

  return { scene, camera, renderer, orbitControls };
};
