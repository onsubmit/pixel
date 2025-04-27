/* eslint-disable no-debugger */
import { CartesianPlane } from './cartesian-plane';

export type ColorFunc = (
  x: number,
  y: number,
  t: DOMHighResTimeStamp,
  i: number,
  plane: CartesianPlane,
) => string;

export const defaultColorFunc = `(x, y, t, i, plane) => {
  const { sin, cos, tan, abs, sqrt } = Math;

  const x2 = x * x;
  const y2 = y * y;
  const y3 = y2 * y;

  const diff = abs((tan(x2 * sin(y2) + y3 * cos(x)) / 64) * sqrt(x2 + y2) - sin(x * y));
  const inv = 1 / diff;

  const r = 32 * inv * sin(t / 1000 - sqrt(x2 + y2 / (i + 1)));
  const g = 8 * inv * (1 + sin(x + y)) * tan(t / (2000 + i / 10000) + sqrt(x2 + y2));
  const b = 16 * inv * (1 + cos(x + y)) + cos(t / (4000 + i / 10000) - sqrt(abs(x2 + y)));
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

    return (x, y, t, i, plane) => {
      try {
        const color = func(x, y, t, i, plane).toString();
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    debugger;
    return unknown;
  }
};
