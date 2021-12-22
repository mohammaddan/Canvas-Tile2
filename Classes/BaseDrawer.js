export default class BaseDrawer {
    constructor(ctx, width, height, xOffset = 0, yOffset = 0) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.primitives = [];
        this.rows = [{ height: yOffset, points: new Set([0]) }];
        this.row = this.x = this.y = 0;
        this.xOffset = xOffset;
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
            if (this.primitives[i].points.some(p => Math.abs(p.x - x) < .0000001 && Math.abs(p.y - y) < .0000001)) return true
        }
        return false
    }

    addPointInRows(point, offsetX = 0) {
        let nextRow = this.rows.find(r => r.height === point.y)
        if (!nextRow) {
            this.rows.push({ height: point.y, points: new Set([offsetX]) });
            nextRow = this.rows[this.rows.length - 1];
            this.rows = this.rows.sort((a, b) => a.height - b.height)
        }
        if (offsetX !== point.x) nextRow.points.add(point.x)
    }

    addShape(primitive) {
        // console.log([...this.rows])
        let x = [...this.rows[0].points].sort((a, b) => a - b)[0];
        let y = this.rows[0].height;
        this.rows[0].points.forEach((q) => {
            isNaN(q) ? this.rows[0].points.delete(q) : "";
        });
        while (x + primitive.width > this.width || this.isInTheShape(primitive, x, y)) {
            // console.log(x,y,this.isInTheShape(primitive, x, y),primitive);
            this.rows[0].points.delete(x);
            this.rows[0].points.forEach((q) => { isNaN(q) ? this.rows[0].points.delete(q) : ""; });
            if (this.rows[0].points.size === 0) {
                this.rows = this.rows.splice(1);
                // if(this.rows.length===0) return ;
                y = this.rows[0].height;
            }
            x = [...this.rows[0].points].sort((a, b) => a - b)[0];
        }
        primitive.shiftXY(x, y);
        this.primitives.push(primitive);
        this.rows[0].points.delete(x);
        primitive.points.forEach((p, index) => {
            if (index && (p.x >= 0) &&
                (p.y >= 0) && (p.x < this.width) && !this.isOnTheShape(p.x, p.y))
                this.addPointInRows(p)
        })
        while (this.rows.length && this.rows[0].points.size === 0) {
            this.rows = this.rows.splice(1);
        }
        // if (this.rows[0].points.size === 0) this.rows = this.rows.splice(1);
        // if (this.rows[0].points.size === 0) this.rows = this.rows.splice(1);
        // console.log(this.rows)
        this.drawLastShapeWithAllPoint();
    }

    addOneShapeAt(x, y, primitive) {
        primitive.shiftXY(x, y);
        this.primitives.push(primitive);
    }

    addOneRowOfShapes(x, y, primitive, countX) {
        for (let i = 0; i < countX; i++) {
            let temp = primitive.clone();
            temp.shiftXY(x, y);
            this.primitives.push(temp);
            x += temp.width;
        }
        // this.addPointInRows({ x: x, y: y }, x);
        // this.addPointInRows({ x: 0, y: y + primitive.height });
        // let r0 = this.rows.findIndex(r => r.height === 0);
        // if (r0 >= 0) this.rows = this.rows.splice(1);
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
        this.ctx.clearRect(0, 0, this.width + 100, this.height + 100);
        this.ctx.strokeRect(50, 50, this.width, this.height);

        this.primitives.forEach(shape => shape.draw(this.ctx))
            // this.ctx.translate(0.5, 0.5);
    }
}
