import Primitive from "../Primitive.js";

export default class LeftTriangle extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width, y: height / 2 });
        this.points.push({ x: 0, y: height });

        this.drawablePoints.push({ x: padding, y: 2 * padding });
        this.drawablePoints.push({ x: width - padding, y: height / 2 });
        this.drawablePoints.push({ x: padding, y: height - 2 * padding });

    }

    clone() {
        return new LeftTriangle(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        return this.width * this.height / 2;
    }

    environment() {
        let edge = Math.sqrt((this.height / 2) ^ 2 + this.width ^ 2);
        return edge * 2 + this.height;
    }

    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let raio = this.width / this.height;
        let t = Math.sqrt(this.width ** 2 + (this.height / 2) ** 2)
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * raio) })
        })
        this.measureLine(ctx, points[0].x, points[0].y, points[2].x, points[2].y, -20, 0, this.height)
        this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[0].y, 0, -10, this.width)
        this.measureLine(ctx, points[1].x, points[1].y, points[2].x, points[2].y, 10, 10 * raio, t.toFixed(1))
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