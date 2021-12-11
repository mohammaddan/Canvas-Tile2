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

        })
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        let fp = this.points[0];
        this.ctx.moveTo(fp.x, fp, y);
        this.points.slice(1).forEach(p => {
            this.ctx.lineTo(p.x, p.y);
        });
        this.ctx.lineTo(fp.x, fp.y);
    }


}