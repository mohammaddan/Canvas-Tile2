import Primitive from "../Primitive.js";

export default class UpperSpear extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.h1 = this.width / 2;
        this.h2 = this.height - this.h1;
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width, y: this.h2 });
        this.points.push({ x: width / 2, y: height });
        this.points.push({ x: 0, y: this.h2 });

        this.drawablePoints.push({ x: padding, y: padding });
        this.drawablePoints.push({ x: width - padding, y: padding });
        this.drawablePoints.push({ x: width - padding, y: this.h2 });
        this.drawablePoints.push({ x: width / 2, y: height - padding });
        this.drawablePoints.push({ x: padding, y: this.h2 });
    }

    clone() {
        return new UpperSpear(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * (this.h1 / 2 + this.h2);
    }

    environment() {
        let edge = Math.sqrt((this.width / 2) ^ 2 + this.h1 ^ 2);
        return edge * 2 + this.width + 2 * this.h2;
    }

    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let raio = this.width / this.height;
        let t = Math.sqrt(2 * this.width ** 2)
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * raio) })
        })
        this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[1].y, 0, -10, this.width)
        this.measureLine(ctx, points[0].x, points[0].y, points[4].x, points[4].y, -20, 0, this.h1)
        this.measureLine(ctx, points[1].x, points[1].y, points[1].x, points[3].y, 15, 0, this.height)
        this.measureLine(ctx, points[4].x, points[4].y, points[3].x, points[3].y, -15, 15, t.toFixed(1))
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
        ctx.fillText('n=' + n, points[0].x + size / 4, (points[0].y + points[3].y) / 2 - 5)
    }
}