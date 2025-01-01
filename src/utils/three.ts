import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const cubeTextureLoader = new THREE.CubeTextureLoader();
const gltfLoader = new GLTFLoader();

export const modelLoader = async (url: string, progress?: boolean) => {
  try {
    const gltf = await gltfLoader.loadAsync(url, (event) => {
      if (progress) {
        console.log(`${Math.floor((event.loaded / event.total) * 100)}%`);
      }
    });
    return gltf.scene;
  } catch {
    console.error(url);
  }
};

export const loadSkybox = () => {
  const texture = cubeTextureLoader.load([]);

  return texture;
};
