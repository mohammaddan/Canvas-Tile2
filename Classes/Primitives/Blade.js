import Primitive from "../Primitive.js";

export default class Blade extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1, type = 'left') {
        super(width, height, padding, lineWidth);
        this.h1 = width;
        this.h2 = height - 2 * this.h1;
        this.type = type
        if (type === 'left') {
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: this.h1 });
            this.points.push({ x: width, y: height - this.h1 });
            this.points.push({ x: 0, y: height });

            this.drawablePoints.push({ x: padding, y: padding * 2 });
            this.drawablePoints.push({ x: width - padding, y: this.h1 + padding * 0.5 });
            this.drawablePoints.push({ x: width - padding, y: height - this.h1 });
            this.drawablePoints.push({ x: padding, y: height - padding * 2 });

        } else {
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: -this.h1 });
            this.points.push({ x: width, y: height - this.h1 });
            this.points.push({ x: 0, y: height - 2 * this.h1 });

            this.drawablePoints.push({ x: padding, y: padding * 0.5 });
            this.drawablePoints.push({ x: width - padding, y: -this.h1 + 2 * padding });
            this.drawablePoints.push({ x: width - padding, y: height - this.h1 - 2 * padding });
            this.drawablePoints.push({ x: padding, y: height - 2 * this.h1 });
        }
    }

    clone() {
        return new Blade(this.width, this.height, this.padding, this.lineWidth, this.type);
    }

    area() {
        return this.width * this.h1 + this.width * this.h2;
    }

    environment() {
        let edge = Math.sqrt(this.width ** 2 + this.h1 ** 2);
        return edge * 2 + this.h2 + this.height;
    }


    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let raio = this.width / this.height;
        let t = Math.sqrt(this.width ** 2 + ((this.h1 - this.h2) / 2) ** 2)
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * raio) })
        })
        this.measureLine(ctx, points[0].x, points[0].y, points[3].x, points[3].y, -25, 0, this.height)
        this.measureLine(ctx, points[1].x, points[1].y, points[2].x, points[2].y, 25, 0, this.h2)
        this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[0].y, 0, -10, this.width)
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
        ctx.fillText('n=' + n, points[0].x + size / 5, (points[0].y + points[3].y) / 2 - 5)
    }
}