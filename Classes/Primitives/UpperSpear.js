import Primitive from "../Primitive.js";

export default class UpperSpear extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.h1=this.width/2;
        this.h2=this.height-this.h1;
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width, y: this.h2 });
        this.points.push({ x: width / 2, y: height });
        this.points.push({ x: 0, y: this.h2 });

        this.drawablePoints.push({ x: padding, y: padding });
        this.drawablePoints.push({ x: width-padding, y: padding });
        this.drawablePoints.push({ x: width-padding, y: this.h2 });
        this.drawablePoints.push({ x: width / 2, y: height-padding });
        this.drawablePoints.push({ x: padding, y: this.h2 });
    }

    clone() {
        return new UpperSpear(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * (this.h1 / 2 +this.h2) ;
    }

    environment() {
        let edge = Math.sqrt((this.width / 2) ^ 2 + this.h1 ^ 2);
        return edge * 2 + this.width+2*this.h2;
    }
}
