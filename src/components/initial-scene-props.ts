import { SceneProps } from './scene';

export const initialSceneProps = {
  plane: {
    x: {
      min: -3,
      max: 3,
    },
    y: {
      min: -3,
      max: 3,
    },
  },
  quality: 100,
  scale: 1,
  colorFunc: null,
} satisfies SceneProps;
