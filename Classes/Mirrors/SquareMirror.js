import BaseMirror from "./BaseMirror.js";
import Square from "../Primitives/Square.js";

export default class SquareMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.squareWidth = width / params.countX;
        this.squareHeight = height / params.countY;
        for(let i=0;i<params.countX*params.countY;i++)
            this.drawer.addShape(new Square(this.squareWidth,this.squareHeight,padding))
    }

}
