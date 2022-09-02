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
            white:['#f8f3f3','#dcd4d4','#ccc','#fafafa'],
            smoky:['#c8c3c3','#a7a1a1','#767877','#b9b9b9'],
            blue:['#b5c0da','#9eb3d1','#6e87c1','#8cacd8'],
            gold:['#f4f1d8','#f3e483','#d7cd46','#e6e652'],
            boronze:['#efc6a6','#d5c097','#be9a57','#ccaa7a'],
            mesi:['#e5ccb8','#d8b9a5','#f4a174','#ed9b60'],
            rozgold:['#f8e8df','#ffd7be','#ffd79b','#fbc87d'],
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

    draw(ctx,color='white',scale=1) {
        ctx.beginPath();
        ctx.strokeStyle = this.colors[color][1];
        ctx.fillStyle = this.colors[color][0]
        // ctx.setLineDash([3,3]);
        let fp = this.points[0];
        ctx.moveTo(Math.floor(fp.x*scale) + 2.5, Math.floor(fp.y*scale) + 2.5);
        this.points.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x*scale) + 2.5, Math.floor(p.y*scale) + 2.5);
        });
        ctx.closePath();
        // ctx.fill();
        // ctx.arc(fp.x+2.5,fp.y+2.5, 5, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        let my_gradient = ctx.createLinearGradient(0, 0, 200*scale, 400*scale);
        my_gradient.addColorStop(0, this.colors[color][2]);
        my_gradient.addColorStop(0.3,  this.colors[color][3]);
        my_gradient.addColorStop(0.5,  this.colors[color][2]);
        my_gradient.addColorStop(0.7,  this.colors[color][3]);
        my_gradient.addColorStop(1,  this.colors[color][2]);
        ctx.fillStyle = my_gradient;
        ctx.lineWidth = 1; // this.lineWidth;
        ctx.setLineDash([]);
        ctx.strokeStyle = this.colors[color][0];//'#ddd';
        fp = this.drawablePoints[0];
        ctx.moveTo(Math.floor(fp.x*scale) + 2.5, Math.floor(fp.y*scale) + 2.5);
        this.drawablePoints.slice(1).forEach(p => {
            ctx.lineTo(Math.floor(p.x*scale) + 2.5, Math.floor(p.y*scale) + 2.5);
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
        let scale= ((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))>1000000 ? 10 : 1
        dx=dx*scale
        dy=dy*scale
        let t = Math.atan((x2 - x1) / (y2 - y1));
        ctx.strokeStyle = "#faa";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + dx * 1.1*scale, y1 + dy * 1.1*scale);
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 + dx * 1.1*scale, y2 + dy * 1.1*scale);
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(x2 + dx, y2 + dy);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = "#f00";
        ctx.fillStyle = "#f00";
        ctx.beginPath();
        ctx.lineTo(x2 + dx + 5 *scale* Math.cos(t + Math.PI / 4), y2 + dy - 5 *scale* Math.sin(t + Math.PI / 4));
        ctx.lineTo(x2 + dx + 5 *scale* Math.cos(t + (3 * Math.PI) / 4), y2 + dy - 5 *scale* Math.sin(t + (3 * Math.PI) / 4));
        ctx.lineTo(x2 + dx, y2 + dy);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(x1 + dx - 5 *scale* Math.cos(t + Math.PI / 4), y1 + dy + 5 *scale* Math.sin(t + Math.PI / 4));
        ctx.lineTo(x1 + dx - 5 *scale* Math.cos(t + (3 * Math.PI) / 4), y1 + dy + 5 *scale* Math.sin(t + (3 * Math.PI) / 4));
        ctx.lineTo(x1 + dx, y1 + dy);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.font=(10*scale)+'px arial'
        let text=typeof label == "number" ? label.toFixed(1) : label
        let temp=ctx.measureText(text)
        ctx.fillStyle = "#fff";
        ctx.fillRect((x1 + x2-temp.width) / 2 + dx-2, (y1 + y2-temp.actualBoundingBoxAscent) / 2 + dy-2 ,temp.width+4,temp.actualBoundingBoxAscent+4)
        ctx.fillStyle = "#f00";
        ctx.fillText(text, (x1 + x2-temp.width) / 2 + dx , (y1 + y2+temp.actualBoundingBoxAscent) / 2 + dy );
    }
}
