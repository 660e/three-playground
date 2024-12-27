import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();

export const useThreeModelLoader = async (url: string) => {
  try {
    const gltf = gltfLoader.loadAsync(url, (event) => {
      console.log(`${Math.floor((event.loaded / event.total) * 100)}%`);
    });
    return gltf;
  } catch (error) {
    console.error(error);
  }
};
