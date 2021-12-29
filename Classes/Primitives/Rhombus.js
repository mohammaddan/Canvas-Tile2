import Primitive from "../Primitive.js";

export default class Rhombus extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1,type='left',angle=null) {
        super(width, height, padding, lineWidth);
        console.log(width,height,type);
        if(!angle){
            this.h1=width;
        }else{
            this.h1=Math.tan(Math.PI * angle/180)*width;
        }
        this.angle=angle;
        this.type=type;
        this.h2=height-this.h1;
        if(type==='left'){
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: this.h1 });
            this.points.push({ x: width, y: height });
            this.points.push({ x: 0, y: height-this.h1 });

            this.drawablePoints.push({ x: padding, y: 2*padding });
            this.drawablePoints.push({ x: width-padding, y: this.h1 });
            this.drawablePoints.push({ x: width-padding, y: height-2*padding });
            this.drawablePoints.push({ x: padding, y: height-this.h1});
        }else{
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: -this.h1 });
            this.points.push({ x: width, y: height-this.h1 });
            this.points.push({ x: 0, y: height-2*this.h1 });

            this.drawablePoints.push({ x: padding, y: padding*0.5});
            this.drawablePoints.push({ x: width-padding, y: -this.h1 +2*padding});
            this.drawablePoints.push({ x: width-padding, y: height-this.h1 -2*padding});
            this.drawablePoints.push({ x: padding, y: height-2*this.h1 });
        }
    }

    clone() {
        return new Rhombus(this.width, this.height, this.padding, this.lineWidth,this.type,this.angle);
    }

    area() {
        return this.h2*this.width;
    }

    environment() {
        let edge = Math.sqrt((this.width/2) ^ 2 + this.h1 ^ 2);
        return edge * 4+2*this.h2;

    }
}
