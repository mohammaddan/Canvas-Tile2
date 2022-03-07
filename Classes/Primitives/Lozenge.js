import Primitive from "../Primitive.js";

export default class Lozenge extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width / 2, y: -height / 2 });
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width / 2, y: height / 2 });

        this.drawablePoints.push({ x: padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: padding - height / 2 });
        this.drawablePoints.push({ x: width - padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: height / 2 - padding });
    }

    clone() {
        return new Lozenge(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        // if (this.isInDrawerBound(drawerWidth, drawerHeight))
        return this.width * this.height / 2;
        // return this.width * this.height / 4;
    }

    environment() {
        let edge = Math.sqrt(this.width ^ 2 + this.height ^ 2);
        // if (this.isInDrawerBound(drawerWidth, drawerHeight))
        return edge * 4;

    }

    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let raio = this.width / this.height;
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * raio) })
        })
        this.measureLine(ctx, points[1].x, points[1].y, points[3].x, points[3].y, size / 2 + 10, 0, this.height)
        this.measureLine(ctx, points[0].x, points[0].y, points[2].x, points[2].y, 0, -(size / raio) / 2 - 10, this.width)
        this.measureLine(ctx, points[0].x, points[0].y, points[3].x, points[3].y, -size / 3, size / 3, Math.sqrt(this.width ** 2 + this.height ** 2).toFixed(1))
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
        ctx.fillText('n=' + n, points[0].x + size / 3, points[0].y + 3)
    }
}