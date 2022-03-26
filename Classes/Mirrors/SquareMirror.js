import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class SquareMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);

    this.squareWidth = width / params.countX;
    this.squareHeight = height / params.countY;
    for (let i = 0; i < params.countX * params.countY; i++) this.drawer.addShape(new Square(this.squareWidth, this.squareHeight, padding));
  }

  static parameters(width, height) {
    return [
      {
        name: "countX",
        required: true,
        label: "تعداد تکرار در عرض",
        default: Math.round(width / 25),
        min: Math.ceil(width / 50),
        max: Math.floor(width / 10),
      },
      {
        name: "countY",
        required: true,
        label: "تعداد تکرار در ارتفاع",
        default: Math.round(width / 25),
        min: Math.ceil(width / 50),
        max: Math.floor(width / 10),
      },
    ];
  }

  drawMeasures(ctx, params, size = 1) {
    let hs = new Square(this.squareWidth, this.squareHeight, this.padding);
    hs.drawMeasures(ctx, 50.5, 40.5, params.countY * params.countX, 80 * size);
  }
}
