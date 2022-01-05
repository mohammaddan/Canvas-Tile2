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
        this.drawer.addOneRowOfShapes(0,params.upperBladeHeight, new Lozenge(this.bladeWidth, this.bladeWidth , padding), params.countX);
        for(let i=0;i<params.countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,params.upperBladeHeight,new Blade(this.bladeWidth/2,this.bladeHeight,padding,1,'left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,params.upperBladeHeight+this.bladeWidth*0.5,new Blade(this.bladeWidth/2,this.bladeHeight,padding,1,'right'))
        }
        this.drawer.addOneRowOfShapes(0, params.upperBladeHeight+this.bladeHeight, new Lozenge(this.bladeWidth, this.bladeWidth , padding), params.countX);
        for(let i=0;i<params.countX;i++){
            this.drawer.addOneShapeAt(i*this.bladeWidth,height-params.upperBladeHeight,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'bottom-left'))
            this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,height-params.upperBladeHeight+this.bladeWidth/2,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'bottom-right'))
            // this.drawer.addOneShapeAt((i+0.5)*this.bladeWidth,0,new HalfBlade(this.bladeWidth/2,params.upperBladeHeight,padding,1,'right'))
        }
    }

    static parameters(width,height){
        return [
            {
                name:'countX',
                required:true,
                label:'تعداد تکرار در عرض',
                default: Math.fround(width/25),
                min: Math.ceil(width/50),
                max: Math.floor(width/10)
            },
            {
                name:'upperBladeHeight',
                required:false,
                label:'ارتفاع نیم نیزه های بالا و پایین',
                default: 50,
                min: 30,
                max: 100
            },
        ]
    }
    //
    // /**
    //  *
    //  * @param width
    //  * @param height
    //  * @returns {{countX: {default: number, min: number, max: number}, upperBladeHeight: {default: number, min: number, max: number}}}
    //  */
    // static limits(width,height){
    //     return {
    //         countX: {
    //             default: Math.fround(width/25),
    //             min: Math.ceil(width/50),
    //             max: Math.floor(width/10)
    //         },
    //         upperBladeHeight: {
    //             default: 50,
    //             min: 30,
    //             max: 100
    //         },
    //     }
    // }

}
