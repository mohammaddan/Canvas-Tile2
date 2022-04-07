import Primitive from "../Primitive.js";

export default class RotatedRhombus extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1,angle = -45, rotate = 0) {
        super(width, height, padding, lineWidth);
        let t0=Math.PI * angle / 180;
        this.t0=t0;
        let t01=Math.PI * (180-angle) / 180;
        let t1 = Math.PI * rotate / 180;
        let x=[0],y=[0];

        x.push(Math.cos(t0+t1)*height)
        y.push(Math.sin(t0+t1)*height)

        x.push(x[1]+width*Math.cos(t1))
        y.push(y[1]+width*Math.sin(t1))

        x.push(width*Math.cos(t1))
        y.push(width*Math.sin(t1))

        let x1=[padding*Math.cos(t1+t0/2)],y1=[padding*Math.sin(t1+t0/2)];

        x1.push(Math.cos(t0+t1)*height-padding*Math.cos(t1-t01/2))
        y1.push(Math.sin(t0+t1)*height-padding*Math.sin(t1-t01/2))

        x1.push(x[1]+width*Math.cos(t1)-padding*Math.cos( -t1-t0/2))
        y1.push(y[1]+width*Math.sin(t1)+padding*Math.sin(  -t1-t0/2))

        x1.push(width*Math.cos(t1)-padding*Math.cos(t1+t01/2+t0))
        y1.push(width*Math.sin(t1)-padding*Math.sin(t1+t01/2+t0))

        this.rotate = rotate;
        this.angle = angle;
        for(let i=0;i<4;i++){
            this.points.push({x: x[i], y: y[i]});
            this.drawablePoints.push({x: x1[i], y: y1[i]});
        }
        // this.points.push({x: 0, y: 0});
        // this.points.push({x: width, y: this.h1});
        // this.points.push({x: width, y: height});
        // this.points.push({x: 0, y: height - this.h1});

        // this.drawablePoints.push({x:x[0]+ padding, y: [0]+ padding});
        // this.drawablePoints.push({x: x[1] - padding, y: y[1]-padding});
        // this.drawablePoints.push({x: width - padding, y: height - 2 * padding});
        // this.drawablePoints.push({x: padding, y: height - this.h1});
    }

    clone() {
        return new RotatedRhombus(this.width, this.height, this.padding, this.lineWidth,  this.angle,this.rotate);
    }

    area() {
        return Math.abs(this.height*Math.sin(this.t0)) * this.width;
    }

    environment() {
        // let edge = Math.abs(this.height/Math.sin(this.t0))
        return this.height * 2 + 2 * this.width;
    }

    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let h1=Math.abs(this.height*Math.sin(this.t0))
        let points = [];
        let ratio = this.width / this.height;
        this.points.forEach(p => {
            points.push({x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * ratio)})
        })
        this.measureLine(ctx, points[0].x, points[0].y, points[0].x, points[1].y, -25, 0,h1)
        this.measureLine(ctx, points[0].x, points[0].y, points[3].x, points[3].y, 0, 20, this.width)
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
        ctx.fillText('n=' + n, points[0].x + size / 4, (points[0].y + points[2].y) / 2 - 5)
    }
}
