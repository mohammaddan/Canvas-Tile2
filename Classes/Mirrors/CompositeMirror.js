import BaseMirror from "./BaseMirror.js";
import RotatedRhombus from "../Primitives/RotatedRhombus.js";
import UpperTriangle from "../Primitives/UpperTriangle.js";
import BottomTriangle from "../Primitives/BottomTriangle.js";
import Lozenge from "../Primitives/Lozenge.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";

/**
 * params is object that has countX,upperBladeHeight
 */
export default class CompositeMirror extends BaseMirror {
    /**
     *
     * @param ctx
     * @param width
     * @param height
     * @param {{countX,countY}} params
     * @param padding
     */
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);
        this.lozengeWidth = this.width / params.countX
        this.lozengeHeight = this.height / params.countY
        this.compositeLength=Math.sqrt(this.lozengeWidth**2+this.lozengeHeight**2)/2
        this.rectWidth = 2 * this.compositeLength / 3;
        this.rectHeight = this.compositeLength / 3;
        let t0 = 180-2*Math.atan(this.lozengeHeight/this.lozengeWidth)*180/Math.PI
        let t1=90-t0/2
        let t = (Math.PI*t1) / 180
        let cosT=Math.cos(t);
        let sinT=Math.sin(t);
        let offsetX=-this.rectHeight*Math.cos((t0+t1)*Math.PI/180)
        let offsetY=this.rectHeight*Math.sin((t0+t1)*Math.PI/180)
        this.drawer.addOneRowOfShapes(0, 0, new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);

        for(let i=0;i<params.countY;i++){
            this.addGridOfLozenge(this.lozengeHeight*i,this.lozengeWidth,this.lozengeHeight,params.countX,1,padding)
            //-----------------------------------------------------------------------------------------------
            if(i===params.countY-1) break;
            for(let j=0;j<params.countX;j++){
                this.drawer.addOneShapeAt(offsetX+this.lozengeWidth*j,offsetY+ this.lozengeHeight*(i+1),
                    new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -t0, -t1))

                let temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
                this.drawer.addOneShapeAt(temp[2].x, temp[2].y,
                    new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -180+t0, 180-t0-t1))

                temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
                this.drawer.addOneShapeAt(temp[2].x, temp[2].y,
                    new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -t0, -t1-180))

                temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
                this.drawer.addOneShapeAt(temp[2].x, temp[2].y,
                    new RotatedRhombus(this.rectWidth, this.rectHeight, padding, 1, -180+t0, -t0-t1))

                temp=this.drawer.primitives[this.drawer.primitives.length-1].points;
                this.drawer.addOneShapeAt(temp[3].x, temp[3].y,
                    new RotatedRhombus(this.rectWidth-this.rectHeight, this.rectWidth-this.rectHeight, padding, 1, t0-180, -t1+180-t0))
            }
            //-----------------------------------------------------------------------------------------------
        }
        this.drawer.addOneRowOfShapes(0, height - this.lozengeHeight / 2, new BottomTriangle(this.lozengeWidth, this.lozengeHeight / 2, padding), params.countX);
    }

    static parameters(width, height) {
        return [
            {
                name: "countX",
                required: true,
                label: "تعداد تکرار در عرض",
                default: Math.round(width / 75),
                min: Math.ceil(width / 150),
                max: Math.floor(width / 30),
            },
            {
                name: "countY",
                required: true,
                label: "تعداد تکرار در ارتفاع",
                default: Math.round(height / 75),
                min: Math.ceil(height / 150),
                max: Math.floor(height / 30),
            },
        ];
    }

    drawMeasures(ctx, params, size = 1) {
        let loz = new Lozenge(this.lozengeWidth, this.lozengeHeight);
        loz.drawMeasures(ctx, 50.5, 80.5, (params.countX - 1) * params.countY , 70);
        let uloz = new UpperTriangle(this.lozengeWidth, this.lozengeHeight / 2, this.padding);
        uloz.drawMeasures(ctx, 200.5, 60.5, params.countX * 2, 70);
        let lloz = new LeftTriangle(this.lozengeWidth / 2, this.lozengeHeight, this.padding);
        lloz.drawMeasures(ctx, 150.5, 160.5, params.countY * 2, 45);
    }
}
