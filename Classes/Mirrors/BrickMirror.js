import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

/**
 * params is object that has countX,countY
 */
export default class BrickMirror extends BaseMirror {

    /**
     *
     * @param ctx
     * @param width
     * @param height
     * @param {{countX:int,countY:int}} params
     * @param padding
     */
    constructor(ctx, width, height,params, padding = 0) {
        super(ctx, width, height);

        this.squareWidth = width / params.countX;
        this.squareHeight = height / params.countY;
        for(let j=0;j<params.countY;j+=2){

            this.drawer.addOneShapeAt(0,j*this.squareHeight, new Square(this.squareWidth/2,this.squareHeight,padding))
            this.drawer.addOneRowOfShapes(this.squareWidth/2,j*this.squareHeight,new Square(this.squareWidth,this.squareHeight,padding),params.countX-1)
            this.drawer.addOneShapeAt(width-this.squareWidth/2,j*this.squareHeight, new Square(this.squareWidth/2,this.squareHeight,padding))
            if(j===params.countY-1 && params.countY%2) break;
            this.drawer.addOneRowOfShapes(0,(j+1)*this.squareHeight,new Square(this.squareWidth,this.squareHeight,padding),params.countX)
        }
    }

}
