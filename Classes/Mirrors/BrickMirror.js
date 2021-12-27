import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class BrickMirror extends BaseMirror {
    constructor(ctx, width, height, countX, countY, padding = 0) {
        super(ctx, width, height);

        this.squareWidth = width / countX;
        this.squareHeight = height / countY;
        for(let j=0;j<countY;j+=2){

            this.drawer.addOneShapeAt(0,j*this.squareHeight, new Square(this.squareWidth/2,this.squareHeight,padding))
            this.drawer.addOneRowOfShapes(this.squareWidth/2,j*this.squareHeight,new Square(this.squareWidth,this.squareHeight,padding),countX-1)
            this.drawer.addOneShapeAt(width-this.squareWidth/2,j*this.squareHeight, new Square(this.squareWidth/2,this.squareHeight,padding))
            if(j===countY-1 && countY%2) break;
            this.drawer.addOneRowOfShapes(0,(j+1)*this.squareHeight,new Square(this.squareWidth,this.squareHeight,padding),countX)
        }
    }

}
