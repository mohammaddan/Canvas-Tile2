export default class Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.lineWidth = lineWidth;
        this.drawablePoints = [];
        this.points = [];
        this.offsetX = 0;

        this.colors={
            white:['#bbb','#aaa','#ccc','#fafafa'],
            smoky:['#9d9d9d','#aaa','#767877','#9e9e9f'],
            blue:['#6F83B3','#7f9abf','#566FA8','#7f9abf'],
            gold:['#c8b848','#d0c055','#CBBE58','#D8Ca73'],
            boronze:['#ad9988','#bba598','#B49485','#BfA59a'],
            mesi:['#bf9473','#c4ad70','#8a6a41','#aD8F77'],
            rozgold:['#cfb2a4','#DBBBAE','#D6B0A3','#e9c8bd'],
        }
    }

    set_line_width(size) {
        this.lineWidth = size;
    }

    set_padding(padding) {
        this.padding = padding;
    }

    shiftXY(x, y) {
        this.points.forEach((p) => {
            p.x += x;
            p.y += y;
        });
        this.drawablePoints.forEach((p) => {
            p.x += x;
            p.y += y;
        });
    }

    moveToCenter(width,height){
        let x0=Math.min(...this.points.map(p=>p.x))
        let x1=Math.max(...this.points.map(p=>p.x))
        let y0=Math.min(...this.points.map(p=>p.y))
        let y1=Math.max(...this.points.map(p=>p.y))
        let deltaX=(width - (x0+x1))/2;
        let deltaY=(height - (y0+y1))/2;
        this.points.forEach(p=> {
            p.x+=deltaX;
            p.y+=deltaY;
        })
        this.drawablePoints.forEach(p=> {
            p.x+=deltaX;
            p.y+=deltaY;
        })
    }

    draw(ctx,color='white') {
        ctx.beginPath();
        ctx.strokeStyle = this.colors[color][1];
        ctx.fillStyle = this.colors[color][0]
        // ctx.setLineDash([3,3]);
        let fp = this.points[0];
        ctx.moveTo(Math.floor(fp.x) + 2.5, Math.floor(fp.y) + 2.5);
        this.points.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x) + 2.5, Math.floor(p.y) + 2.5);
        });
        ctx.closePath();
        // ctx.fill();
        // ctx.arc(fp.x+2.5,fp.y+2.5, 5, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        let my_gradient = ctx.createLinearGradient(0, 0, 200, 400);
        my_gradient.addColorStop(0, this.colors[color][2]);
        my_gradient.addColorStop(0.3,  this.colors[color][3]);
        my_gradient.addColorStop(0.5,  this.colors[color][2]);
        my_gradient.addColorStop(0.7,  this.colors[color][3]);
        my_gradient.addColorStop(1,  this.colors[color][2]);
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

    drawDXF(dxf) {
        let fp = this.points[0];
        this.points.slice(1).forEach(p => {
            dxf.drawLine(fp.x, fp.y, p.x, p.y);
            fp = p;
        });
        dxf.drawLine(fp.x, fp.y, this.points[0].x, this.points[0].y);
    }

    isInside(p) {
        let size = this.points.length;
        for (let i = 0; i < size; i++) {
            if (Math.abs(p.x - this.points[i].x) < 0.00000001 && Math.abs(p.y - this.points[i].y) < 0.00000001) return false;
            if (!this.isLeft(p, this.points[i], this.points[(i + 1) % size])) return false;
        }
        return true;
    }

    isLeft(p, p1, p2) {
        return (p2.x - p1.x) * (p.y - p1.y) - (p2.y - p1.y) * (p.x - p1.x) > 0;
    }

    isInDrawerBound(width, height) {
        return !this.points.some((p) => p.x < 0 || p.x > width || p.y < 0 || p.y > height);
    }

    measureLine(ctx, x1, y1, x2, y2, dx, dy, label) {
        let t = Math.atan((x2 - x1) / (y2 - y1));
        ctx.strokeStyle = "#fcc";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + dx * 1.1, y1 + dy * 1.1);
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 + dx * 1.1, y2 + dy * 1.1);
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(x2 + dx, y2 + dy);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = "#f00";
        ctx.fillStyle = "#f00";
        ctx.beginPath();
        ctx.lineTo(x2 + dx + 5 * Math.cos(t + Math.PI / 4), y2 + dy - 5 * Math.sin(t + Math.PI / 4));
        ctx.lineTo(x2 + dx + 5 * Math.cos(t + (3 * Math.PI) / 4), y2 + dy - 5 * Math.sin(t + (3 * Math.PI) / 4));
        ctx.lineTo(x2 + dx, y2 + dy);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(x1 + dx - 5 * Math.cos(t + Math.PI / 4), y1 + dy + 5 * Math.sin(t + Math.PI / 4));
        ctx.lineTo(x1 + dx - 5 * Math.cos(t + (3 * Math.PI) / 4), y1 + dy + 5 * Math.sin(t + (3 * Math.PI) / 4));
        ctx.lineTo(x1 + dx, y1 + dy);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.fillText(typeof label == "number" ? label.toFixed(1) : label, (x1 + x2) / 2 + dx * 1.1, (y1 + y2) / 2 + dy * 1.1);
    }
}
