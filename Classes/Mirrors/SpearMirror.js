import BaseMirror from "./BaseMirror.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";
import Spear from "../Primitives/Spear.js";
import Lozenge from "../Primitives/Lozenge.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";

export default class SpearMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);
    let upperSpearHeight = params.upperSpearHeight;
    this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
    this.spearHeight = height - 2 * upperSpearHeight;
    this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, upperSpearHeight, padding), params.countX);
    this.addGridOfLozenge(upperSpearHeight - this.lozengeHeight / 2, this.lozengeWidth, this.lozengeHeight, params.countX, 1, padding);
    this.drawer.addOneRowOfShapes(0, upperSpearHeight + this.lozengeHeight * 0.5, new Spear(this.spearWidth, this.spearHeight, padding), params.countX);
    this.addGridOfLozenge(this.spearHeight + upperSpearHeight - this.lozengeHeight / 2, this.lozengeWidth, this.lozengeHeight, params.countX, 1, padding);
    this.drawer.addOneRowOfShapes(
      0,
      this.height - upperSpearHeight + this.lozengeHeight / 2,
      new BottomSpear(this.lozengeWidth, upperSpearHeight, padding),
      params.countX
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
        name: "upperSpearHeight",
        required: false,
        label: "ارتفاع نیم نیزه های بالا و پایین",
        default: 50,
        min: 30,
        max: Math.min(100, (height - 160 - 75) / 2),
      },
    ];
  }

  drawMeasures(ctx, params, size = 0.8) {
    let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
    loz.drawMeasures(ctx, 50.5, 80.5, params.countX * 2 - 2, 80 * size);
    let hf = new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, this.padding);
    hf.drawMeasures(ctx, 50.5, parseInt(80 + 100 * size) + 0.5, 4, 80 * size);
    let spear = new Spear(this.spearWidth, this.spearHeight, this.padding);
    spear.drawMeasures(ctx, parseInt(50 + 210 * size) + 0.5, 50.5, params.countX, 55 * size);
    let uspear = new UpperSpear(this.lozengeWidth, params.upperSpearHeight, this.padding);
    uspear.drawMeasures(ctx, parseInt(50 + 40 * size) + 0.5, parseInt(80 + 220 * size) + 0.5, params.countX * 2, 55 * size);
  }

  reservePrimitives(width,height) {
    return [
      new Lozenge(width,height),
      new Spear(width/6,height),
      new UpperTriangle(width,height/2),
      new UpperSpear(width/3,height),
    ];
  }
}
