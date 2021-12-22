import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class SquareMirror extends BaseMirror {
    constructor(ctx, width, height, countX, countY, padding = 0) {
        super(ctx, width, height);

        this.squareWidth = width / countX;
        this.squareHeight = height / countY;
        for(let i=0;i<countX*countY;i++)
            this.drawer.addShape(new Square(this.squareWidth,this.squareHeight,padding))
    }

}
