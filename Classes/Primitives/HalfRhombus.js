import Primitive from "../Primitive.js";

export default class HalfRhombus extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1, type = 'left', angle = null) {
        super(width, height, padding, lineWidth);

        this.h1 = !angle ? width : Math.tan(Math.PI * angle / 180) * width;

        this.angle = angle;
        this.type = type;
        this.h2 = height - this.h1;
        if (type === 'left') {
            this.points.push({ x: 0, y: 0 });
            this.points.push({ x: width, y: 0 });
            this.points.push({ x: width, y: height });
            this.points.push({ x: 0, y: height - this.h1 });

            this.drawablePoints.push({ x: padding, y: padding });
            this.drawablePoints.push({ x: width - padding, y: this.h1 + padding });
            this.drawablePoints.push({ x: width - padding, y: height - padding });
            this.drawablePoints.push({ x: 0, y: height - this.h1 - padding });
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
        return new Rhombus(this.width, this.height, this.padding, this.lineWidth, this.type, this.angle);
    }

    area() {
        return this.h2 * this.width;
    }

    environment() {
        let edge = Math.sqrt((this.width / 2) ^ 2 + this.h1 ^ 2);
        return edge * 4 + 2 * this.h2;
    }


    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let raio = this.width / this.height;
        let t = Math.sqrt(this.width ** 2 + this.h1 ** 2)
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * raio) })
        })
        this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[1].y, 0, -15, this.width)
        this.measureLine(ctx, points[0].x, points[0].y, points[3].x, points[3].y, -20, 0, this.height - this.h1)
        this.measureLine(ctx, points[1].x, points[1].y, points[2].x, points[2].y, 20, 0, this.height)
        this.measureLine(ctx, points[2].x, points[2].y, points[3].x, points[3].y, -20, 20, t.toFixed(1))
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
        ctx.fillText('n=' + n, (points[0].x + points[1].x) / 2, points[3].y)
    }
}