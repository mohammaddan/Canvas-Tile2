import BaseDrawer from "../BaseDrawer.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";
import Lozenge from "../Primitives/Lozenge.js";
import RightTriangle from "../Primitives/RightTriangle.js";

export default class BaseMirror {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.drawer = new BaseDrawer(ctx, width, height);
    }

    draw() {
        this.drawer.drawAll();
    }

    area() {
        let a = 0;
        let width = this.drawer.width;
        let height = this.drawer.height;
        this.drawer.primitives.forEach(p => {
            a += p.area(width, height);
        });
        return Math.round(a);
    }

    environment() {
        return Math.round(this.drawer.primitives.reduce((prev, next) => prev + next.environment(), 0));
    }

    parameters(){
        return [
            {value:'countX',label:'تعداد تکرار در عرض'},
            {value:'countY',label:'تعداد تکرار در ارتفاع'},
        ]
    }

    limits(){
        return {
            countX:null,countY:null
        }
    }

    add2RowLozenge(y,lWidth,lHeight,countX,padding=0){
        for (let i = 0; i < 2; i++) {
            this.drawer.addOneShapeAt(0, lHeight * i+y, new LeftTriangle(lWidth / 2, lHeight, padding));
            this.drawer.addOneRowOfShapes(lWidth / 2, lHeight / 2 + lHeight * i+y,
                new Lozenge(lWidth, lHeight, padding), countX - 1);
            this.drawer.addOneShapeAt(this.width - lWidth / 2, lHeight * i+y,
                new RightTriangle(lWidth / 2, lHeight, padding));
            if (i===0)
                this.drawer.addOneRowOfShapes(0, lHeight + lHeight * i+y,
                    new Lozenge(lWidth, lHeight, padding), countX);
        }
    }
}
