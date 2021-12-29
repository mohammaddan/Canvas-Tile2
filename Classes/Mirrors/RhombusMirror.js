import BaseMirror from "./BaseMirror.js";
import HalfBlade from "../Primitives/HalfBlade.js";
import Rhombus from "../Primitives/Rhombus.js";

export default class RhombusMirror extends BaseMirror {
    constructor(ctx, width, height, countX,countY,angle=null, padding = 0) {
        super(ctx, width, height);

        this.rhombusWidth = width / countX;
        this.rhombusHeight= height /countY;

        this.h1 = !angle ? this.rhombusWidth : Math.tan(Math.PI * angle/180)*this.rhombusWidth;

        for(let j=0;j<countX;j++){
            let h1= (j%3+1)*(this.rhombusHeight-this.h1)/4+this.h1;

            this.drawer.addOneShapeAt(j*this.rhombusWidth,0,new HalfBlade(this.rhombusWidth,h1,padding,1,'top-right'))
            for(let i=0;i<countY-1;i++)
                this.drawer.addOneShapeAt(j*this.rhombusWidth,h1-this.h1+i*(this.rhombusHeight-this.h1),new Rhombus(this.rhombusWidth,this.rhombusHeight,padding,1,'left'))
            this.drawer.addOneShapeAt(j*this.rhombusWidth,h1-this.h1+(countY-1)*(this.rhombusHeight-this.h1),new HalfBlade(this.rhombusWidth,this.rhombusHeight- h1,padding,1,'bottom-left'))
        }

    }

    parameters(){
        return [
            {value:'countX',label:'تعداد تکرار در عرض'},
        ]
    }

    limits(){
        return {
            countX: []
        }
    }

}
