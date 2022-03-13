import BaseMirror from "./BaseMirror.js";
import Spear from "../Primitives/Spear.js";
import UpperSpear from "../Primitives/UpperSpear.js";
import BottomSpear from "../Primitives/BottomSpear.js";
import Lozenge from "../Primitives/Lozenge.js";

export default class FourAndHalfSpotSpearMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);
        this.params = params;
        this.spearWidth = this.lozengeHeight = this.lozengeWidth = width / params.countX;
        this.spearHeight = height - 2 * this.lozengeHeight - 2 * params.upperSpearHeight;
        this.drawer.addOneRowOfShapes(0, 0, new UpperSpear(this.lozengeWidth, params.upperSpearHeight, padding), params.countX);
        this.addGridOfLozenge(params.upperSpearHeight - this.lozengeHeight / 2, this.lozengeWidth, this.lozengeHeight, params.countX, 2, padding);
        this.drawer.addOneRowOfShapes(0, params.upperSpearHeight + this.lozengeHeight * 1.5, new Spear(this.spearWidth, this.spearHeight, padding), params.countX);
        this.addGridOfLozenge(this.spearHeight + params.upperSpearHeight + this.lozengeHeight / 2, this.lozengeWidth, this.lozengeHeight, params.countX, 2, padding);
        this.drawer.addOneRowOfShapes(0, this.height - params.upperSpearHeight + this.lozengeHeight / 2, new BottomSpear(this.lozengeWidth, params.upperSpearHeight, padding), params.countX);
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
                name: 'upperSpearHeight',
                required: false,
                label: 'ارتفاع نیم نیزه های بالا و پایین',
                default: 50,
                min: 30,
                max: Math.min(100, (height - 160 - 75) / 2)
            },
        ]
    }

    drawMeasures(ctx, params, size) {
        let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
        loz.drawMeasures(ctx, 50.5, 80.5, params.countX * 2, 80)
        let hf = new UpperSpear(this.lozengeWidth / 2, this.params.upperSpearHeight, this.padding, 1)
        hf.drawMeasures(ctx, 50.5, 180.5, params.countX * 4, 40)
        let spear = new Spear(this.spearWidth, this.spearHeight, this.padding)
        spear.drawMeasures(ctx, 230.5, 50.5, params.countX * 2, 55)
    }


}