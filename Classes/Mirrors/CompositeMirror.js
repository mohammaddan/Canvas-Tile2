import BaseMirror from "./BaseMirror.js";
import RotatedRhombus from "../Primitives/RotatedRhombus.js";

/**
 * params is object that has countX,upperBladeHeight
 */
export default class CompositeMirror extends BaseMirror {
    /**
     *
     * @param ctx
     * @param width
     * @param height
     * @param {{countX,countY}} params
     * @param padding
     */
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);
        this.lozengeWidth = this.width / params.countX
        this.lozengeHeight = this.height / params.countY
        this.rectWidth = 2 * this.lozengeWidth / 3;
        this.rectHeight = this.lozengeHeight / 3;
        let t0 = 90,t1=45
        let t = (Math.PI*t1) / 180
        let cosT=Math.cos(t);
        let sinT=Math.sin(t);
        this.drawer.addOneShapeAt(200, 200,
            new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -t0, -t1))

        let temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
        this.drawer.addOneShapeAt(temp[2].x, temp[2].y,
            new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -180+t0, 180-t0-t1))

        temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
        this.drawer.addOneShapeAt(temp[2].x, temp[2].y,
            new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -t0, -t1-180))

        temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
        this.drawer.addOneShapeAt(temp[2].x, temp[2].y,
            new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -180+t0, -t0-t1))

        temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
        this.drawer.addOneShapeAt(temp[3].x, temp[3].y,
            new RotatedRhombus(this.rectWidth-this.rectHeight, this.rectWidth-this.rectHeight, padding, 1, -180+t0, -t1+90))
    }
}
