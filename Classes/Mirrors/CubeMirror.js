import BottomTriangle from "../Primitives/BottomTriangle.js";
import CutedLozenge from "../Primitives/CutedLozenge.js";
import HalfCutedLozenge from "../Primitives/HalfCutedLozenge.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";
import RightTriangle from "../Primitives/RightTriangle.js";
import Square from "../Primitives/Square.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";

export default class CubeMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);
    this.squareWidth = width / (2 * params.countX + 1);
    this.squareHeight = height / (2 * params.countY + 1);
    for (let i = 0; i < params.countX + 1; i++)
      this.drawer.addOneShapeAt(i * 2 * this.squareWidth, 0, new UpperTriangle(this.squareWidth, this.squareHeight / 2, padding, 1));
    for (let i = 0; i < params.countX; i++)
      this.drawer.addOneShapeAt(
        this.squareWidth / 2 + i * 2 * this.squareWidth,
        this.squareHeight / 2,
        new CutedLozenge(this.squareWidth * 2, this.squareHeight, this.squareWidth, padding, 1, true)
      );
    this.drawer.addOneShapeAt(0, 0, new LeftTriangle(this.squareWidth / 2, this.squareHeight, padding, 1));
    this.drawer.addOneShapeAt(this.width - this.squareWidth / 2, 0, new RightTriangle(this.squareWidth / 2, this.squareHeight, padding, 1));
    for (let j = 0; j < params.countY + 1; j++) {
      for (let i = 0; i < params.countX + 1; i++) {
        if (j < params.countY) {
          this.drawer.addOneShapeAt(
            i * 2 * this.squareWidth,
            j * this.squareHeight * 2 + this.squareHeight,
            new CutedLozenge(this.squareWidth, this.squareHeight * 2, this.squareHeight, padding, 1, false)
          );
        }
        if (i === params.countX) continue;
        if (j < params.countY) {
          this.drawer.addOneShapeAt(
            i * 2 * this.squareWidth + this.squareWidth,
            j * this.squareHeight * 2 + this.squareHeight,
            new Square(this.squareWidth, this.squareHeight, padding, 1)
          );
        }
        this.drawer.addOneShapeAt(
          this.squareWidth / 2 + i * 2 * this.squareWidth,
          j * this.squareHeight * 2 + this.squareHeight / 2,
          new CutedLozenge(this.squareWidth * 2, this.squareHeight, this.squareWidth, padding, 1, true)
        );
      }
      this.drawer.addOneShapeAt(0, j * this.squareHeight * 2, new LeftTriangle(this.squareWidth / 2, this.squareHeight, padding, 1));
      this.drawer.addOneShapeAt(
        this.width - this.squareWidth / 2,
        j * this.squareHeight * 2,
        new RightTriangle(this.squareWidth / 2, this.squareHeight, padding, 1)
      );
    }
    for (let i = 0; i < params.countX + 1; i++)
      this.drawer.addOneShapeAt(
        i * 2 * this.squareWidth,
        this.height - this.squareHeight / 2,
        new BottomTriangle(this.squareWidth, this.squareHeight / 2, padding, 1)
      );
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

  drawMeasures(ctx, params, size = 0.9) {
    let jw = new CutedLozenge(this.squareWidth, this.squareHeight * 2, this.squareHeight, this.padding, 1, false);
    jw.drawMeasures(ctx, 60.5, 70.5, (params.countY + 1) * params.countX, 80 * size);
    let vc = new CutedLozenge(this.squareWidth * 2, this.squareHeight, this.squareWidth, this.padding, 1, true);
    vc.drawMeasures(ctx, 60.5, 70 + 250 * size + 0.5, (params.countX + 1) * params.countY, 140 * size);
    let ut = new UpperTriangle(this.squareWidth, this.squareHeight / 2, this.padding, 1);
    ut.drawMeasures(ctx, parseInt(100 + 130 * size) + 0.5, 50.5, (params.countX + 1) * 2, 80 * size);
    let lt = new LeftTriangle(this.squareWidth / 2, this.squareHeight, this.padding, 1);
    lt.drawMeasures(ctx, parseInt(100 + 130 * size) + 0.5, 50 + 100 * size + 0.5, (params.countY + 1) * 2, 60 * size);
    let sq = new Square(this.squareWidth, this.squareHeight, this.padding, 1);
    sq.drawMeasures(ctx, parseInt(100 + 170 * size) + 0.5, 50 + parseInt(290 * size) + 0.5, params.countX * params.countY, 60 * size);
  }
}
