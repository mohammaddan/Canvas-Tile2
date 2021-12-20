import BaseMirror from "./BaseMirror.js";
import CutedLozenge from "../Primitives/CutedLozenge.js";

export default class JeweledMirror extends BaseMirror {
    constructor(ctx, width, height, countX, countY, padding = 0,squareWidth=5) {
        super(ctx, width, height);
        this.lozengeWidth = width / countX;
        this.lozengeHeight = height / countY;
        for(let i=0;i<countX;i++)
            this.drawer.addShape(new CutedLozenge(this.lozengeWidth,this.lozengeHeight,squareWidth,padding,1,true));
        for(let i=0;i<countX-1;i++)
            this.drawer.addShape(new CutedLozenge(this.lozengeWidth,this.lozengeHeight,squareWidth,padding,true));
    }

}
