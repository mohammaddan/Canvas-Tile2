import Primitive from "../Primitive.js";

export default class HalfCutedLozenge extends Primitive {
    constructor(width, height, squareWidth = 20, padding = 0, lineWidth = 1, type = 'top') {
        super(width, height, padding, lineWidth);
        this.type = type;
        this.squareWidth = squareWidth;
        this.w1 = this.h1 = squareWidth / 2; //jewelHeight
        this.h2 = height / 2 - this.h1;
        this.w2 = width / 2 - this.w1;
        switch (type) {
            case 'top':
                this.points.push({ x: 0, y: 0 });
                this.points.push({ x: this.w2, y: height });
                this.points.push({ x: this.w2 + this.w1*2, y: height });
                this.points.push({ x: width, y: 0 });

                this.drawablePoints.push({ x: 2 * padding, y: padding });
                this.drawablePoints.push({ x: this.w2, y: height - padding });
                this.drawablePoints.push({ x: this.w2 + this.w1 *2, y: height - padding });
                this.drawablePoints.push({ x: width - 2 * padding, y: padding });
                break;
            case 'bottom':
                this.points.push({ x: this.w2, y: 0 });
                this.points.push({ x: this.w2 + squareWidth, y: 0 });
                this.points.push({ x: this.width, y: height });
                this.points.push({ x: 0, y: height });

                this.drawablePoints.push({ x: this.w2, y: padding });
                this.drawablePoints.push({ x: this.w2 + squareWidth, y: padding });
                this.drawablePoints.push({ x: this.width - 2 * padding, y: height - padding });
                this.drawablePoints.push({ x: 2 * padding, y: height - padding });
                break;
            case 'left':
                this.points.push({ x: 0, y: 0 });
                this.points.push({ x: width, y: this.h2 });
                this.points.push({ x: width, y: this.h2 + this.h1 * 2 });
                this.points.push({ x: 0, y: height });

                this.drawablePoints.push({ x: padding, y: padding * 2 });
                this.drawablePoints.push({ x: width - padding, y: this.h2 });
                this.drawablePoints.push({ x: width - padding, y: this.h2 + this.h1 * 2 });
                this.drawablePoints.push({ x: padding, y: height - padding * 2 });
                break;
            case 'left-invert':
                this.points.push({ x: 0, y: 0 });
                this.points.push({ x: squareWidth/2, y:0});
                this.points.push({ x: width, y: height/2 });
                this.points.push({ x: squareWidth/2, y: height });
                this.points.push({ x: 0, y: height });

                this.drawablePoints.push({ x: padding, y: padding });
                this.drawablePoints.push({ x: squareWidth/2-padding, y:padding});
                this.drawablePoints.push({ x: width-padding, y: height/2 });
                this.drawablePoints.push({ x: squareWidth/2-padding, y: height -padding});
                this.drawablePoints.push({ x: padding, y: height -padding});
                break;
            case 'right':
                this.points.push({ x: width, y: 0 });
                this.points.push({ x: width, y: height });
                this.points.push({ x: 0, y: this.h2 + this.h1 * 2 });
                this.points.push({ x: 0, y: this.h2 });

                this.drawablePoints.push({ x: width - padding, y: 2 * padding });
                this.drawablePoints.push({ x: width - padding, y: height - 2 * padding });
                this.drawablePoints.push({ x: padding, y: this.h2 + this.h1 * 2 });
                this.drawablePoints.push({ x: padding, y: this.h2 });
                break;
            case 'right-invert':
                this.points.push({ x: width-squareWidth/2, y: 0 });
                this.points.push({ x: width, y: 0 });
                this.points.push({ x: width, y: height });
                this.points.push({ x: width-squareWidth/2, y: height });
                this.points.push({ x: 0, y: height/2 });

                this.drawablePoints.push({ x: width-squareWidth/2+padding, y: padding });
                this.drawablePoints.push({ x: width-padding, y: padding });
                this.drawablePoints.push({ x: width-padding, y: height -padding});
                this.drawablePoints.push({ x: width-squareWidth/2+padding, y: height -padding});
                this.drawablePoints.push({ x: padding, y: height/2 });
        }
    }

    clone() {
        return new HalfCutedLozenge(this.width, this.height, this.squareWidth, this.padding, this.lineWidth, this.type);
    }

    area() {
        switch (this.type) {
            case 'top':
            case 'bottom':
                return (this.width + this.squareWidth) * this.height / 2
            case 'left':
            case 'right':
                return (this.height + this.squareWidth) * this.width / 2
            case 'left-invert':
            case 'right-invert':
                return this.squareWidth/2*this.height+this.height*(this.width-this.squareWidth/2)/2
        }
    }

    environment() {
        let edge = 0;
        switch (this.type) {
            case 'top':
            case 'bottom':
                edge = Math.sqrt((this.width - this.squareWidth) ** 2 / 4 + this.height ** 2);
                return this.width + 2 * edge + this.squareWidth;
            case 'left':
            case 'right':
                edge = Math.sqrt((this.height - this.squareWidth) ** 2 / 4 + this.width ** 2);
                return this.height + 2 * edge + this.squareWidth;
            case 'left-invert':
            case 'right-invert':
                edge = Math.sqrt((this.width - this.squareWidth/2) ** 2 / 4 + this.height ** 2/4);
                return edge*2+this.height+this.squareWidth;
        }
    }


    drawMeasures(ctx, offsetX, offsetY, n, size) {
        let points = [];
        let ratio = this.width / this.height;
        let t = Math.sqrt(2 * this.width ** 2)
        this.points.forEach(p => {
            points.push({ x: offsetX + p.x * size / this.width, y: offsetY + p.y * size / (this.height * ratio) })
        })
        if (this.type === 'bottom') {
            this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[1].y, 0, -15, this.squareWidth)
            this.measureLine(ctx, points[2].x, points[2].y, points[3].x, points[3].y, 0, 15, this.width)
            this.measureLine(ctx, points[2].x, points[1].y, points[2].x, points[2].y, 15, 0, this.height)
        } else if (this.type === 'left') {
            this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[0].y, 0, -15, this.width)
            this.measureLine(ctx, points[1].x, points[1].y, points[2].x, points[2].y, 10, 0, this.squareWidth)
            this.measureLine(ctx, points[0].x, points[0].y, points[3].x, points[3].y, -15, 0, this.height)
        }else if(this.type==='left-invert'){
            this.measureLine(ctx, points[0].x, points[0].y, points[1].x, points[1].y, 0, -15, this.squareWidth/2)
            this.measureLine(ctx, points[0].x, points[0].y, points[4].x, points[4].y, -25, 0, this.height)
            this.measureLine(ctx, points[0].x, points[2].y, points[2].x, points[2].y, 0, this.height/(ratio*2)+30, this.width)
            ctx.fillStyle = '#555';
            ctx.fillText('n=' + n, (points[0].x + points[2].x - this.squareWidth * size / this.width+15) / 2, (points[1].y + points[3].y) / 2)
        }
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
        if(this.type!=='left-invert')
            ctx.fillText('n=' + n, (points[0].x + points[3].x ) / 2+10, (points[1].y + points[3].y*2) / 3)
    }
}
