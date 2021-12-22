import Primitive from "../Primitive.js";

export default class HalfCutedLozenge extends Primitive {
    constructor(width, height, squareWidth = 20, padding = 0, lineWidth = 1, type = 'top') {
        super(width, height, padding, lineWidth);
        this.type = type;
        this.squareWidth = squareWidth;
        this.w1 = this.h1 = squareWidth / 2; //jewelHeight
        this.h2 = height / 2 - this.h1;
        this.w2 = width / 2 - this.w1;
        switch (type) {
            case 'top':
                this.points.push({x: 0, y: 0});
                this.points.push({x: this.w2, y: height});
                this.points.push({x: this.w2 + this.w1, y: height });
                this.points.push({x: width, y: 0});

                this.drawablePoints.push({x: 2 * padding, y: padding});
                this.drawablePoints.push({x: this.w2, y: height - padding});
                this.drawablePoints.push({x: this.w2 + this.w1 * 2, y: height  - padding});
                this.drawablePoints.push({x: width - 2 * padding, y: padding});
                break;
            case 'bottom':
                this.points.push({x: this.w2, y: 0});
                this.points.push({x: this.w2 + squareWidth, y: 0});
                this.points.push({x: this.width, y: height});
                this.points.push({x: 0, y: height});

                this.drawablePoints.push({x: this.w2, y: padding});
                this.drawablePoints.push({x: this.w2 + squareWidth, y: padding});
                this.drawablePoints.push({x: this.width - 2 * padding, y: height - padding});
                this.drawablePoints.push({x: 2 * padding, y: height - padding});
                break;
            case 'left':
                this.points.push({x: 0, y: 0});
                this.points.push({x: width, y: this.h2});
                this.points.push({x: width, y: this.h2 + this.h1 * 2});
                this.points.push({x: 0, y: height});

                this.drawablePoints.push({x: padding, y: padding * 2});
                this.drawablePoints.push({x: width - padding, y: this.h2});
                this.drawablePoints.push({x: width - padding, y: this.h2 + this.h1 * 2});
                this.drawablePoints.push({x: padding, y: height - padding * 2});
                break;
            case 'right':
                this.points.push({x: width, y: 0});
                this.points.push({x: width, y: height});
                this.points.push({x: 0, y: this.h2+this.h1*2});
                this.points.push({x: 0, y: this.h2});

                this.drawablePoints.push({x: width-padding, y: 2*padding});
                this.drawablePoints.push({x: width-padding, y: height-2*padding});
                this.drawablePoints.push({x: padding, y: this.h2+this.h1*2});
                this.drawablePoints.push({x: padding, y: this.h2});
        }
    }

    clone() {
        return new HalfCutedLozenge(this.width, this.height, this.squareWidth, this.padding, this.lineWidth, this.type);
    }

    area() {
        switch (this.type){
            case 'top':
            case 'bottom':
                return (this.width+this.squareWidth)*this.height/2
            case 'left':
            case 'right':
                return (this.height+this.squareWidth)*this.width/2
        }
    }

    environment() {
        let edge=0;
        switch (this.type){
            case 'top':
            case 'bottom':
                edge=Math.sqrt((this.width-this.squareWidth) ** 2/4 + this.height ** 2);
                return this.width+2*edge+this.squareWidth;
            case 'left':
            case 'right':
                edge=Math.sqrt((this.height-this.squareWidth) ** 2/4 + this.width ** 2);
                return this.height+2*edge+this.squareWidth;
        }
    }
}
