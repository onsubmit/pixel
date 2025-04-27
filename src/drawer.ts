import { CanvasModel } from './canvas-model';
import { Coordinate } from './components/coordinate';

export class Drawer {
  private _canvasModel: CanvasModel;

  constructor(canvasModel: CanvasModel) {
    this._canvasModel = canvasModel;
  }

  clear = (): void => {
    this._canvasModel.context?.clearRect(
      0,
      0,
      this._canvasModel.canvasDimensions.width,
      this._canvasModel.canvasDimensions.height,
    );
  };

  draw = (coordinate: Coordinate, color: string, scale: number): void => {
    if (!this._canvasModel.context) {
      return;
    }

    const p = this.mapCoordsToCanvas(coordinate);
    this._canvasModel.context.fillStyle = color;
    this._canvasModel.context.fillRect(p.x, p.y, scale, scale);
  };

  private mapCoordsToCanvas = (c: Coordinate): Coordinate => {
    return {
      x: Math.round(
        ((c.x - this._canvasModel.cartesianPlane.x.min) /
          this._canvasModel.cartesianDimensions.width) *
          this._canvasModel.canvasDimensions.width,
      ),
      y: Math.round(
        this._canvasModel.canvasDimensions.height -
          ((c.y - this._canvasModel.cartesianPlane.y.min) /
            this._canvasModel.cartesianDimensions.height) *
            this._canvasModel.canvasDimensions.height,
      ),
    };
  };
}
