import BottomTriangle from "../Primitives/BottomTriangle.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";
import Lozenge from "../Primitives/Lozenge.js";
import RightTriangle from "../Primitives/RightTriangle.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";

/**
 * params is object that has countX and countY
 */
export default class LozengeMirror extends BaseMirror {
  /**
   * params has countX and countY
   * @param ctx
   * @param width
   * @param height
   * @param {{countX,countY}} params
   * @param padding
   */
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);

    this.lozengeWidth = width / params.countX;
    this.lozengeHeight = height / params.countY;
    this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
    this.addGridOfLozenge(0, this.lozengeWidth, this.lozengeHeight, params.countX, params.countY, padding);
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
    let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
    loz.drawMeasures(ctx, 50.5, 80.5, (params.countX - 1) * params.countY + params.countX * (params.countY - 1), 70);
    let uloz = new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, this.padding);
    uloz.drawMeasures(ctx, 200.5, 60.5, params.countX * 2, 70);
    let lloz = new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight, this.padding);
    lloz.drawMeasures(ctx, 150.5, 160.5, params.countY * 2, 45);
  }

  reservePrimitives(width,height) {
    return [
      {title:'لوزی',name:'lozenge',primitive:new Lozenge(this.lozengeWidth, this.lozengeHeight)},
      {title:'لچک بالا و پایین',name:'upperSpear',primitive:new UpperTriangle(this.lozengeWidth, this.lozengeHeight/2)},
      {title:'لچک راست و چپ',name:'leftTriangle',primitive:new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight, this.padding)},
      //
      // new Lozenge(width,height),
      //   new UpperTriangle(width,height/2),
      //   new LeftTriangle(width/2,height),
    ];
  }
}
