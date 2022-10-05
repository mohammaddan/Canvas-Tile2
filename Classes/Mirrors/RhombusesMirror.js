import BaseMirror from "./BaseMirror.js";
import Rhombus from "../Primitives/Rhombus.js";
import HalfSquare from "../Primitives/HalfSquare.js";

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
    constructor(ctx, width, height, params, padding = 0, scale = 1) {
        super(ctx, width, height, 0, scale);
        this.angle=params.angle
        this.sqH=0
        for(let i=0;i<10;i++){
            this.rhombusWidth = width / params.countX;
            this.rhombusHeight = (height-this.sqH) / params.countY;
            this.sqH = Math.tan(Math.PI * params.angle / 180) * this.rhombusWidth
        }

        for (let j = 0; j < params.countX; j += 2) {

            this.drawer.addOneShapeAt(j * this.rhombusWidth, 0, new HalfSquare(this.rhombusWidth, this.sqH, padding, 1, 'top-right'))
            if (j < params.countX - 1) {
                this.drawer.addOneShapeAt((j + 1) * this.rhombusWidth, 0, new HalfSquare(this.rhombusWidth, this.sqH, padding, 1, 'top-left'))
            }
            for (let i = 0; i < params.countY; i++) {
                this.drawer.addOneShapeAt(j * this.rhombusWidth, i * this.rhombusHeight,
                    new Rhombus(this.rhombusWidth, this.rhombusHeight, padding, 1, 'right', params.angle))
                if (j < params.countX - 1) {
                    this.drawer.addOneShapeAt((j + 1) * this.rhombusWidth, i * this.rhombusHeight,
                        new Rhombus(this.rhombusWidth, this.rhombusHeight, padding, 1, 'left', params.angle))
                }
            }
            this.drawer.addOneShapeAt(j * this.rhombusWidth, this.height - this.sqH, new HalfSquare(this.rhombusWidth, this.sqH, padding, 1, 'bottom-right'))
            if (j < params.countX - 1) {
                this.drawer.addOneShapeAt((j + 1) * this.rhombusWidth, this.height - this.sqH, new HalfSquare(this.rhombusWidth, this.sqH, padding, 1, 'bottom-left'))
            }
        }

    }

    static parameters(width, height) {
        return [
            {
                name: 'countX',
                required: true,
                label: 'تعداد تکرار در عرض',
                default: Math.round(width / 75),
                min: Math.ceil(width / 100),
                max: Math.floor(width / 50)
            },
            {
                name: 'countY',
                required: true,
                label: 'تعداد تکرار در ارتفاع',
                default: Math.round(0.5 * height / 20),
                min: 10,
                max: 40
            },
            {
                name: 'angle',
                required: false,
                label: 'زاویه',
                default: 30,
                min: 30,
                max: 60
            },
        ]
    }

    drawMeasures(ctx, params, size = 0.6) {
        let rm = new Rhombus(this.rhombusWidth, this.rhombusHeight, this.padding, 1, 'left', params.angle);
        let tr=new HalfSquare(this.rhombusWidth, this.sqH, this.padding, 1, 'bottom-left')
        rm.drawMeasures(ctx, 50.5, 50.5, params.countX * params.countY, 80 * size)
        tr.drawMeasures(ctx, 50.5, 150.5, params.countX * 2, 80 * size)

    }

    reservePrimitives(width, height) {
        return [
            {
                title: 'متوازی الاضلاع',
                name: 'rhombus',
                primitive: new Rhombus(this.rhombusWidth, this.rhombusHeight, this.padding, 1, 'left',this.angle)
            },
            {
                title: 'مثلث',
                name: 'triangle',
                primitive: new HalfSquare(this.rhombusWidth, this.sqH, this.padding, 1, 'bottom-left')
            },
            // new Rhombus(width/8,height)
        ]
    }

}
