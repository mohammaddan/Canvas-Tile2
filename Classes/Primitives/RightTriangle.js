import Primitive from "../Primitive.js";

export default class RightTriangle extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width, y: height });
        this.points.push({ x: 0, y: height / 2 });

        this.drawablePoints.push({ x: width - padding, y: 2 * padding });
        this.drawablePoints.push({ x: width - padding, y: height - 2 * padding });
        this.drawablePoints.push({ x: padding, y: height / 2 });
    }

    clone() {
        return new RightTriangle(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * this.height / 2;
    }

    environment() {
        let edge = Math.sqrt((this.height / 2) ^ 2 + this.width ^ 2);
        return edge * 2 + this.height;
    }
}
