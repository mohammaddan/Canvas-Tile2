import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

/**
 * params is object that has countX,countY
 */
export default class BrickMirror extends BaseMirror {
  /**
   *
   * @param ctx
   * @param width
   * @param height
   * @param {{countX:int,countY:int}} params
   * @param padding
   * @param scale
   */
  constructor(ctx, width, height, params, padding = 0,scale=1) {
    super(ctx, width, height,0,scale);
    this.padding = padding;
    this.squareWidth = width / params.countX;
    this.squareHeight = height / params.countY;
    for (let j = 0; j < params.countY; j += 2) {
      this.drawer.addOneShapeAt(
        0,
        j * this.squareHeight,
        new Square(this.squareWidth / 2, this.squareHeight, padding)
      );
      this.drawer.addOneRowOfShapes(
        this.squareWidth / 2,
        j * this.squareHeight,
        new Square(this.squareWidth, this.squareHeight, padding),
        params.countX - 1
      );
      this.drawer.addOneShapeAt(
        width - this.squareWidth / 2,
        j * this.squareHeight,
        new Square(this.squareWidth / 2, this.squareHeight, padding)
      );
      if (j === params.countY - 1 && params.countY % 2) break;
      this.drawer.addOneRowOfShapes(
        0,
        (j + 1) * this.squareHeight,
        new Square(this.squareWidth, this.squareHeight, padding),
        params.countX
      );
    }
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
    let hs = new Square(this.squareWidth / 2, this.squareHeight, this.padding);
    hs.drawMeasures(ctx, 50.5, 40.5, params.countY, 40 * size);
    let hf = new Square(this.squareWidth, this.squareHeight, this.padding);
    hf.drawMeasures(
      ctx,
      parseInt(200 * size) + 0.5,
      40.5,
      params.countY * params.countX - params.countY / 2,
      80 * size
    );
  }

  reservePrimitives(width,height){
    return [
      {title:'مربع',name:'square',primitive:new Square(this.squareWidth / 2, this.squareHeight, this.padding)},
      {title:'مستطیل',name:'rectangle',primitive:new Square(this.squareWidth, this.squareHeight, this.padding)},
      //
      // new Square(width, height),
      // new Square(width/2, height),
    ]
  }
}
