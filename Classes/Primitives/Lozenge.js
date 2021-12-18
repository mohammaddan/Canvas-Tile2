import Primitive from "../Primitive.js";

export default class Lozenge extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.points.push({ x: 0, y: 0 });
        this.points.push({ x: width / 2, y: -height / 2 });
        this.points.push({ x: width, y: 0 });
        this.points.push({ x: width / 2, y: height / 2 });

        this.drawablePoints.push({ x: padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: padding - height / 2 });
        this.drawablePoints.push({ x: width - padding, y: 0 });
        this.drawablePoints.push({ x: width / 2, y: height / 2 - padding });
    }

    clone() {
        return new Lozenge(this.width, this.height, this.padding, this.lineWidth);
    }

    area() {
        // if (this.isInDrawerBound(drawerWidth, drawerHeight))
        return this.width * this.height / 2;
        // return this.width * this.height / 4;
    }

    environment() {
        let edge = Math.sqrt(this.width ^ 2 + this.height ^ 2);
        // if (this.isInDrawerBound(drawerWidth, drawerHeight))
        return edge * 4;

    }
}
