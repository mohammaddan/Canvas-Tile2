import BottomTriangle from "../Primitives/BottomTriangle.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";
import Spear from "../Primitives/Spear.js";

export default class FourSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, countX, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / countX;
        this.spearHeight= height - 3 * this.lozengeHeight;
        this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), countX);
        this.addGridOfLozenge(0,this.lozengeWidth,this.lozengeHeight,countX,2,padding);
        this.drawer.addOneRowOfShapes(0, 2* this.lozengeHeight , new Spear(this.spearWidth, this.spearHeight, padding), countX);
        this.addGridOfLozenge(this.spearHeight+this.lozengeHeight,this.lozengeWidth,this.lozengeHeight,countX,2,padding);
        this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new BottomTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), countX);
    }

    parameters(){
        return [
            {value:'countX',label:'تعداد تکرار در عرض'},
        ]
    }

    limits(){
        return {
            countX: []
        }
    }

}
