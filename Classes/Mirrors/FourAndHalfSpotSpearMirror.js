import BaseMirror from "./BaseMirror.js";
import Spear from "../Primitives/Spear.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";

export default class FourAndHalfSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.spearHeight= height - 2 * this.lozengeHeight - 2* params.upperSpearHeight;
        this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, params.upperSpearHeight , padding), params.countX);
        this.addGridOfLozenge(params.upperSpearHeight-this.lozengeHeight/2,this.lozengeWidth,this.lozengeHeight,params.countX,2,padding);
        this.drawer.addOneRowOfShapes(0, params.upperSpearHeight+this.lozengeHeight*1.5 , new Spear(this.spearWidth, this.spearHeight, padding), params.countX);
        this.addGridOfLozenge(this.spearHeight+params.upperSpearHeight+this.lozengeHeight/2,this.lozengeWidth,this.lozengeHeight,params.countX,2,padding);
        this.drawer.addOneRowOfShapes(0, this.height-params.upperSpearHeight+ this.lozengeHeight/2, new BottomSpear(this.lozengeWidth, params.upperSpearHeight , padding), params.countX);
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
