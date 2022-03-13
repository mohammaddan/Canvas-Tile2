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
        this.addGridOfLozenge(0, this.lozengeWidth, this.lozengeHeight, params.countX, params.countY, padding);
        this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new BottomTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);

    }


    static parameters(width, height) {
        return [{
                name: 'countX',
                required: true,
                label: 'تعداد تکرار در عرض',
                default: Math.fround(width / 25),
                min: Math.ceil(width / 50),
                max: Math.floor(width / 10)
            },
            {
                name: 'countX',
                required: true,
                label: 'تعداد تکرار در ارتفاع',
                default: Math.fround(height / 25),
                min: Math.ceil(height / 50),
                max: Math.floor(height / 10)
            },
        ]
    }

    drawMeasures(ctx, params, size) {
        let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
        loz.drawMeasures(ctx, 50.5, 80.5, params.countX * 2, 80)
    }

}