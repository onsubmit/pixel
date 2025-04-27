import { ComponentPropsWithRef, JSX } from 'react';

type CanvasProps = ComponentPropsWithRef<'canvas'>;

export function Canvas({ ref, ...props }: CanvasProps): JSX.Element {
  return <canvas ref={ref} {...props}></canvas>;
}
