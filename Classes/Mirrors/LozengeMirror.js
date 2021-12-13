import BaseDrawer from "../BaseDrawer.js";
import Lozenge from "../Primitives/Lozenge.js";

export default class LozengeMirror {
    constructor(ctx, width, height, countX, countY) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.lozengeWidth = width / countX;
        this.lozengeHeight = height / countY;
        this.drawer = new BaseDrawer(ctx, width, height, -this.lozengeWidth / 2);
        let cnt = (countX + 1) * countY + countX * (countY + 1);
        for (let i = 0; i < cnt; i++) {
            this.drawer.addShape(new Lozenge(this.lozengeWidth, this.lozengeHeight, 3));
        }
    }

    draw() {
        this.drawer.drawAll();
    }
}