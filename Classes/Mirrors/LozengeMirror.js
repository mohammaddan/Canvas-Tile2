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

        // for (let i = 0; i < countY; i++) {
        //     this.drawer.addOneShapeAt(0, this.lozengeHeight * i, new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight, padding));
        //     this.drawer.addOneRowOfShapes(this.lozengeWidth / 2, this.lozengeHeight / 2 + this.lozengeHeight * i,
        //         new Lozenge(this.lozengeWidth, this.lozengeHeight, padding), countX - 1);
        //     this.drawer.addOneShapeAt(this.width - this.lozengeWidth / 2, this.lozengeHeight * i,
        //         new RightTriangle(this.lozengeWidth / 2, this.lozengeHeight, padding));
        //     if (i < countY - 1)
        //         this.drawer.addOneRowOfShapes(0, this.lozengeHeight + this.lozengeHeight * i,
        //             new Lozenge(this.lozengeWidth, this.lozengeHeight, padding), countX);
        // }


        // let cnt = 2 * countX * countY;
        // this.drawer.addOneRowOfShapes(0, this.lozengeHeight, new Lozenge(this.lozengeWidth, this.lozengeHeight,padding), countX);
        // for (let i = 0; i < countX; i++) {
        //     this.drawer.addShape(new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2,padding));
        // }
        // for (let i = 0; i < 1; i++) {
        //     if (i % (2 * countX) === 0) this.drawer.addShape(new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight,padding));
        //     this.drawer.addShape(new Lozenge(this.lozengeWidth, this.lozengeHeight,padding));
        // }
    }

}
