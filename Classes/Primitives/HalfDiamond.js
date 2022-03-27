import Primitive from "../Primitive.js";

export default class HalfDiamond extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1,inverse= true) {
        super(width, height, padding, lineWidth);
        this.h1 = height/3;
        this.h2 = height-this.h1;
        this.inverse=inverse

        if(inverse){
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: this.h1 });
            this.points.push({ x: 0, y: this.height });

            this.drawablePoints.push({ x: padding, y: 2*padding });
            this.drawablePoints.push({ x: width-2*padding, y: this.h1 });
            this.drawablePoints.push({ x: padding, y: this.height-3*padding });
        }else{
            this.points.push({ x: width, y: 0 });
            this.points.push({ x: width, y: this.height });
            this.points.push({ x: 0, y: this.h1 });

            this.drawablePoints.push({ x: this.width-padding, y: 2*padding });
            this.drawablePoints.push({ x: width-padding, y: this.height-3*padding });
            this.drawablePoints.push({ x: 2*padding, y: this.h1 });
        }
    }

    clone() {
        return new HalfDiamond(this.width, this.height, this.padding, this.lineWidth,this.inverse);
    }

    area() {
        return this.width * this.height / 2;
    }

    environment() {
        let edge1 = Math.sqrt((this.width/2) ** 2 + this.h1 ** 2);
        let edge2 = Math.sqrt((this.width/2) ** 2 + this.h2 ** 2);
        return edge1+edge2+this.height;
    }
}
