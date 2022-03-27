export default class Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.lineWidth = lineWidth;
        this.drawablePoints = [];
        this.points = [];
        this.offsetX = 0;
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
        this.drawablePoints.forEach(p => {
            p.x += x;
            p.y += y;
        })
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.strokeStyle = '#bbb';
        ctx.fillStyle = '#eee'
            // ctx.setLineDash([3,3]);
        let fp = this.points[0];
        ctx.moveTo(Math.floor(fp.x) + 2.5, Math.floor(fp.y) + 2.5);
        this.points.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x) + 2.5, Math.floor(p.y) + 2.5);
        });
        ctx.closePath();
        // ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        let my_gradient = ctx.createLinearGradient(0, 0, 200, 400);
        my_gradient.addColorStop(0, "#ccc");
        my_gradient.addColorStop(0.3, "#fafafa");
        my_gradient.addColorStop(0.5, "#ccc");
        my_gradient.addColorStop(0.7, "#fafafa");
        my_gradient.addColorStop(1, "#ddd");
        ctx.fillStyle = my_gradient;
        ctx.lineWidth = 1; // this.lineWidth;
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ccc';
        fp = this.drawablePoints[0];
        ctx.moveTo(Math.floor(fp.x) + 2.5, Math.floor(fp.y) + 2.5);
        this.drawablePoints.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x) + 2.5, Math.floor(p.y) + 2.5);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }

    isInside(p) {
        let size = this.points.length;
        for (let i = 0; i < size; i++) {
            if (Math.abs(p.x - this.points[i].x) < .00000001 && Math.abs(p.y - this.points[i].y) < .00000001) return false;
            if (!this.isLeft(p, this.points[i], this.points[(i + 1) % size])) return false;
        }
        return true;
    }

    isLeft(p, p1, p2) {
        return (p2.x - p1.x) * (p.y - p1.y) - (p2.y - p1.y) * (p.x - p1.x) > 0;
    }

    isInDrawerBound(width, height) {
        return !this.points.some(p => p.x < 0 || p.x > width || p.y < 0 || p.y > height);
    }

    measureLine(ctx, x1, y1, x2, y2, dx, dy, label) {
        let t = Math.atan((x2 - x1) / (y2 - y1));
        ctx.strokeStyle = '#fcc';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + dx * 1.1, y1 + dy * 1.1)
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 + dx * 1.1, y2 + dy * 1.1)
        ctx.moveTo(x1 + dx, y1 + dy)
        ctx.lineTo(x2 + dx, y2 + dy)
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = '#f00';
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.lineTo(x2 + dx + 5 * Math.cos(t + Math.PI / 4), y2 + dy - 5 * Math.sin(t + Math.PI / 4))
        ctx.lineTo(x2 + dx + 5 * Math.cos(t + 3 * Math.PI / 4), y2 + dy - 5 * Math.sin(t + 3 * Math.PI / 4))
        ctx.lineTo(x2 + dx, y2 + dy)
        ctx.closePath();
        ctx.stroke();
        ctx.fill()
        ctx.beginPath();
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(x1 + dx - 5 * Math.cos(t + Math.PI / 4), y1 + dy + 5 * Math.sin(t + Math.PI / 4))
        ctx.lineTo(x1 + dx - 5 * Math.cos(t + 3 * Math.PI / 4), y1 + dy + 5 * Math.sin(t + 3 * Math.PI / 4))
        ctx.lineTo(x1 + dx, y1 + dy)
        ctx.closePath();
        ctx.stroke();
        ctx.fill()
        ctx.fillText(typeof(label) == 'number' ? label.toFixed(1) : label, (x1 + x2) / 2 + dx * 1.1, (y1 + y2) / 2 + dy * 1.1);
    }
}
