import Primitive from "../Primitive";

export default class Lozenge extends Primitive {
    constructor(width, height, padding = 0, lineWidth = 1) {
        super(width, height, padding, lineWidth);
        this.points.push({ x: padding, y: height / 2 });
        this.points.push({ x: width / 2, y: padding });
        this.points.push({ x: width - padding, y: height / 2 });
        this.points.push({ x: width / 2, y: height - padding });
    }
}