import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class RectanglesMirror extends BaseMirror {
    /**
     *
     * @param ctx
     * @param width
     * @param height
     * @param {{squareWidth,squareHeight}} params
     * @param padding
     */
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        let countX=Math.round(width/params.squareWidth)
        let countY=Math.round(height/params.squareHeight)
        this.squareWidth = width/countX;
        this.squareHeight = height/countY;

        let randNums = [0,7,3,0,6,2,3,1,3,7,4,4,2,1,5,7,7,5,2,0,0,2,1,1,7,5,0,7,1,2,0,7,4,7,6,7,2,
            5,2,4,3,1,7,4,4,4,6,0,7,1,5,1,7,1,5,7,0,3,6,6,3,7,5,4,1,2,7,1,1,6,2,1,4,3,1,3,6,2,1,3,5,
            3,1,4,0,0,1,1,5,3,7,1,1,4,0,7,5,6,3,7,2,0,7,0,5,7,7,0,6,7,3,2,2,4,1,3,1,0,5,4,4,0,6,3,6,
            1,2,6,4,0,4,3,6,6,5,6,3,0,0,1,3,2,3,7,5,0,6,1,0,4,2,1,5,7,
        ];
        let rects=[
            {w:1,h:1},
            {w:1,h:1},
            {w:1,h:2},
            {w:1,h:2},
            {w:2,h:1},
            {w:2,h:1},
            {w:2,h:2},
        ]
        this.nums=[0,0,0,0,0,0,0,0]
        let sz=randNums.length
        let area=countX*countY
        let r={w:1,h:1}
        for (let i = 0; i < 10000; i++) {
            r=rects[randNums[i%sz]%7]
            if(!this.drawer.addRect(new Square(this.squareWidth * r.w, this.squareHeight * r.h, padding))) continue;
            this.nums[randNums[i%sz]%7]++;
            area -= r.w*r.h
            // console.log(area)
            if(area<=0) break;
        }
        // console.log(width,height,this.squareWidth,this.squareHeight,countX,countY,area)


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
            {
                name: "squareHeight",
                required: true,
                label: "ارتفاع مربع",
                default: Math.round(width / 25),
                min: Math.ceil(width / 50),
                max: Math.floor(width / 10),
            },
        ];
    }

    drawMeasures(ctx, params, size = 1) {
        let ss = new Square(this.squareWidth, this.squareHeight, this.padding);
        ss.drawMeasures(ctx, 50.5, 40.5, this.nums[0], 60 * size);
        let hs = new Square(this.squareWidth*2, this.squareHeight, this.padding);
        hs.drawMeasures(ctx, 50.5, 140.5, this.nums[4], 160 * size);
        let vs = new Square(this.squareWidth, this.squareHeight*2, this.padding);
        vs.drawMeasures(ctx, 240.5, 40.5, this.nums[2], 80 * size);
        let ls = new Square(this.squareWidth*2, this.squareHeight*2, this.padding);
        ls.drawMeasures(ctx, 50.5, 250.5, this.nums[6], 160 * size);
    }

    reservePrimitives(width, height) {
        return [
            {title: 'مربع بزرگ', name: 'squareL', primitive: new Square(this.squareWidth*2, this.squareHeight*2)},
            {title: 'مربع کوچک', name: 'squareS', primitive: new Square(this.squareWidth , this.squareHeight)},
            {title: 'مستطیل افقی', name: 'squareH', primitive: new Square(this.squareWidth*2, this.squareHeight)},
            {title: 'مستطیل عمودی', name: 'squareV', primitive: new Square(this.squareWidth , this.squareHeight*2)},
            //
            // new Square(width,height),
            // new Square(width,height/2),
            // new Square(width/2,height),
            // new Square(width/2,height/2),
        ];
    }
}
