import BaseMirror from "./BaseMirror.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";
import Spear from "../Primitives/Spear.js";

export default class SpearMirror extends BaseMirror {
    constructor(ctx, width, height, countX,upperSpearHeight, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / countX;
        this.spearHeight= height - 2* upperSpearHeight;
        this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, upperSpearHeight , padding), countX);
        this.addGridOfLozenge(upperSpearHeight-this.lozengeHeight/2,this.lozengeWidth,this.lozengeHeight,countX,1,padding);
        this.drawer.addOneRowOfShapes(0, upperSpearHeight+this.lozengeHeight*.5 , new Spear(this.spearWidth, this.spearHeight, padding), countX);
        this.addGridOfLozenge(this.spearHeight+upperSpearHeight-this.lozengeHeight/2,this.lozengeWidth,this.lozengeHeight,countX,1,padding);
        this.drawer.addOneRowOfShapes(0, this.height-upperSpearHeight+ this.lozengeHeight/2, new BottomSpear(this.lozengeWidth, upperSpearHeight , padding), countX);
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
