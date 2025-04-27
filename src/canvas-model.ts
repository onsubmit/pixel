import { CartesianPlane } from './cartesian-plane';
import { Dimensions } from './dimensions';

export class CanvasModel {
  canvasQuality: number;
  canvasScale: number;
  cartesianDimensions: Dimensions;
  canvasDimensions: Dimensions;
  cartesianPlane: CartesianPlane;
  context: CanvasRenderingContext2D | null;

  constructor(canvasQuality: number, canvasScale: number, cartesianPlane: CartesianPlane) {
    const cartesianDimensions = {
      width: cartesianPlane.x.max - cartesianPlane.x.min,
      height: cartesianPlane.y.max - cartesianPlane.y.min,
    };

    const canvasDimensions = {
      width: canvasQuality * canvasScale * cartesianDimensions.width,
      height: canvasQuality * canvasScale * cartesianDimensions.height,
    };

    this.canvasQuality = canvasQuality;
    this.canvasScale = canvasScale;
    this.cartesianDimensions = cartesianDimensions;
    this.canvasDimensions = canvasDimensions;
    this.cartesianPlane = cartesianPlane;
    this.context = null;
  }
}
