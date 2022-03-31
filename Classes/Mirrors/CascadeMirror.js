import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

/**
 * params is object that has countX,countY
 */
export default class CascadeMirror extends BaseMirror {
    /**
     *
     * @param ctx
     * @param width
     * @param height
     * @param {{squareWidth,countY}} params
     * @param padding
     */
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);
        this.squareHeight=height/params.countY
        this.countX=Math.round(width/params.squareWidth);
        this.squareWidth=width/this.countX;
        this.padding = padding;
        let startSquare=[0.2,0.5,0.3,0.8,0.1,0.4,0.9,0.6,0.7,0.15,0.25,0.45,0.85,0.6,0.35,0.25,0.55];
        for(let j=0;j<this.countX;j++){
            let height=startSquare[j%17]*this.squareHeight;
            let st=0;
            for(let i=0;i<params.countY+1;i++){
                this.drawer.addOneShapeAt(j*this.squareWidth,st,new Square(this.squareWidth,height,padding,1))
                st+=height;
                if(i===params.countY-1) height= this.squareHeight*(1-startSquare[j%17]);
                else height=this.squareHeight;
            }
        }
    }

    static parameters(width, height) {
        return [
            {
                name: "squareWidth",
                required: true,
                label: "عرض هر قطعه",
                default: 2,
                min: 2,
                max: 5,
            },
            {
                name: "countY",
                required: false,
                label: "تعداد تکرار در ارتفاع",
                default: Math.round(height/100),
                min: Math.ceil(height / 120),
                max: Math.floor(height / 25),
            },
        ];
    }

    drawMeasures(ctx, params, size =1) {
        let sq = new Square(this.squareWidth,this.squareHeight);
        sq.drawMeasures(ctx, 50.5, 50.5, this.countX * params.countY, 7 * size);
    }

    reservePrimitives(width,height){
        return [
            new Square(width/20, height),
        ]
    }

}
