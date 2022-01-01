import BaseMirror from "./BaseMirror.js";
import CutedLozenge from "../Primitives/CutedLozenge.js";
import HalfCutedLozenge from "../Primitives/HalfCutedLozenge.js";
import Square from "../Primitives/Square.js";

export default class JeweledMirror extends BaseMirror {
    constructor(ctx, width, height, params, padding = 0) {
        super(ctx, width, height);
        this.lozengeWidth = width / params.countX;
        if(!params.squareWidth) params.squareWidth=5;
        let squareWidth=params.squareWidth;
        this.lozengeHeight = height / params.countY -squareWidth;
        this.drawer.addOneRowOfShapes(0,0,
            new HalfCutedLozenge(this.lozengeWidth,this.lozengeHeight/2,squareWidth,padding,1,'top')
            ,params.countX);
        for(let y=this.lozengeHeight/2;y<this.height;y+=this.lozengeHeight+squareWidth){
            let x=(this.lozengeWidth-squareWidth)/2;
            this.drawer.addOneShapeAt(0,y-this.lozengeHeight/2,
                new HalfCutedLozenge((this.lozengeWidth-squareWidth)/2,this.lozengeHeight+squareWidth,squareWidth,padding,1,'left'))
            for (let i=0;i<params.countX-1;i++){
                this.drawer.addOneShapeAt(x,y,new Square(squareWidth,squareWidth,padding))
                this.drawer.addOneShapeAt(x+squareWidth,y,
                    new CutedLozenge(this.lozengeWidth-squareWidth,this.lozengeHeight+squareWidth,squareWidth,padding,1,false)
                )
                x+=this.lozengeWidth;
            }
            this.drawer.addOneShapeAt(x,y,new Square(squareWidth,squareWidth,padding))
            this.drawer.addOneShapeAt(width-(this.lozengeWidth-squareWidth)/2,y-this.lozengeHeight/2,
                new HalfCutedLozenge((this.lozengeWidth-squareWidth)/2,this.lozengeHeight+squareWidth,squareWidth,padding,1,'right'))

            if(y<this.height-this.lozengeHeight)
                this.drawer.addOneRowOfShapes(0,y+ this.lozengeHeight/2 + squareWidth,
                    new CutedLozenge(this.lozengeWidth,this.lozengeHeight,squareWidth,padding,1,true),params.countX);
        }
        this.drawer.addOneRowOfShapes(0,height-this.lozengeHeight/2,
            new HalfCutedLozenge(this.lozengeWidth,this.lozengeHeight/2,squareWidth,padding,1,'bottom')
            ,params.countX);

        // for(let i=0;i<params.countX;i++)
        //     this.drawer.addShape(new CutedLozenge(this.lozengeWidth,this.lozengeHeight,squareWidth,padding,1,true));
        // for(let i=0;i<params.countX-1;i++)
        //     this.drawer.addShape(new CutedLozenge(this.lozengeWidth,this.lozengeHeight,squareWidth,padding,true));
    }

}
