import Primitive from "../Primitive.js";

export default class Spear extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.h1 = width / 2;
        this.h2 = height - 2 * this.h1;
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width / 2, y: -this.h1 });
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width, y: this.h2 });
        this.points.push({ x: width / 2, y: this.h1 + this.h2 });
        this.points.push({ x: 0, y: this.h2 });

        this.drawablePoints.push({ x: padding, y: padding });
        this.drawablePoints.push({ x: width / 2, y: -this.h1 + 2 * padding });
        this.drawablePoints.push({ x: width - padding, y: padding });
        this.drawablePoints.push({ x: width - padding, y: this.h2 - padding });
        this.drawablePoints.push({ x: width / 2, y: this.h1 + this.h2 - 2 * padding });
        this.drawablePoints.push({ x: padding, y: this.h2 - padding });
    }

    clone() {
        return new Spear(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * this.h1 + this.width * this.h2;
    }

    environment() {
        let edge = Math.sqrt((this.width / 2) ** 2 + this.h1 ** 2);
        return edge * 4 + 2 * this.h2;
    }


    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let raio = this.width / this.height;
        let t = Math.sqrt(this.width ** 2 + (this.height / 2) ** 2)
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * raio) })
        })
        this.measureLine(ctx, points[0].x, points[1].y, points[2].x, points[1].y, 0, -10, this.width)
        this.measureLine(ctx, points[0].x, points[1].y, points[0].x, points[0].y, -20, 0, this.h1)
        this.measureLine(ctx, points[0].x, points[0].y, points[5].x, points[5].y, -20, 0, this.height - this.h1 * 2)
        this.measureLine(ctx, points[1].x, points[1].y, points[4].x, points[4].y, size / 2 + 10, 0, this.height)
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
        ctx.fillText('n=' + n, points[0].x + size / 4, (points[0].y + points[5].y) / 2 - 5)
    }
}