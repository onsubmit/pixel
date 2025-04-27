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
  quality: 20,
  scale: 5,
  colorFunc: null,
  animation: 'stopped',
} satisfies SceneProps;
