import Primitive from "../Primitive.js";

export default class Blade extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1,type='top-left') {
        super(width, height, padding, lineWidth);
        this.h1=width;
        this.h2=height-2*this.h1;
        if(type==='top-left'){
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: 0 });
            this.points.push({ x: width, y: height-this.h1 });
            this.points.push({ x: 0, y: height });

            this.drawablePoints.push({ x: padding, y: padding });
            this.drawablePoints.push({ x: width-padding, y: padding});
            this.drawablePoints.push({ x: width-padding, y: height-this.h1 });
            this.drawablePoints.push({ x: padding, y: height-padding*2 });

        }else if(type==='top-right'){
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y:0 });
            this.points.push({ x: width, y: height });
            this.points.push({ x: 0, y: height-this.h1 });

            this.drawablePoints.push({ x: padding, y: padding});
            this.drawablePoints.push({ x: width-padding, y: padding});
            this.drawablePoints.push({ x: width-padding, y: height-2*padding});
            this.drawablePoints.push({ x: padding, y: height-this.h1 });
        }else if(type==='bottom-left'){
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: this.h1 });
            this.points.push({ x: width, y: height });
            this.points.push({ x: 0, y: height });

            this.drawablePoints.push({ x: padding, y: padding*2 });
            this.drawablePoints.push({ x: width-padding, y: this.h1 });
            this.drawablePoints.push({ x: width-padding, y: height-padding });
            this.drawablePoints.push({ x: padding, y: height-padding });
        }else if(type==='bottom-right'){
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: -this.h1 });
            this.points.push({ x: width, y: height-this.h1 });
            this.points.push({ x: 0, y: height-this.h1 });

            this.drawablePoints.push({ x: padding, y: 0 });
            this.drawablePoints.push({ x: width-padding, y: 2*padding-this.h1 });
            this.drawablePoints.push({ x: width-padding, y: height-this.h1-padding });
            this.drawablePoints.push({ x: padding, y: height-this.h1-padding });
        }
    }

    clone() {
        return new Blade(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * this.h1+this.width*this.h2;
    }

    environment() {
        let edge = Math.sqrt((this.width/2) ^ 2 + this.h1 ^ 2);
        return edge * 4+2*this.h2;

    }
}
