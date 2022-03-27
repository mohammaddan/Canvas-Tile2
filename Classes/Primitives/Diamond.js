import Primitive from "../Primitive.js";

export default class Diamond extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1,inverse= true) {
        super(width, height, padding, lineWidth);
        this.h1 = inverse ? height/3 : 2*height/3;
        this.h2 = height - this.h1;
        this.inverse=inverse
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width / 2, y: -this.h1 });
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width / 2, y: this.h2 });

        this.drawablePoints.push({ x: padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: padding -this.h1 });
        this.drawablePoints.push({ x: width - padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: this.h2 - padding });
    }

    clone() {
        return new Diamond(this.width, this.height, this.padding, this.lineWidth,this.inverse);
    }

    area() {
        return this.width * this.height / 2;
    }

    environment() {
        let edge1 = Math.sqrt((this.width/2) ** 2 + this.h1 ** 2);
        let edge2 = Math.sqrt((this.width/2) ** 2 + this.h2 ** 2);
        return (edge1+edge2) * 2;
    }
}
