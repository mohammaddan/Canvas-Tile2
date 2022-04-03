import BaseMirror from "./BaseMirror.js";
import CutedLozenge from "../Primitives/CutedLozenge.js";
import HalfCutedLozenge from "../Primitives/HalfCutedLozenge.js";
import Square from "../Primitives/Square.js";

export default class JeweledMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);
    this.lozengeWidth = width / params.countX;
    if (!params.squareWidth) params.squareWidth = 5;
    let squareWidth = params.squareWidth;
    this.lozengeHeight = height / params.countY - squareWidth;
    this.drawer.addOneRowOfShapes(0, 0, new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight / 2, squareWidth, padding, 1, "top"), params.countX);
    for (let y = this.lozengeHeight / 2; y < this.height; y += this.lozengeHeight + squareWidth) {
      let x = (this.lozengeWidth - squareWidth) / 2;
      this.drawer.addOneShapeAt(0, y - this.lozengeHeight / 2, new HalfCutedLozenge((this.lozengeWidth - squareWidth) / 2, this.lozengeHeight + squareWidth, squareWidth, padding, 1, "left"));
      for (let i = 0; i < params.countX - 1; i++) {
        this.drawer.addOneShapeAt(x, y, new Square(squareWidth, squareWidth, padding));
        this.drawer.addOneShapeAt(x + squareWidth, y, new CutedLozenge(this.lozengeWidth - squareWidth, this.lozengeHeight + squareWidth, squareWidth, padding, 1, false));
        x += this.lozengeWidth;
      }
      this.drawer.addOneShapeAt(x, y, new Square(squareWidth, squareWidth, padding));
      this.drawer.addOneShapeAt(width - (this.lozengeWidth - squareWidth) / 2, y - this.lozengeHeight / 2, new HalfCutedLozenge((this.lozengeWidth - squareWidth) / 2, this.lozengeHeight + squareWidth, squareWidth, padding, 1, "right"));

      if (y < this.height - this.lozengeHeight)
        this.drawer.addOneRowOfShapes(0, y + this.lozengeHeight / 2 + squareWidth, new CutedLozenge(this.lozengeWidth, this.lozengeHeight, squareWidth, padding, 1, true), params.countX);
    }
    this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight / 2, squareWidth, padding, 1, "bottom"), params.countX);

    // for(let i=0;i<params.countX;i++)
    //     this.drawer.addShape(new CutedLozenge(this.lozengeWidth,this.lozengeHeight,squareWidth,padding,1,true));
    // for(let i=0;i<params.countX-1;i++)
    //     this.drawer.addShape(new CutedLozenge(this.lozengeWidth,this.lozengeHeight,squareWidth,padding,true));
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
      {
        name: "squareWidth",
        required: false,
        label: "ضلع نگین",
        default: 5,
        min: 5,
        max: 10,
      },
    ];
  }

  drawMeasures(ctx, params, size = 1) {
    let jw = new CutedLozenge(this.lozengeWidth - params.squareWidth, this.lozengeHeight + params.squareWidth, params.squareWidth, this.padding, 1, false);
    jw.drawMeasures(ctx, 60.5, 100.5, params.countX * 2, 80 * size);
    let sq = new Square(params.squareWidth, params.squareWidth, this.padding);
    sq.drawMeasures(ctx, 60 + 180 * size + 0.5, 60.5, params.countX * 2, 50 * size);
    let hcl = new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight / 2, params.squareWidth, this.padding, 1, "top");
    hcl.drawMeasures(ctx, 60.5, Math.round(100 + 130 * size) + 0.5, params.countX * 4, 60 * size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'نیزه عمودی',name:'cutedLozengeV',primitive: new CutedLozenge(this.lozengeWidth - this.squareWidth, this.lozengeHeight + this.squareWidth, this.squareWidth, this.padding, 1, false)},
      // {title:'نیزه افقی',name:'cutedLozengeH',primitive: new CutedLozenge(this.lozengeWidth, this.lozengeHeight, this.squareWidth, this.padding, 1, true)},
      {title:'مربع',name:'square',primitive:new Square(this.squareWidth, this.squareWidth, this.padding)},
      {title:'نیزه حاشیه راست و چپ',name:'halfCutedLozengeH',primitive:new HalfCutedLozenge((this.lozengeWidth - this.squareWidth) / 2, this.lozengeHeight + this.squareWidth, this.squareWidth, this.padding, 1, "left")},
      {title:'نیزه حاشیه بالا و پایین',name:'halfCutedLozengeV',primitive:new HalfCutedLozenge(this.lozengeWidth, this.lozengeHeight / 2, this.squareWidth, this.padding, 1, "top")},

      // new CutedLozenge(width/1.5,height,height/4,0,1,false),
      // new Square(width,height),
      // new HalfCutedLozenge(width,height/2,width/4),
    ];
  }
}
