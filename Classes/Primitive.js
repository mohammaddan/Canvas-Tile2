export default class Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.lineWidth = lineWidth;
        this.points = [];
    }

    set_line_width(size) {
        this.lineWidth = size;
    }

    set_padding(padding) {
        this.padding = padding;
    }

    shiftXY(x, y) {
        this.points.forEach(p => {
            p.x += x;
            p.y += y;
        })
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.lineWidth = this.lineWidth;
        let fp = this.points[0];
        ctx.moveTo(fp.x + 50, fp.y + 50);
        this.points.slice(1).forEach(p => {
            ctx.lineTo(p.x + 50, p.y + 50);
        });
        ctx.lineTo(fp.x + 50, fp.y + 50);
        ctx.closePath();
        ctx.stroke();
    }

    isInside(p) {
        let res = 0;
        let size = this.points.length;
        for (let i = 0; i < size; i++) {
            res += this.isLeft(p, this.points[i], this.points[(i + 1) % size]) ? 1 : -1;
            // console.log("is left : " + this.isLeft(p, this.points[i], this.points[(i + 1) % size]));
        }
        return res === size;
    }

    isLeft(p, p1, p2) {
        return ((p2.x - p1.x) * (p.y - p1.y) - (p2.y - p1.y) * (p.x - p1.x)) > 0;
    }
}