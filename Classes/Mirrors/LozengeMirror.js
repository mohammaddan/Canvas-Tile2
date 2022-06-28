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
   * @param increase_count
   */
  constructor(ctx, width, height, params, padding = 0,increase_count=false) {
    super(ctx, width, height);
    this.checkLimits(params,increase_count);
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
        default:10,// Math.round(width / 33),
        min: Math.ceil(width / 40),
        max: Math.floor(width / 10),
      },
      {
        name: "countY",
        required: true,
        label: "تعداد تکرار در ارتفاع",
        default:5,// Math.round(height / 33),
        min: Math.ceil(height / 40),
        max: Math.floor(height / 10),
      },
    ];
  }

  checkLimits(params,increase_count=false){
    let lozengeWidth = this.width / params.countX;
    let lozengeHeight = this.height / params.countY;
    let cx=params.countX,cy=params.countY
    while(lozengeWidth<lozengeHeight*0.8 && params.countX>2){
      if(!increase_count)
        params.countX--;
      else
        params.countY++;
      lozengeWidth = this.width / params.countX;
      lozengeHeight = this.height / params.countY;
    }
    while(lozengeHeight<lozengeWidth*0.8 && params.countY>2){
      if(!increase_count)
        params.countY--;
      else
        params.countX++;
      lozengeWidth = this.width / params.countX;
      lozengeHeight = this.height / params.countY;
    }
    if(cx>params.countX) return {countX: params.countX,msg:'به علت محدودیت های اجرایی تعداد تکرار در عرض کاهش یافت'};
    if(cx<params.countX) return {countX: params.countX,msg:'به علت محدودیت های اجرایی تعداد تکرار در عرض افزایش یافت'};
    if(cy>params.countY) return {countY: params.countY,msg:'به علت محدودیت های اجرایی تعداد تکرار در ارتفاع کاهش یافت'};
    if(cy<params.countY) return {countY: params.countY,msg:'به علت محدودیت های اجرایی تعداد تکرار در ارتفاع افزایش یافت'};
    return {};
  }

  drawMeasures(ctx, params, size = 1) {
    let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
    loz.drawMeasures(ctx, 50.5, 80.5, (params.countX - 1) * params.countY + params.countX * (params.countY - 1), 70*size);
    let uLoz = new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, this.padding);
    uLoz.drawMeasures(ctx, 200.5, 60.5, params.countX * 2, 70*size);
    let lLoz = new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight, this.padding);
    lLoz.drawMeasures(ctx, 150.5, 160.5, params.countY * 2, 45*size);
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
