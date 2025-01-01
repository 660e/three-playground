import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();
export const loadModel = async (url: string, progress?: boolean) => {
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

const cubeTextureLoader = new THREE.CubeTextureLoader();
export const loadSkybox = () => {
  return cubeTextureLoader.load(['/skybox/x-.webp', '/skybox/x+.webp', '/skybox/y+.webp', '/skybox/y-.webp', '/skybox/z+.webp', '/skybox/z-.webp']);
};
