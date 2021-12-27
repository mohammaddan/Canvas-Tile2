import BaseMirror from "./BaseMirror.js";
import Blade from "../Primitives/Blade.js";
import HalfBlade from "../Primitives/HalfBlade.js";
import Lozenge from "../Primitives/Lozenge.js";

export default class BladeMirror extends BaseMirror {
    constructor(ctx, width, height, countX,upperBladeHeight, padding = 0) {
        super(ctx, width, height);

        this.bladeWidth = this.lozengeHeight = this.lozengeWidth = width / countX;
        this.bladeHeight= height - 2* upperBladeHeight;
        for(let i=0;i<countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,0,new HalfBlade(this.bladeWidth/2,upperBladeHeight,padding,1,'top-left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,0,new HalfBlade(this.bladeWidth/2,upperBladeHeight,padding,1,'top-right'))
        }
        this.drawer.addOneRowOfShapes(0, this.bladeWidth*1.5, new Lozenge(this.bladeWidth, this.bladeWidth , padding), countX);
        for(let i=0;i<countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,this.bladeWidth*1.5,new Blade(this.bladeWidth/2,this.bladeHeight,padding,1,'left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,this.bladeWidth*2,new Blade(this.bladeWidth/2,this.bladeHeight,padding,1,'right'))
        }
        this.drawer.addOneRowOfShapes(0, this.bladeWidth*1.5+this.bladeHeight, new Lozenge(this.bladeWidth, this.bladeWidth , padding), countX);
        for(let i=0;i<countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,height-upperBladeHeight,new HalfBlade(this.bladeWidth/2,upperBladeHeight,padding,1,'bottom-left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,height-upperBladeHeight+this.bladeWidth/2,new HalfBlade(this.bladeWidth/2,upperBladeHeight,padding,1,'bottom-right'))
            // this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,0,new HalfBlade(this.bladeWidth/2,upperBladeHeight,padding,1,'right'))
        }
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
