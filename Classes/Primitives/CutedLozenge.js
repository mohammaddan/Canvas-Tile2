import Primitive from "../Primitive.js";

export default class CutedLozenge extends Primitive {
    constructor(width, height,squareWidth=20, padding = 0, lineWidth = 1,horizontal=true) {
        super(width, height, padding, lineWidth);
        this.w1=this.h1=squareWidth/2; //jewelHeight
        this.h2=height/2-this.h1;
        this.w2=width/2-this.w1;
        if (horizontal) {
            this.points.push({x: 0, y: 0});
            this.points.push({x: this.w2, y: -height / 2});
            this.points.push({x: this.w2 + squareWidth, y: -height / 2});
            this.points.push({x: width, y: 0});
            this.points.push({x: this.w2 + squareWidth, y: height / 2});
            this.points.push({x: this.w2, y: height / 2});

            this.drawablePoints.push({x: padding, y: 0});
            this.drawablePoints.push({x: this.w2 + padding, y: -height / 2 + padding});
            this.drawablePoints.push({x: this.w2 + squareWidth, y: -height / 2 + padding});
            this.drawablePoints.push({x: width - padding, y: 0});
            this.drawablePoints.push({x: this.w2 + squareWidth, y: height / 2 - padding});
            this.drawablePoints.push({x: this.w2 + padding, y: height / 2 - padding});
        } else {
            this.points.push({x: 0, y: 0});
            this.points.push({x: width / 2, y: -this.h2});
            this.points.push({x: width, y: 0});
            this.points.push({x: width, y: this.h1*2 });
            this.points.push({x: width / 2, y: this.h1*2+this.h2});
            this.points.push({x: 0, y: this.h1 *2});

            this.drawablePoints.push({x: padding, y: padding});
            this.drawablePoints.push({x: width / 2, y:-this.h2 + padding});
            this.drawablePoints.push({x: width - padding, y: padding });
            this.drawablePoints.push({x: width - padding, y: this.h1 * 2 });
            this.drawablePoints.push({x: width / 2, y: this.h1*2+this.h2 - padding});
            this.drawablePoints.push({x: padding, y: this.h1 * 2});
        }
        // console.log(this.drawablePoints);
    }

    clone() {
        return new CutedLozenge(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        // if (this.isInDrawerBound(drawerWidth, drawerHeight))
        return this.width * this.height / 2;
        // return this.width * this.height / 4;
    }

    environment() {
        let edge = Math.sqrt(this.width ^ 2 + this.height ^ 2);
        // if (this.isInDrawerBound(drawerWidth, drawerHeight))
        return edge * 4;

    }
}
