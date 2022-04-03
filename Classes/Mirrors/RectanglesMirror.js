import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class RectanglesMirror extends BaseMirror {
  constructor(ctx, width, height, params, padding = 0) {
    super(ctx, width, height);

    this.squareWidth = params.squareWidth;
    let rects = [
      { w: 2, h: 2 },
      { w: 2, h: 1 },
      { w: 1, h: 1 },
      { w: 1, h: 2 },
      { w: 1, h: 2 },
      { w: 2, h: 2 },
    ];
    rects.forEach((r) => {
      this.drawer.addShape(new Square(this.squareWidth * r.w, this.squareWidth * r.h, padding));
    });
  }

  static parameters(width, height) {
    return [
      {
        name: "squareWidth",
        required: true,
        label: "عرض مربع",
        default: Math.round(width / 25),
        min: Math.ceil(width / 50),
        max: Math.floor(width / 10),
      },
    ];
  }

  drawMeasures(ctx, params, size = 1) {
    let hs = new Square(this.squareWidth, this.squareHeight, this.padding);
    hs.drawMeasures(ctx, 50.5, 40.5, params.countY * params.countX, 80 * size);
  }

  reservePrimitives(width,height) {
    return [
      {title:'مربع بزرگ',name:'squareL',primitive:new Square(this.squareWidth, this.squareWidth)},
      {title:'مربع کوچک',name:'squareS',primitive:new Square(this.squareWidth/2, this.squareWidth/2)},
      {title:'مستطیل افقی',name:'squareH',primitive:new Square(this.squareWidth, this.squareWidth/2)},
      {title:'مستطیل عمودی',name:'squareV',primitive:new Square(this.squareWidth/2, this.squareWidth)},
      //
      // new Square(width,height),
      // new Square(width,height/2),
      // new Square(width/2,height),
      // new Square(width/2,height/2),
    ];
  }
}
