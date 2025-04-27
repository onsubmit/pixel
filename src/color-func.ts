/* eslint-disable no-debugger */
import { CartesianPlane } from './cartesian-plane';

export type ColorFunc = (x: number, y: number, plane: CartesianPlane) => string;

export const defaultColorFunc = `(x, y, plane) => {
  const { sin, cos, tan, abs, sqrt } = Math;

  const x2 = x * x;
  const y2 = y * y;
  const y3 = y2 * y;

  const diff = abs((tan(x2 * sin(y2) + y3 * cos(x)) / 64) * sqrt(x2 + y2) - sin(x * y));
  const inv = 1 / diff;

  const r = 32 * inv;
  const g = 8 * inv * (1 + sin(x + y));
  const b = 16 * inv * (1 + cos(x + y));
  const a = 1;

  const color = \`rgba(\${[r, g, b, a].join(',')})\`;
  return color;
}`;

export const getColorFunc = (js: string | undefined): ColorFunc => {
  const unknown: ColorFunc = () => 'black';
  if (!js) {
    return unknown;
  }

  try {
    const func = eval(js);
    if (!(func instanceof Function)) {
      debugger;
      return unknown;
    }

    return (x, y, plane) => {
      try {
        const color = func(x, y, plane).toString();
        if (typeof color !== 'string' || !CSS.supports('color', color)) {
          debugger;
          return 'black';
        }
        return color;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        debugger;
        return 'red';
      }
    };
  } catch {
    return unknown;
  }
};
