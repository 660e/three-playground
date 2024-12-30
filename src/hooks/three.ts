import { useDebounceFn, useElementSize, useResizeObserver } from '@vueuse/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import * as THREE from 'three';

export const useThreeScene = (el: Ref) => {
  const { width, height } = useElementSize(el);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const renderer = new THREE.WebGLRenderer();
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  const stats = new Stats();

  camera.position.set(100, 100, 100);
  renderer.setAnimationLoop(animate);

  onMounted(() => {
    initialize();
    el.value.appendChild(renderer.domElement);
    el.value.appendChild(stats.dom);
  });

  useResizeObserver(el, useDebounceFn(initialize, 100));

  function animate() {
    orbitControls.update();
    renderer.render(scene, camera);
  }

  function initialize() {
    camera.aspect = width.value / height.value;
    camera.updateProjectionMatrix();
    renderer.setSize(width.value, height.value);
  }

  return { width, height, scene, camera, renderer, orbitControls };
};
