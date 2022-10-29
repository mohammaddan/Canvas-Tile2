import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class SquareMirror extends BaseMirror {
  /**
   *
   * @param ctx
   * @param width
   * @param height
   * @param {{countX,countY}} params
   * @param padding
   * @param scale
   */
  constructor(ctx, width, height, params, padding = 0,scale=1) {
    super(ctx, width, height,0,scale);

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
        default: Math.round(height / 25),
        min: Math.ceil(height / 50),
        max: Math.floor(height / 10),
      },
    ];
  }

  drawMeasures(ctx, params, size = 1) {
    let hs = new Square(this.squareWidth, this.squareHeight, this.padding);
    hs.drawMeasures(ctx, 50.5, 40.5, params.countY * params.countX, 80 * size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'مربع',name:'square',primitive:new Square(this.squareWidth, this.squareHeight)},
      // new Square(width,height),
    ];
  }
}
