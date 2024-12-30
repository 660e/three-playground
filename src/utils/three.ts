import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();

export const modelLoader = async (url: string) => {
  try {
    const gltf = await gltfLoader.loadAsync(url, (event) => {
      console.log(`${Math.floor((event.loaded / event.total) * 100)}%`);
    });
    return gltf.scene;
  } catch {
    console.error(url);
  }
};