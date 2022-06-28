import BottomTriangle from "../Primitives/BottomTriangle.js";
import Diamond from "../Primitives/Diamond.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";
import HalfDiamond from "../Primitives/HalfDiamond.js";

/**
 * params is object that has countX and countY
 */
export default class DiamondMirror extends BaseMirror {
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
    this.checkLimits(params);
    this.diamondWidth = width / params.countX;
    this.diamondHeight = height / params.countY;
    this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.diamondWidth, this.diamondHeight / 3, padding), params.countX);
    for(let i=0;i<params.countY;i++){
      this.drawer.addOneShapeAt(0,i*this.diamondHeight,new HalfDiamond(this.diamondWidth/2,this.diamondHeight,padding))
      this.drawer.addOneShapeAt(this.width-this.diamondWidth/2,i*this.diamondHeight,new HalfDiamond(this.diamondWidth/2,this.diamondHeight,padding,1,false))
      if(i<params.countY-1)
        this.drawer.addOneRowOfShapes(0, (i+1)*this.diamondHeight , new Diamond(this.diamondWidth, this.diamondHeight, padding,1,false), params.countX);
      this.drawer.addOneRowOfShapes(this.diamondWidth/2, (i+1/3)*this.diamondHeight , new Diamond(this.diamondWidth, this.diamondHeight, padding,1,true), params.countX-1);
    }
    this.drawer.addOneRowOfShapes(0, this.height-2*this.diamondHeight/3, new BottomTriangle(this.diamondWidth, 2*this.diamondHeight / 3, padding), params.countX);
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

  checkLimits(params,increase_count=false){
    let diamondWidth = this.width / params.countX;
    let diamondHeight = this.height / params.countY;
    let cx=params.countX,cy=params.countY
    while(diamondWidth>diamondHeight-10 && params.countY>2){
      if(!increase_count)
        params.countY--;
      else
        params.countX++;
      diamondWidth = this.width / params.countX;
      diamondHeight = this.height / params.countY;
    }
    if(cx>params.countX) return {countX: params.countX,msg:'به علت محدودیت های اجرایی تعداد تکرار در عرض کاهش یافت'};
    if(cx<params.countX) return {countX: params.countX,msg:'به علت محدودیت های اجرایی تعداد تکرار در عرض افزایش یافت'};
    if(cy>params.countY) return {countY: params.countY,msg:'به علت محدودیت های اجرایی تعداد تکرار در ارتفاع کاهش یافت'};
    if(cy<params.countY) return {countY: params.countY,msg:'به علت محدودیت های اجرایی تعداد تکرار در ارتفاع افزایش یافت'};
    return {};
  }

  drawMeasures(ctx, params, size = 1) {
    let d =  new Diamond(this.diamondWidth, this.diamondHeight, this.padding,1,false)
    d.drawMeasures(ctx, 70.5, 100.5, (params.countX - 1) * params.countY + params.countX * (params.countY - 1), 70*size);
    let ul =new UpperTriangle(this.diamondWidth, this.diamondHeight / 3, this.padding)
    ul.drawMeasures(ctx, 200.5, 60.5, params.countX , 90*size);
    let bl =new BottomTriangle(this.diamondWidth, 2*this.diamondHeight / 3, this.padding)
    bl.drawMeasures(ctx, 70.5, 200.5, params.countX , 70*size);
    let hd =new HalfDiamond(this.diamondWidth/2,this.diamondHeight,this.padding);
    hd.drawMeasures(ctx, 200.5, 160.5, params.countY * 2, 70*size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'الماس',name:'diamond',primitive:new Diamond(this.diamondWidth, this.diamondHeight, this.padding,1,false)},
      {title:'الماس حاشیه بالا',name:'upperTriangle',primitive:new UpperTriangle(this.diamondWidth, this.diamondHeight / 3, this.padding)},
      {title:'الماس حاشیه پایین',name:'bottomTriangle',primitive:new BottomTriangle(this.diamondWidth, 2*this.diamondHeight / 3, this.padding)},
      {title:'الماس حاشیه راست و چپ',name:'diamond',primitive:new HalfDiamond(this.diamondWidth/2,this.diamondHeight,this.padding)},
    ];
  }
}
