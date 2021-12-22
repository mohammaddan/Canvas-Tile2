import BaseMirror from "./BaseMirror.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";

export default class MiddleFourSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, countX, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / countX;
        this.halfSpearHeight =( height-this.lozengeHeight)/2
        this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, this.halfSpearHeight , padding), countX);
        this.addGridOfLozenge(this.halfSpearHeight-this.lozengeHeight/2,this.lozengeWidth,this.lozengeHeight,countX,2,padding);
        this.drawer.addOneRowOfShapes(0, this.height-this.halfSpearHeight+ this.lozengeHeight/2, new BottomSpear(this.lozengeWidth, this.halfSpearHeight , padding), countX);
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
