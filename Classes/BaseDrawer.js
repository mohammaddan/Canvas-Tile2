export default class BaseDrawer {
    constructor(ctx, width, height, xOffset = 0, yOffset = 0) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.primitives = [];
        this.rows = [{height: yOffset, points: new Set([0.0])}];
        this.row = this.x = this.y = 0;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }

    removeAnyPointsOnShape(shape) {
        let x0 = shape.points[0].x
        let y0 = shape.points[0].y
        // console.log(this.rows,x0,y0,shape)
        this.rows.forEach((row) => {
            for (let x of row.points) {
                if ((x >= x0 && x < x0 + shape.width && Math.abs(y0 - row.height) < 0.1) ||
                    (x === x0 && row.height >= y0 && row.height < y0 + shape.height))
                    row.points.delete(x);
            }
        });
    }

    isInTheShape(primitive, x, y) {
        let sz = primitive.points.length;
        for (let i = 0; i < sz; i++) {
            if (this.primitives.some((s) => s.isInside({
                x: primitive.points[i].x + x,
                y: primitive.points[i].y + y
            }))) return true;
        }
        return false;
    }

    hasSubscription(s1, x, y) {
        return (this.primitives.some((s2) =>
            Math.max(0, Math.min(s1.points[2].x + x, s2.points[2].x) - Math.max(s1.points[0].x + x, s2.points[0].x)) *
            Math.max(0, Math.min(s1.points[2].y + y, s2.points[2].y) - Math.max(s1.points[0].y + y, s2.points[0].y))>0.001
        ))
    }

    isOnTheShape(x, y) {
        let sz = this.primitives.length;
        for (let i = 0; i < sz - 1; i++) {
            if (this.primitives[i].points.some((p) => Math.abs(p.x - x) < 0.0000001 && Math.abs(p.y - y) < 0.0000001)) return true;
        }
        return false;
    }

    addPointInRows(point, offsetX = 0.0, addZeroX = true) {
        let nextRow = this.rows.find((r) => r.height === point.y);
        if (!nextRow) {
            this.rows.push({height: point.y, points: new Set(addZeroX ? [offsetX] : [])});
            nextRow = this.rows[this.rows.length - 1];
            this.rows = this.rows.sort((a, b) => a.height - b.height);
        }
        if (offsetX !== point.x) nextRow.points.add(point.x);
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
            this.rows[0].points.forEach((q) => {
                isNaN(q) ? this.rows[0].points.delete(q) : "";
            });
            if (this.rows[0].points.size === 0) {
                this.rows = this.rows.splice(1);
                if (this.rows.length === 0) return;
                y = this.rows[0].height;
            }
            x = [...this.rows[0].points].sort((a, b) => a - b)[0];
        }
        primitive.shiftXY(x, y);
        this.primitives.push(primitive);
        this.rows[0].points.delete(x);
        primitive.points.forEach((p, index) => {
            if (index && p.x >= 0 && p.y >= 0 && p.x < this.width && !this.isOnTheShape(p.x, p.y))
                this.addPointInRows(p, 0, primitive.points[0].x < 1);
        });
        this.removeAnyPointsOnShape(primitive)
        while (this.rows.length && this.rows[0].points.size === 0) {
            this.rows = this.rows.splice(1);
        }
        // this.drawLastShapeWithAllPoint();
    }

    addRect(primitive) {
        let xIndex = 0, yIndex = 0;
        let x = [...this.rows[yIndex].points].sort((a, b) => a - b)[xIndex];
        let y = this.rows[yIndex].height;
        while (x + primitive.width > this.width+.001 || y+primitive.height>this.height+.001 || this.hasSubscription(primitive, x, y)) {
            xIndex++;
            if (xIndex >= this.rows[yIndex].points.size) {
                yIndex++;
                xIndex = 0;
                if (yIndex >= this.rows.length) return false;
            }
            x = [...this.rows[yIndex].points].sort((a, b) => a - b)[xIndex];
            y = this.rows[yIndex].height;
            // console.log(xIndex,yIndex)
        }
        primitive.shiftXY(x, y);
        this.primitives.push(primitive);
        // this.rows[yIndex].points.delete(x);

        if(this.rows[yIndex].points.size===0)  this.rows.splice(yIndex)

        primitive.points.forEach((p, index) => {
            if (index && p.x >= 0 && p.y >= 0 && p.x < this.width && p.y<this.height)
                this.addPointInRows(p, 0);
        });
        // this.drawLastShapeWithAllPoint();
        return true;
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
        this.ctx.strokeRect(2, 2, this.width, this.height);
        this.drawAll();

        this.rows.forEach((row) => {
            for (let x of row.points) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "#ff0000";
                this.ctx.arc(x + 2, row.height + 2, 3, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        });
        this.ctx.strokeStyle = "#000000";
    }

    drawAll(color='white',scale=1) {
        // this.ctx.imageSmoothingEnabled = true;
        // console.log(this.shapes);
        // this.ctx.strokeStyle='#000000aa';
        this.ctx.clearRect(0, 0, this.width*scale + 4, this.height*scale + 4);
        // this.ctx.strokeRect(50, 50, this.width, this.height);

        this.primitives.forEach((shape) => shape.draw(this.ctx,color,scale));
        // this.ctx.translate(0.5, 0.5);
    }
}
