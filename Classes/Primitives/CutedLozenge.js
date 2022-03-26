import Primitive from "../Primitive.js";

export default class CutedLozenge extends Primitive {
  constructor(width, height, squareWidth = 20, padding = 0, lineWidth = 1, horizontal = true) {
    super(width, height, padding, lineWidth);
    this.squareWidth = squareWidth;
    this.w1 = this.h1 = squareWidth / 2; //jewelHeight
    this.h2 = height / 2 - this.h1;
    this.w2 = width / 2 - this.w1;
    this.horizontal = horizontal;
    if (horizontal) {
      this.edge = Math.sqrt(this.w2 * this.w2 + (this.height * this.height) / 4);
      this.points.push({ x: 0, y: 0 });
      this.points.push({ x: this.w2, y: -height / 2 });
      this.points.push({ x: this.w2 + squareWidth, y: -height / 2 });
      this.points.push({ x: width, y: 0 });
      this.points.push({ x: this.w2 + squareWidth, y: height / 2 });
      this.points.push({ x: this.w2, y: height / 2 });

      this.drawablePoints.push({ x: padding, y: 0 });
      this.drawablePoints.push({ x: this.w2, y: -height / 2 + padding });
      this.drawablePoints.push({ x: this.w2 + squareWidth, y: -height / 2 + padding });
      this.drawablePoints.push({ x: width - padding, y: 0 });
      this.drawablePoints.push({ x: this.w2 + squareWidth, y: height / 2 - padding });
      this.drawablePoints.push({ x: this.w2, y: height / 2 - padding });
    } else {
      this.edge = Math.sqrt(this.h2 * this.h2 + (this.width * this.width) / 4);
      this.points.push({ x: 0, y: 0 });
      this.points.push({ x: width / 2, y: -this.h2 });
      this.points.push({ x: width, y: 0 });
      this.points.push({ x: width, y: this.h1 * 2 });
      this.points.push({ x: width / 2, y: this.h1 * 2 + this.h2 });
      this.points.push({ x: 0, y: this.h1 * 2 });

      this.drawablePoints.push({ x: padding, y: 0 });
      this.drawablePoints.push({ x: width / 2, y: -this.h2 + padding });
      this.drawablePoints.push({ x: width - padding, y: 0 });
      this.drawablePoints.push({ x: width - padding, y: this.h1 * 2 });
      this.drawablePoints.push({ x: width / 2, y: this.h1 * 2 + this.h2 - padding });
      this.drawablePoints.push({ x: padding, y: this.h1 * 2 });
    }
  }

  clone() {
    return new CutedLozenge(this.width, this.height, this.squareWidth, this.padding, this.lineWidth);
  }

  area() {
    // console.log(this.horizontal, '-----',this.width,this.height,this.h2)
    if (this.horizontal) return this.width * this.height - this.w2 * this.height;
    return this.width * this.height - this.h2 * this.width;
  }

  environment() {
    return this.edge * 4 + 2 * this.squareWidth;
  }

  drawMeasures(ctx, offsetX, offsetY, n, size) {
    let points = [];
    let raio = this.width / this.height;
    let t = Math.sqrt(this.width ** 2 + (this.height - this.squareWidth) ** 2) / 2;
    let t1 = Math.sqrt(this.height ** 2 + (this.width - this.squareWidth) ** 2) / 2;
    this.points.forEach((p) => {
      points.push({ x: offsetX + (p.x * size) / this.width, y: offsetY + (p.y * size) / (this.height * raio) });
    });
    if (this.horizontal) {
      this.measureLine(ctx, points[1].x, points[1].y, points[0].x, points[0].y, -20, -20, t1.toFixed(1));
      this.measureLine(ctx, points[1].x, points[1].y, points[2].x, points[2].y, 0, -15, this.squareWidth);
      this.measureLine(ctx, points[2].x, points[2].y, points[4].x, points[4].y, size / 3, 0, this.height);
      this.measureLine(ctx, points[0].x, points[0].y, points[3].x, points[3].y, 0, size / raio, this.width);
    } else {
      this.measureLine(ctx, points[1].x, points[1].y, points[0].x, points[0].y, -20, -20, t.toFixed(1));
      this.measureLine(ctx, points[1].x, points[1].y, points[4].x, points[4].y, size / 2 + 10, 0, this.height);
      this.measureLine(ctx, points[5].x, points[5].y, points[0].x, points[0].y, -20, 0, this.squareWidth);
      this.measureLine(ctx, points[5].x, points[5].y, points[3].x, points[3].y, 0, size, this.width);
    }
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    let fp = points[0];
    ctx.moveTo(Math.floor(fp.x), Math.floor(fp.y));
    points.slice(1).forEach((p) => {
      ctx.lineTo(Math.floor(p.x), Math.floor(p.y));
    });
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#555";
    ctx.fillText("n=" + n, points[1].x, (points[1].y + points[4].y) / 2);
  }
}
