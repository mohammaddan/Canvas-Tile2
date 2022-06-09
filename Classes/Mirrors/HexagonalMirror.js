import CutedLozenge from "../Primitives/CutedLozenge.js";
import BaseMirror from "./BaseMirror.js";
import HalfCutedLozenge from "../Primitives/HalfCutedLozenge.js";

/**
 * params is object that has countX and countY
 */
export default class HexagonalMirror extends BaseMirror {
    /**
     * params has countX and countY
     * @param ctx
     * @param width
     * @param height
     * @param {{hexWidth}} params
     * @param padding
     */
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);
        this.hexWidth = params.hexWidth
        let countY = Math.round(height / this.hexWidth)
        this.hexHeight = height / (countY + 1);
        // console.log(countX)
        let a,countX;
        for(let i=0;i<10;i++){
            a = (-2 * this.hexWidth + Math.sqrt(16 * this.hexWidth ** 2 + 12 * this.hexHeight ** 2)) / 6
            countX = Math.round(width / (this.hexWidth+a))
            this.hexWidth = width / (countX)-a;
        }
        this.squareWidth = a;///(this.hexWidth - a)/2;
        // let temp = width - (this.hexWidth + this.squareWidth) * countX
        // this.squareWidth += temp / countX;
        this.countX = countX;
        this.countY = countY
        for (let i = 0; i < countX; i++) {
            this.drawer.addOneShapeAt(this.squareWidth / 2 + (this.squareWidth + this.hexWidth) * i, 0,
                new HalfCutedLozenge(this.hexWidth, this.hexHeight / 2, this.squareWidth, padding))
        }
        for (let j = 0; j < countY + 1; j++) {
            this.drawer.addOneShapeAt(0, j * this.hexHeight,
                new HalfCutedLozenge(this.hexWidth / 2, this.hexHeight, this.squareWidth, padding, 1, 'left-invert'))
            for (let i = 0; i < countX - 1; i++) {
                this.drawer.addOneShapeAt((this.hexWidth) / 2 + this.squareWidth + (this.squareWidth + this.hexWidth) * i, this.hexHeight / 2 + j * this.hexHeight,
                    new CutedLozenge(this.hexWidth, this.hexHeight, this.squareWidth, padding))
            }
            this.drawer.addOneShapeAt(width - this.hexWidth / 2, j * this.hexHeight,
                new HalfCutedLozenge(this.hexWidth / 2, this.hexHeight, this.squareWidth, padding, 1, 'right-invert'))
            if (j === countY) break;
            for (let i = 0; i < countX; i++) {
                this.drawer.addOneShapeAt(this.squareWidth / 2 + (this.squareWidth + this.hexWidth) * i, this.hexHeight / 2 + (j + 0.5) * this.hexHeight,
                    new CutedLozenge(this.hexWidth, this.hexHeight, this.squareWidth, padding))
            }
        }
        for (let i = 0; i < countX; i++) {
            this.drawer.addOneShapeAt(this.squareWidth / 2 + (this.squareWidth + this.hexWidth) * i, height - this.hexHeight / 2,
                new HalfCutedLozenge(this.hexWidth, this.hexHeight / 2, this.squareWidth, padding, 1, 'bottom'))
        }
    }


    static parameters(width, height) {
        return [
            {
                name: "hexWidth",
                required: true,
                label: "عرض هر قطعه",
                default: 50,
                min: 25,
                max: 100,
            },
        ];
    }

    drawMeasures(ctx, params, size = 1) {
        let x = new CutedLozenge(this.hexWidth, this.hexHeight, this.squareWidth, 0);
        x.drawMeasures(ctx, 50.5, 80.5, this.countX * this.countY + (this.countX - 1) * (this.countY + 1), 80 * size)
        let uh = new HalfCutedLozenge(this.hexWidth, this.hexHeight / 2, this.squareWidth, 0, 1, 'bottom')
        uh.drawMeasures(ctx, 50.5, 200.5, 2 * this.countX, 80 * size)
        let lh = new HalfCutedLozenge(this.hexWidth / 2, this.hexHeight, this.squareWidth, 0, 1, 'left-invert')
        lh.drawMeasures(ctx, 200.5, 80.5, 2 * (this.countY + 1), 50 * size)
    }

    reservePrimitives(width, height) {
        return [
            {
                title: 'شش ضلعی',
                name: 'lozenge',
                primitive: new CutedLozenge(this.hexWidth, this.hexHeight, this.squareWidth, 0)
            },
            {
                title: 'نیم شش ضلعی بالا و پایین',
                name: 'halfLozengeH',
                primitive: new HalfCutedLozenge(this.hexWidth, this.hexHeight / 2, this.squareWidth, 0, 1, 'bottom')
            },
            {
                title: 'نیم شش ضلعی چپ و راست',
                name: 'halfLozengeV',
                primitive: new HalfCutedLozenge(this.hexWidth / 2, this.hexHeight, this.squareWidth, 0, 1, 'left-invert')
            },
        ]
    }
}
