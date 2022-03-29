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

    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let ratio = this.width / this.height;
        let t=Math.sqrt(this.width ** 2 + this.h1 ** 2);
        let t1=Math.sqrt(this.width ** 2 + this.h2 ** 2);
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * ratio) })
        })
        this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[1].y, 10, -10 , t.toFixed(1))
        this.measureLine(ctx, points[0].x, points[0].y, points[2].x, points[2].y, -20, 0 , this.height)
        this.measureLine(ctx, points[1].x, points[1].y, points[2].x, points[2].y, 10, 10 , t1.toFixed(1))
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        let fp = points[0];
        ctx.moveTo(Math.floor(fp.x), Math.floor(fp.y));
        points.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x), Math.floor(p.y));
        });
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = '#555';
        ctx.fillText('n=' + n, points[0].x +10, points[1].y + 3)
    }
}
