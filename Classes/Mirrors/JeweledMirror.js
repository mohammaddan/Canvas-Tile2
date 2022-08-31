import BaseMirror from "./BaseMirror.js";
import CutedLozenge from "../Primitives/CutedLozenge.js";
import HalfCutedLozenge from "../Primitives/HalfCutedLozenge.js";
import Square from "../Primitives/Square.js";
import IrregularHexagon from "../Primitives/IrregularHexagon.js";

export default class JeweledMirror extends BaseMirror {
  /**
   *
   * @param ctx
   * @param width
   * @param height
   * @param {{countX,countY,squareWidth}} params
   * @param padding
   * @param scale
   */
  constructor(ctx, width, height, params, padding = 0,scale=1) {
    super(ctx, width, height,0,scale);
    if (!params.squareWidth) params.squareWidth = 7;
    let squareWidth=this.squarWidth = params.squareWidth;
    let tx= (width-params.countX*squareWidth) / (params.countX+1),
        ty=(height-params.countY*squareWidth)/(params.countY+1);
    console.log(params.countX,squareWidth)
    this.lozengeWidth = tx;//-squareWidth;
    this.lozengeHeight = ty;//-squareWidth;
    for(let x=0;x<width;x+=this.lozengeWidth+squareWidth)
      this.drawer.addOneShapeAt(x,0,new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight/2-squareWidth/2, squareWidth, padding, 1, "top"))

    for (let y = this.lozengeHeight/2-squareWidth/2; y < this.height; y += this.lozengeHeight+squareWidth) {
      let x = (this.lozengeWidth ) / 2;
      this.drawer.addOneShapeAt(0, y - this.lozengeHeight / 2+squareWidth/2,
          new HalfCutedLozenge(this.lozengeWidth/2 - squareWidth/2, this.lozengeHeight , squareWidth, padding, 1, "left"));
      for (let i = 0; i <= params.countX ; i++) {
        if(i<params.countX){
          this.drawer.addOneShapeAt(x +squareWidth/2, y+squareWidth/2,
              new IrregularHexagon(this.lozengeWidth, this.lozengeHeight , squareWidth, padding, 1));
        }
        if(y<height-this.lozengeHeight){
          this.drawer.addOneShapeAt(x-this.lozengeWidth/2 , y+this.lozengeHeight/2+squareWidth,
              new IrregularHexagon(this.lozengeWidth, this.lozengeHeight , squareWidth, padding, 1));
          if(i>0)
            this.drawer.addOneShapeAt(x-squareWidth-this.lozengeWidth/2, y+this.lozengeHeight/2+squareWidth/2,
                new Square(squareWidth, squareWidth, padding));
        }
        this.drawer.addOneShapeAt(x-squareWidth/2, y, new Square(squareWidth, squareWidth, padding));
        x += this.lozengeWidth+squareWidth;
      }
      this.drawer.addOneShapeAt(width - this.lozengeWidth/2 + squareWidth/2, y - this.lozengeHeight / 2+squareWidth/2,
          new HalfCutedLozenge(this.lozengeWidth/2 - squareWidth/2, this.lozengeHeight, squareWidth, padding, 1, "right"));
    }
    for(let x=0;x<width;x+=this.lozengeWidth+squareWidth)
      this.drawer.addOneShapeAt(x,height-this.lozengeHeight/2+squareWidth/2,
          new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight/2-squareWidth/2, squareWidth, padding, 1, "bottom"))

  }

  static parameters(width, height) {
    return [
      {
        name: "countX",
        required: true,
        label: "تعداد تکرار در عرض",
        default: Math.round(width / 50),
        min: Math.ceil(width / 50),
        max: Math.floor(width / 15),
      },
      {
        name: "countY",
        required: true,
        label: "تعداد تکرار در ارتفاع",
        default: Math.round(width / 50),
        min: Math.ceil(width / 50),
        max: Math.floor(width / 15),
      },
      {
        name: "squareWidth",
        required: false,
        label: "ضلع نگین",
        default: 7,
        min: 7,
        max: 10,
      },
    ];
  }

  drawMeasures(ctx, params, size = 1) {
    let jw = new IrregularHexagon(this.lozengeWidth, this.lozengeHeight, params.squareWidth, this.padding, 1);
    jw.drawMeasures(ctx, 60.5, 100.5, params.countX * (params.countY+1)+(params.countX+1)*params.countY, 80 * size);
    let sq = new Square(params.squareWidth, params.squareWidth, this.padding);
    sq.drawMeasures(ctx, 60 + 160 * size + 0.5, 60.5, (params.countX+1) * (params.countY+1)+params.countX*params.countY, 50 * size);
    let hcl = new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight / 2, params.squareWidth, this.padding, 1, "bottom");
    hcl.drawMeasures(ctx, 60 + 120 * size + 0.5, Math.round(50 + 130 * size) + 0.5, params.countX * 2+params.countY*2+4, 80 * size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'مربع',name:'square',primitive:new Square(this.squareWidth, this.squareWidth, this.padding)},
      {title:'شش ضعلی',name:'irregularHexagon',primitive: new IrregularHexagon(this.lozengeWidth, this.lozengeHeight, this.squareWidth, this.padding, 1)},
      {title:'نیزه حاشیه راست و چپ',name:'halfCutedLozengeH',primitive:new HalfCutedLozenge(this.lozengeWidth/2-this.squarWidth/2, this.lozengeHeight, this.squareWidth, this.padding, 1, "left")},
      {title:'نیزه حاشیه بالا و پایین',name:'halfCutedLozengeV',primitive:new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight / 2-this.squarWidth/2, this.squareWidth, this.padding, 1, "top")},

      // new CutedLozenge(width/1.5,height,height/4,0,1,false),
      // new Square(width,height),
      // new HalfCutedLozenge(width,height/2,width/4),
    ];
  }
}
