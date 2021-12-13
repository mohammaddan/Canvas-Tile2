export default class BaseDrawer {
    constructor(ctx, width, height, xOffet = 0, yOffset = 0) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.primitives = [];
        this.rows = [{ height: 0, points: new Set([0]) }];
        this.row = this.x = this.y = 0;
        this.xOffet = xOffet;
        this.yOffset = yOffset;
    }

    isInTheShape(primitive, x, y) {
        let sz = primitive.points.length;
        for (let i = 0; i < sz; i++) {
            if (this.primitives.some((s) => s.isInside({ x: primitive.points[i].x + x, y: primitive.points[i].y + y })))
                return true;
        }
        return false;
    }

    isOnTheShape(x, y) {
        let sz = this.primitives.length;
        for (let i = 0; i < sz - 1; i++) {
            if (this.primitives[i].points.some(p => p.x === x && p.y === y)) return true
        }
        return false
    }

    addPointInRows(point, offsetX = 0) {
        let nextRow = this.rows.find(r => r.height == point.y)
        if (nextRow == null) {
            this.rows.push({ height: point.y, points: new Set([this.xOffet]) });
            nextRow = this.rows[this.rows.length - 1];
            this.rows = this.rows.sort((a, b) => a.height - b.height)
        }
        nextRow.points.add(point.x)
    }

    addShape(primitive) {
        let x = [...this.rows[0].points].sort((a, b) => a - b)[0];
        let y = this.rows[0].height;
        this.rows[0].points.forEach((q) => {
            isNaN(q) ? this.rows[0].points.delete(q) : "";
        });
        while (x + primitive.points[0].x > this.width || this.isInTheShape(primitive, x, y)) {
            this.rows[0].points.delete(x);
            this.rows[0].points.forEach((q) => { isNaN(q) ? this.rows[0].points.delete(q) : ""; });
            if (this.rows[0].points.size === 0) {
                this.rows = this.rows.splice(1);
                y = this.rows[0].height;
            }
            x = [...this.rows[0].points].sort((a, b) => a - b)[0];
        }
        primitive.shiftXY(x, y);
        this.primitives.push(primitive);
        this.rows[0].points.delete(x);
        primitive.points.forEach((p, index) => {
            if (index && (p.x >= -primitive.width / 2) &&
                (p.y >= 0) && (p.x < this.width) && !this.isOnTheShape(p.x, p.y))
                this.addPointInRows(p)
        })
        if (this.rows[0].points.size === 0) this.rows = this.rows.splice(1);
        if (this.rows[0].points.size === 0) this.rows = this.rows.splice(1);
        // console.log(this.rows)
        // this.drawLastShapeWithAllPoint();
    }

    drawLastShapeWithAllPoint() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.strokeRect(50, 50, this.width, this.height);
        this.drawAll();

        this.rows.forEach(row => {
            for (let x of row.points) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = '#ff0000';
                this.ctx.arc(x + 50, row.height + 50, 3, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        })
        this.ctx.strokeStyle = '#000000';
    }

    drawAll() {
        // this.ctx.imageSmoothingEnabled = true;
        // console.log(this.shapes);
        // this.ctx.strokeStyle='#000000aa';
        this.ctx.strokeRect(50, 50, this.width, this.height);

        this.primitives.forEach(shape => shape.draw(this.ctx))
            // this.ctx.translate(0.5, 0.5);
    }
}