import { JSX, useRef } from 'react';

import styles from './config.module.css';
import { initialSceneProps } from './initial-scene-props';
import { AnimationState, SceneProps } from './scene';

const initialInputs = {
  xmin: null,
  xmax: null,
  ymin: null,
  ymax: null,
  quality: null,
  scale: null,
};

type InputRefs = {
  [k in keyof typeof initialInputs]: HTMLInputElement | null;
};

type ConfigParams = {
  render: (
    sceneParams: Omit<SceneProps, 'colorFunc' | 'animation'>,
    animation?: AnimationState,
  ) => void;
};

export function Config({ render }: ConfigParams): JSX.Element {
  const inputRef = useRef<InputRefs>(initialInputs);

  const draw = (animation?: AnimationState): void => {
    const { xmin, xmax, ymin, ymax, quality, scale } = inputRef.current;
    render(
      {
        plane: {
          x: {
            min: xmin?.valueAsNumber ?? initialSceneProps.plane.x.min,
            max: xmax?.valueAsNumber ?? initialSceneProps.plane.x.max,
          },
          y: {
            min: ymin?.valueAsNumber ?? initialSceneProps.plane.y.min,
            max: ymax?.valueAsNumber ?? initialSceneProps.plane.y.max,
          },
        },
        quality: quality?.valueAsNumber ?? initialSceneProps.quality,
        scale: scale?.valueAsNumber ?? initialSceneProps.scale,
      },
      animation,
    );
  };

  return (
    <div className={styles.config}>
      <div className={styles.column}>
        <div className={styles.formGroup}>
          <label htmlFor="xmin">x min:</label>
          <input
            ref={(ref) => {
              inputRef.current.xmin = ref;
            }}
            type="number"
            name="xmin"
            id="xmin"
            defaultValue={initialSceneProps.plane.x.min}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="xmax">x max:</label>
          <input
            ref={(ref) => {
              inputRef.current.xmax = ref;
            }}
            type="number"
            name="xmax"
            id="xmax"
            defaultValue={initialSceneProps.plane.x.max}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ymin">y min:</label>
          <input
            ref={(ref) => {
              inputRef.current.ymin = ref;
            }}
            type="number"
            name="ymin"
            id="ymin"
            defaultValue={initialSceneProps.plane.y.min}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ymax">y max:</label>
          <input
            ref={(ref) => {
              inputRef.current.ymax = ref;
            }}
            type="number"
            name="ymax"
            id="ymax"
            defaultValue={initialSceneProps.plane.y.max}
          ></input>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.formGroup}>
          <label htmlFor="quality">quality:</label>
          <input
            ref={(ref) => {
              inputRef.current.quality = ref;
            }}
            type="number"
            min="10"
            max="1000"
            step="10"
            name="quality"
            id="quality"
            defaultValue={initialSceneProps.quality}
          ></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="scale">scale:</label>
          <input
            ref={(ref) => {
              inputRef.current.scale = ref;
            }}
            type="number"
            min="1"
            max="20"
            name="scale"
            id="scale"
            defaultValue={initialSceneProps.scale}
          ></input>
        </div>
        <button onClick={() => draw()}>Render</button>
        <button onClick={() => draw('playing')}>Play</button>
        <button onClick={() => draw('stopped')}>Stop</button>
      </div>
    </div>
  );
}
