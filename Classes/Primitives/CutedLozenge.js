import Primitive from "../Primitive.js";

export default class CutedLozenge extends Primitive {
    constructor(width, height, squareWidth = 20, padding = 0, lineWidth = 1, horizontal = true) {
        super(width, height, padding, lineWidth);
        this.squareWidth = squareWidth;
        this.w1 = this.h1 = squareWidth / 2; //jewelHeight
        this.h2 = height / 2 - this.h1;
        this.w2 = width / 2 - this.w1;
        this.horizontal = horizontal;
        if (horizontal) {
            this.edge = Math.sqrt(this.w2 * this.w2 + this.height * this.height / 4);
            this.points.push({x: 0, y: 0});
            this.points.push({x: this.w2, y: -height / 2});
            this.points.push({x: this.w2 + squareWidth, y: -height / 2});
            this.points.push({x: width, y: 0});
            this.points.push({x: this.w2 + squareWidth, y: height / 2});
            this.points.push({x: this.w2, y: height / 2});

            this.drawablePoints.push({x: padding, y: 0});
            this.drawablePoints.push({x: this.w2, y: -height / 2 + padding});
            this.drawablePoints.push({x: this.w2 + squareWidth, y: -height / 2 + padding});
            this.drawablePoints.push({x: width - padding, y: 0});
            this.drawablePoints.push({x: this.w2 + squareWidth, y: height / 2 - padding});
            this.drawablePoints.push({x: this.w2, y: height / 2 - padding});
        } else {
            this.edge = Math.sqrt(this.h2 * this.h2 + this.width * this.width / 4)
            this.points.push({x: 0, y: 0});
            this.points.push({x: width / 2, y: -this.h2});
            this.points.push({x: width, y: 0});
            this.points.push({x: width, y: this.h1 * 2});
            this.points.push({x: width / 2, y: this.h1 * 2 + this.h2});
            this.points.push({x: 0, y: this.h1 * 2});

            this.drawablePoints.push({x: padding, y: 0});
            this.drawablePoints.push({x: width / 2, y: -this.h2 + padding});
            this.drawablePoints.push({x: width - padding, y: 0});
            this.drawablePoints.push({x: width - padding, y: this.h1 * 2});
            this.drawablePoints.push({x: width / 2, y: this.h1 * 2 + this.h2 - padding});
            this.drawablePoints.push({x: padding, y: this.h1 * 2});
        }
    }

    clone() {
        return new CutedLozenge(this.width, this.height, this.squareWidth, this.padding, this.lineWidth);
    }

    area() {
        // console.log(this.horizontal, '-----',this.width,this.height,this.h2)
        if (this.horizontal)
            return this.width * this.height - this.w2 * this.height
        return this.width * this.height - this.h2 * this.width
    }

    environment() {
        return this.edge * 4 +2*this.squareWidth;

    }
}
