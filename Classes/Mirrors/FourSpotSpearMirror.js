import BottomTriangle from "../Primitives/BottomTriangle.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BaseMirror from "./BaseMirror.js";
import Spear from "../Primitives/Spear.js";
import Lozenge from "../Primitives/Lozenge.js";

export default class FourSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);

        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.spearHeight = height - 3 * this.lozengeHeight;
        this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
        this.addGridOfLozenge(0, this.lozengeWidth, this.lozengeHeight, params.countX, 2, padding);
        this.drawer.addOneRowOfShapes(0, 2 * this.lozengeHeight, new Spear(this.spearWidth, this.spearHeight, padding), params.countX);
        this.addGridOfLozenge(this.spearHeight + this.lozengeHeight, this.lozengeWidth, this.lozengeHeight, params.countX, 2, padding);
        this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new BottomTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
    }


    static parameters(width, height) {
        return [{
            name: 'countX',
            required: true,
            label: 'تعداد تکرار در عرض',
            default: Math.round(width / 25),
            min: Math.ceil(width / 50),
            max: Math.floor(width / 10)
        }, ]
    }

    drawMeasures(ctx, params, size) {
        let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
        loz.drawMeasures(ctx, 50.5, 80.5, (params.countX * 3 - 2) * 2, 80)
        let hf = new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, this.padding)
        hf.drawMeasures(ctx, 50.5, 180.5, params.countX * 2 + 8, 80)
        let spear = new Spear(this.spearWidth, this.spearHeight, this.padding)
        spear.drawMeasures(ctx, 230.5, 50.5, params.countX, 55)
    }

}