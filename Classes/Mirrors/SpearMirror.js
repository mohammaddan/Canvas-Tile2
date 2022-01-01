import BaseMirror from "./BaseMirror.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";
import Spear from "../Primitives/Spear.js";

export default class SpearMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);
        let upperSpearHeight=params.upperSpearHeight
        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.spearHeight= height - 2* upperSpearHeight;
        this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, upperSpearHeight , padding), params.countX);
        this.addGridOfLozenge(upperSpearHeight-this.lozengeHeight/2,this.lozengeWidth,this.lozengeHeight,params.countX,1,padding);
        this.drawer.addOneRowOfShapes(0, upperSpearHeight+this.lozengeHeight*.5 , new Spear(this.spearWidth, this.spearHeight, padding), params.countX);
        this.addGridOfLozenge(this.spearHeight+upperSpearHeight-this.lozengeHeight/2,this.lozengeWidth,this.lozengeHeight,params.countX,1,padding);
        this.drawer.addOneRowOfShapes(0, this.height-upperSpearHeight+ this.lozengeHeight/2, new BottomSpear(this.lozengeWidth, upperSpearHeight , padding), params.countX);
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
