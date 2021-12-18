import Primitive from "../Primitive.js";

export default class BottomTriangle extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);

        this.points.push({ x: width / 2, y: 0 });
        this.points.push({ x: width, y: height });
        this.points.push({ x: 0, y: height });

        this.drawablePoints.push({ x: width / 2, y: padding });
        this.drawablePoints.push({ x: width - padding * 2, y: height - padding });
        this.drawablePoints.push({ x: padding * 2, y: height - padding });
    }

    clone() {
        return new BottomTriangle(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * this.height / 2;
    }

    environment() {
        let edge = Math.sqrt((this.width / 2) ^ 2 + this.height ^ 2);
        return edge * 2 + this.width;
    }
}
