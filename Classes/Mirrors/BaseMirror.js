import BaseDrawer from "../BaseDrawer.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";
import Lozenge from "../Primitives/Lozenge.js";
import RightTriangle from "../Primitives/RightTriangle.js";

export default class BaseMirror {
    constructor(ctx, width, height,yOffset=0) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.drawer = new BaseDrawer(ctx, width, height,0,yOffset);
    }

    draw() {
        this.drawer.drawAll();
    }

    area() {
        // let a = 0;
        // this.drawer.primitives.forEach(p => {
        //     a += p.area();
        //     // console.log(p.area());
        // });
        // return Math.round(a);
        return Math.round(this.drawer.primitives.reduce((prev, next) => prev + next.area(), 0));

    }

    environment() {
        // let a = 0;
        // this.drawer.primitives.forEach(p => {
        //     a += p.environment();
        //     console.log(p.environment());
        // });
        // return Math.round(a);
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

    addGridOfLozenge(y, lWidth, lHeight, countX, countY, padding=0){
        for (let i = 0; i < countY; i++) {
            this.drawer.addOneShapeAt(0, lHeight * i+y, new LeftTriangle(lWidth / 2, lHeight, padding));
            this.drawer.addOneRowOfShapes(lWidth / 2, lHeight / 2 + lHeight * i+y,
                new Lozenge(lWidth, lHeight, padding), countX - 1);
            this.drawer.addOneShapeAt(this.width - lWidth / 2, lHeight * i+y,
                new RightTriangle(lWidth / 2, lHeight, padding));
            if (i<countY-1)
                this.drawer.addOneRowOfShapes(0, lHeight + lHeight * i+y,
                    new Lozenge(lWidth, lHeight, padding), countX);
        }
    }
}
