import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class ShatterMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.squareWidth = width / (params.countX * 3);
        this.squareHeight = height / (params.countY * 3);
        for (let j = 0; j < params.countY; j++) {
            let y=j*3*this.squareHeight;
            for (let i = 0; i < params.countX; i++) {
                let x=i*3*this.squareWidth;
                this.drawer.addOneShapeAt(x,y, new Square(this.squareWidth*2, this.squareHeight, padding));
                this.drawer.addOneShapeAt(x+this.squareWidth*2,y, new Square(this.squareWidth, this.squareHeight*2, padding));
                this.drawer.addOneShapeAt(x,y+this.squareHeight, new Square(this.squareWidth, this.squareHeight*2, padding));
                this.drawer.addOneShapeAt(x+this.squareWidth,y+this.squareHeight, new Square(this.squareWidth, this.squareHeight, padding));
                this.drawer.addOneShapeAt(x+this.squareWidth,y+this.squareHeight*2, new Square(this.squareWidth*2, this.squareHeight, padding));
            }
        }
    }

    static parameters(width, height) {
        return [
            {
                name: "countX",
                required: true,
                label: "تعداد تکرار در عرض",
                default: Math.round(width / 75),
                min: Math.ceil(width / 150),
                max: Math.floor(width / 30),
            },
            {
                name: "countY",
                required: true,
                label: "تعداد تکرار در ارتفاع",
                default: Math.round(width / 75),
                min: Math.ceil(width / 150),
                max: Math.floor(width / 30),
            },
        ];
    }

    drawMeasures(ctx, params, size = 1) {
        let s = new Square(this.squareWidth, this.squareHeight, this.padding);
        s.drawMeasures(ctx, 50.5, 40.5, params.countY * params.countX, 80 * size);
        let hs = new Square(this.squareWidth*2, this.squareHeight, this.padding);
        hs.drawMeasures(ctx, 50.5, 180.5, params.countY * params.countX, 80 * size);
        let vs = new Square(this.squareWidth, this.squareHeight*2, this.padding);
        vs.drawMeasures(ctx, 200.5, 40.5, params.countY * params.countX, 80 * size);
    }


    reservePrimitives(width,height) {
        return [
            {title:'مربع کوچک',name:'squareS',primitive:new Square(this.squareWidth*2, this.squareHeight)},
            {title:'مستطیل افقی',name:'squareH',primitive:new Square(this.squareWidth, this.squareHeight*2)},
            {title:'مستطیل عمودی',name:'squareV',primitive:new Square(this.squareWidth, this.squareHeight)},
            // new Square(width,height),
            // new Square(width,height/2),
            // new Square(width/2,height),
            // new Square(width/2,height/2),
        ];
    }
}
