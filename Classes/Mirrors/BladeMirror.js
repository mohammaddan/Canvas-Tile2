import BaseMirror from "./BaseMirror.js";
import Blade from "../Primitives/Blade.js";
import HalfBlade from "../Primitives/HalfBlade.js";
import Lozenge from "../Primitives/Lozenge.js";

/**
 * params is object that has countX,upperBladeHeight
 */
export default class BladeMirror extends BaseMirror {
    /**
     *
     * @param ctx
     * @param width
     * @param height
     * @param {{countX,upperBladeHeight}} params
     * @param padding
     */
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.bladeWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.bladeHeight= height - 2* params.upperBladeHeight;
        for(let i=0;i<params.countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,0,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'top-left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,0,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'top-right'))
        }
        this.drawer.addOneRowOfShapes(0,this.bladeWidth, new Lozenge(this.bladeWidth, this.bladeWidth , padding), params.countX);
        for(let i=0;i<params.countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,this.bladeWidth,new Blade(this.bladeWidth/2,this.bladeHeight,padding,1,'left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,this.bladeWidth*1.5,new Blade(this.bladeWidth/2,this.bladeHeight,padding,1,'right'))
        }
        this.drawer.addOneRowOfShapes(0, this.bladeWidth+this.bladeHeight, new Lozenge(this.bladeWidth, this.bladeWidth , padding), params.countX);
        for(let i=0;i<params.countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,height-params.upperBladeHeight,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'bottom-left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,height-params.upperBladeHeight+this.bladeWidth/2,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'bottom-right'))
            // this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,0,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'right'))
        }
    }

    parameters(){
        return [
            {value:'countX',label:'تعداد تکرار در عرض'},
            {value:'upperBladeHeight',label:'ارتفاع نیم نیزه های بالا و پایین'},
        ]
    }

    limits(){
        return {
            countX: []
        }
    }

}
