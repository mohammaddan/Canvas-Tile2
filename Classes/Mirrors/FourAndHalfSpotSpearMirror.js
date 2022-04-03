import BaseMirror from "./BaseMirror.js";
import Spear from "../Primitives/Spear.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";
import Lozenge from "../Primitives/Lozenge.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";

export default class FourAndHalfSpotSpearMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);
    this.params = params;
    this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
    this.spearHeight = height - 2 * this.lozengeHeight - 2 * params.upperSpearHeight;
    this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, params.upperSpearHeight, padding), params.countX);
    this.addGridOfLozenge(params.upperSpearHeight - this.lozengeHeight / 2, this.lozengeWidth, this.lozengeHeight, params.countX, 2, padding);
    this.drawer.addOneRowOfShapes(0, params.upperSpearHeight + this.lozengeHeight * 1.5, new Spear(this.spearWidth, this.spearHeight, padding), params.countX);
    this.addGridOfLozenge(
      this.spearHeight + params.upperSpearHeight + this.lozengeHeight / 2,
      this.lozengeWidth,
      this.lozengeHeight,
      params.countX,
      2,
      padding
    );
    this.drawer.addOneRowOfShapes(
      0,
      this.height - params.upperSpearHeight + this.lozengeHeight / 2,
      new BottomSpear(this.lozengeWidth, params.upperSpearHeight, padding),
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
    loz.drawMeasures(ctx, 50.5, 80.5, (params.countX * 3 - 2) * 2, 80 * size);
    let hf = new UpperSpear(this.lozengeWidth, params.upperSpearHeight, this.padding, 1);
    hf.drawMeasures(ctx, 50.5, 180.5, params.countX * 2, 40 * size);
    let spear = new Spear(this.spearWidth, this.spearHeight, this.padding);
    spear.drawMeasures(ctx, Math.round(50 + 220 * size) + 0.5, 50.5, params.countX, 55 * size);
    let lloz = new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight, this.padding);
    lloz.drawMeasures(ctx, Math.round(50 + 120 * size) + 0.5, 200.5, 8, 45 * size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'لوزی',name:'lozenge',primitive:new Lozenge(this.lozengeWidth, this.lozengeHeight)},
      {title:'نیزه حاشیه بالا و پایین',name:'upperSpear',primitive:new UpperSpear(this.lozengeWidth, this.upperSpearHeight, this.padding, 1)},
      {title:'نیزه',name:'spear',primitive:new Spear(this.spearWidth, this.spearHeight, this.padding)},
      {title:'لچک راست و چپ',name:'leftTriangle',primitive:new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight, this.padding)},

      // new Lozenge(width, height),
      // new UpperSpear(width/2, height),
      // new Spear(width/4, height),
      // new LeftTriangle(width/2, height),
    ];
  }
}
