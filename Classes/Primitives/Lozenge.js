import Primitive from "../Primitive.js";

export default class Lozenge extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width / 2, y: -height / 2 });
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width / 2, y: height / 2 });

        this.drawablePoints.push({ x: padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: padding - height / 2 });
        this.drawablePoints.push({ x: width - padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: height / 2 - padding });
    }
}