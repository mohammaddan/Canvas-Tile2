import BottomTriangle from "../Primitives/BottomTriangle.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";
import Spear from "../Primitives/Spear.js";
import Lozenge from "../Primitives/Lozenge.js";
import Blade from "../Primitives/Blade.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";

export default class TwoSpotSpearMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);

    this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
    this.spearHeight = height - this.lozengeHeight * 2;
    this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
    this.addGridOfLozenge(0, this.lozengeWidth, this.lozengeHeight, params.countX, 1, padding);
    this.drawer.addOneRowOfShapes(0, this.lozengeHeight, new Lozenge(this.lozengeWidth, this.lozengeHeight, padding), params.countX);
    this.drawer.addOneShapeAt(0, this.lozengeHeight, new Blade(this.spearWidth / 2, this.spearHeight, padding, 1, "left"));
    this.drawer.addOneRowOfShapes(this.lozengeWidth / 2, this.lozengeHeight * 1.5, new Spear(this.spearWidth, this.spearHeight, padding), params.countX - 1);
    this.drawer.addOneShapeAt(width - this.spearWidth / 2, this.lozengeHeight * 1.5, new Blade(this.spearWidth / 2, this.spearHeight, padding, 1, "right"));
    this.drawer.addOneRowOfShapes(0, this.lozengeHeight + this.spearHeight, new Lozenge(this.lozengeWidth, this.lozengeHeight, padding), params.countX);
    this.addGridOfLozenge(this.spearHeight + this.lozengeHeight, this.lozengeWidth, this.lozengeHeight, params.countX, 1, padding);
    this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new BottomTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
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
    ];
  }

  drawMeasures(ctx, params, size = 0.8) {
    let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
    loz.drawMeasures(ctx,Math.round(50 + 90 + size) + 0.5, 80.5, (params.countX * 2 - 1) * 2, 80 * size);
    let hf = new LeftTriangle(this.lozengeWidth/2, this.lozengeHeight, this.padding);
    hf.drawMeasures(ctx, Math.round(50 + 120 * size) + 0.5,Math.round(80 + 140 * size) + 0.5, params.countX * 2 + 4, 80 * size);
    let spear = new Spear(this.spearWidth, this.spearHeight, this.padding);
    spear.drawMeasures(ctx, 50.5, 50.5, params.countX - 1, 50 * size);
    let blade = new Blade(this.spearWidth / 2, this.spearHeight, this.padding, 1, "left");
    blade.drawMeasures(ctx,Math.round(50 + 250 * size) + 0.5, 30.5, 2, 25 * size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'لوزی',name:'lozenge',primitive:new Lozenge(this.lozengeWidth, this.lozengeHeight)},
      {title:'لچک راست و چپ',name:'leftTriangle',primitive:new LeftTriangle(this.lozengeWidth/2, this.lozengeHeight)},
      {title:'لچک بالا و پایین',name:'upperTriangle',primitive:new UpperTriangle(this.lozengeWidth / 2, this.lozengeHeight, this.padding)},
      {title:'نیزه',name:'spear',primitive:new Spear(this.spearWidth, this.spearHeight, this.padding)},
      {title:'شمشیری',name:'blade',primitive:new Blade(this.spearWidth / 2, this.spearHeight, this.padding, 1, "left")},

      // new Lozenge(width,height),
      // new UpperTriangle(width,height/2),
      // new Spear(width/6,height),
      // new Blade(width/6,height),
    ];
  }
}
