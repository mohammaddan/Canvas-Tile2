import BaseMirror from "./BaseMirror.js";
import HalfBlade from "../Primitives/HalfBlade.js";
import Rhombus from "../Primitives/Rhombus.js";
import Square from "../Primitives/Square.js";

export default class RhombusMirror extends BaseMirror {
    /**
     *
     * @param ctx
     * @param width
     * @param height
     * @param {{countX,countY,angle}} params
     * @param padding
     * @param scale
     */
    constructor(ctx, width, height, params, padding = 0,scale=1) {
        super(ctx, width, height,0,scale);

        this.rhombusWidth = width / params.countX;
        this.rhombusHeight = height / params.countY;
        let t=[2,4,1,3,5];

        this.h1 = !params.angle ? this.rhombusWidth : Math.tan(Math.PI * params.angle / 180) * this.rhombusWidth;
        this.rhombusHeight+=this.h1
        for (let j = 0; j < params.countX; j++) {
            let h1 = t[j % 3 ] * (this.rhombusHeight - this.h1) / 7 + this.h1;

            this.drawer.addOneShapeAt(j * this.rhombusWidth, 0, new HalfBlade(this.rhombusWidth, h1, padding, 1, 'top-'+(j%2?'left':'right')))
            for (let i = 0; i < params.countY - 1; i++)
                this.drawer.addOneShapeAt(j * this.rhombusWidth, h1 - this.h1 + i * (this.rhombusHeight - this.h1) +(j%2?this.rhombusWidth:0),
                    new Rhombus(this.rhombusWidth, this.rhombusHeight, padding, 1, (j%2?'right':'left')))
            this.drawer.addOneShapeAt(j * this.rhombusWidth, h1 - this.h1 + (params.countY - 1) * (this.rhombusHeight -this.h1) +(j%2?this.rhombusWidth:0),
                new HalfBlade(this.rhombusWidth, this.rhombusHeight - h1, padding, 1, 'bottom-'+(j%2?'right':'left')))
        }

    }

    static parameters(width, height) {
        return [
            {
                name: 'countX',
                required: true,
                label: 'تعداد تکرار در عرض',
                default: Math.round(width / 25),
                min: Math.ceil(width / 50),
                max: Math.floor(width / 10)
            },
            {
                name: 'countY',
                required: true,
                label: 'تعداد تکرار در ارتفاع',
                default: Math.round(0.5*height / 60),
                min: 50,
                max: 100
            },
            {
                name: 'angle',
                required: false,
                label: 'زاویه',
                default: 45,
                min: 30,
                max: 60
            },
        ]
    }

    drawMeasures(ctx, params, size=0.6) {
        let rm = new Rhombus(this.rhombusWidth, this.rhombusHeight, this.padding, 1, 'left');
        rm.drawMeasures(ctx, 50.5, 50.5, params.countX * params.countY, 80*size)
    }

    reservePrimitives(width,height) {
        return [
            {title:'متوازی الاضلاع',name:'rhombus',primitive:new Rhombus(this.rhombusWidth, this.rhombusHeight, this.padding, 1, 'left')},
            // new Rhombus(width/8,height)
        ]
    }

}
