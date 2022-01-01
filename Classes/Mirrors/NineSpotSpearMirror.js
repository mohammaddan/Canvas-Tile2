import BaseMirror from "./BaseMirror.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";

export default class NineSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.halfSpearHeight =( height-2*this.lozengeHeight)/2
        this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, this.halfSpearHeight , padding), params.countX);
        this.addGridOfLozenge(this.halfSpearHeight-this.lozengeHeight*0.5,this.lozengeWidth,this.lozengeHeight,params.countX,3,padding);
        this.drawer.addOneRowOfShapes(0, this.height-this.halfSpearHeight + this.lozengeHeight*0.5, new BottomSpear(this.lozengeWidth, this.halfSpearHeight , padding), params.countX);
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
