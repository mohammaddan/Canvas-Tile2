import Primitive from "../Primitive.js";

export default class Square extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width , y:0 });
        this.points.push({ x: width, y: height });
        this.points.push({ x: 0, y: height });

        this.drawablePoints.push({ x: padding, y: padding });
        this.drawablePoints.push({ x: width -padding, y:padding });
        this.drawablePoints.push({ x: width-padding, y: height -padding});
        this.drawablePoints.push({ x: padding, y: height -padding});
    }

    clone() {
        return new Square(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * this.height;
    }

    environment() {
        return 2*(this.width+this.height);
    }
}
