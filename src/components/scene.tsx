import { JSX, useEffect, useMemo, useRef, useState } from 'react';

import { CanvasModel } from '../canvas-model';
import { CartesianPlane } from '../cartesian-plane';
import { ColorFunc } from '../color-func';
import { Drawer } from '../drawer';
import { Canvas } from './canvas';
import styles from './scene.module.css';

export type AnimationState = 'stopped' | 'playing';

export type SceneProps = {
  plane: CartesianPlane;
  quality: number;
  scale: number;
  colorFunc: ColorFunc | null;
  animation: AnimationState;
};

export function Scene({ plane, quality, scale, colorFunc, animation }: SceneProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const animationRequestIdRef = useRef<number>(-1);
  const timestampRef = useRef<number>(1000);

  const increment = 1 / quality;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasModel = useMemo(
    () => new CanvasModel(quality, scale, plane),
    [plane, quality, scale],
  );

  useEffect(() => {
    if (!canvasRef.current || !colorFunc) {
      return;
    }

    const canvas = canvasRef.current;
    canvasModel.context = canvas.getContext('2d');
    if (!canvasModel.context) {
      throw new Error('Could not get canvas drawing context');
    }

    canvas.style.width = `${canvasModel.canvasDimensions.width}px`;
    canvas.style.height = `${canvasModel.canvasDimensions.height}px`;

    setVisible(true);

    const drawer = new Drawer(canvasModel);

    const draw = (time: DOMHighResTimeStamp): void => {
      timestampRef.current = time;

      let i = 0;
      for (let y = plane.y.max; y >= plane.y.min; y -= increment) {
        for (let x = plane.x.min; x <= plane.x.max; x += increment) {
          drawer.draw({ x, y }, colorFunc(x, y, time, i++, plane), scale);
        }
      }
    };

    function step(time: DOMHighResTimeStamp): void {
      draw(time);

      if (animation === 'playing') {
        animationRequestIdRef.current = window.requestAnimationFrame(step);
      } else {
        window.cancelAnimationFrame(animationRequestIdRef.current);
      }
    }

    if (animation === 'playing') {
      animationRequestIdRef.current = window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(animationRequestIdRef.current);
      draw(timestampRef.current);
    }
  }, [animation, canvasModel, colorFunc, increment, plane, quality, scale]);

  return (
    <div className={styles.scene}>
      <Canvas
        ref={canvasRef}
        className={visible ? undefined : styles.hidden}
        width={canvasModel.canvasDimensions.width}
        height={canvasModel.canvasDimensions.height}
      ></Canvas>
    </div>
  );
}
