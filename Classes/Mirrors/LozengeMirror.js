import BottomTriangle from "../Primitives/BottomTriangle.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";
import Lozenge from "../Primitives/Lozenge.js";
import RightTriangle from "../Primitives/RightTriangle.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";


/**
 * params is object that has countX and countY
 */
export default class LozengeMirror extends BaseMirror {
    /**
     * params has countX and countY
     * @param ctx
     * @param width
     * @param height
     * @param {{countX,countY}} params
     * @param padding
     */
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.lozengeWidth = width / params.countX;
        this.lozengeHeight = height / params.countY;
        this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
        this.addGridOfLozenge(0,this.lozengeWidth,this.lozengeHeight,params.countX,params.countY,padding);
        this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new BottomTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);

    }


    static parameters(){
        return [
            {name:'countX',required:true,label:'تعداد تکرار در عرض'},
            {name:'countY',required:true,label:'تعداد تکرار در ارتفاع'},
        ]
    }

    /**
     *
     * @param width
     * @param height
     * @returns {{countY: {default: number, min: number, max: number}, countX: {default: number, min: number, max: number}}}
     */
    static limits(width,height){
        return {
            countX: {
                default: Math.fround(width/25),
                min: Math.ceil(width/50),
                max: Math.floor(width/10)
            },
            countY: {
                default: Math.fround(width/25),
                min: Math.ceil(width/50),
                max: Math.floor(width/10)
            },
        }
    }

}
