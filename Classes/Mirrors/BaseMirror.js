import BaseDrawer from "../BaseDrawer.js";
import LeftTriangle from "../Primitives/LeftTriangle.js";
import Lozenge from "../Primitives/Lozenge.js";
import RightTriangle from "../Primitives/RightTriangle.js";
import Drawing from "../DXF/Drawing.js";
import Square from "../Primitives/Square.js";

export default class BaseMirror {
    constructor(ctx, width, height, yOffset = 0,scale=1) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.drawer = new BaseDrawer(ctx, width, height, 0, yOffset);
        this.dxfWriter = new Drawing();
        this.dxfWriter.setUnits('Centimeters');
        this.mirrorPics = [];
    }

    draw(color = 'white') {
        this.drawer.drawAll(color,this.scale);
    }

    area() {
        return Math.round(this.drawer.primitives.reduce((prev, next) => prev + next.area(), 0));
    }

    environment() {
        // if(this.constructor.name==='CascadeMirror') return 0; move to CasecadeMirror
        return Math.round(this.drawer.primitives.reduce((prev, next) => prev + next.environment(), 0));
    }

    addGridOfLozenge(y, lWidth, lHeight, countX, countY, padding = 0) {
        for (let i = 0; i < countY; i++) {
            this.drawer.addOneShapeAt(0, lHeight * i + y, new LeftTriangle(lWidth / 2, lHeight, padding));
            this.drawer.addOneRowOfShapes(lWidth / 2, lHeight / 2 + lHeight * i + y,
                new Lozenge(lWidth, lHeight, padding), countX - 1);
            this.drawer.addOneShapeAt(this.width - lWidth / 2, lHeight * i + y,
                new RightTriangle(lWidth / 2, lHeight, padding));
            if (i < countY - 1)
                this.drawer.addOneRowOfShapes(0, lHeight + lHeight * i + y,
                    new Lozenge(lWidth, lHeight, padding), countX);
        }
    }

    checkLimits(params,increase_count=false){return {};}

    drawDXF() {
        this.drawer.primitives.forEach(primitive => {
            primitive.drawDXF(this.dxfWriter)
        })
        return this
    }

    dxfFile() {
        return new File([this.dxfWriter.toDxfString()], 'mirror.dxf', {type: "application/dxf"})
    }

    downloadDXF() {
        return this.download(this.dxfWriter.toDxfString(), 'mirror.dxf', 'application/dxf')
    }

    getMirrorMeasure(canvasElement,canvas){
        let tempCanvas =document.createElement('canvas');
        let w=parseFloat(this.width)
        let h=parseFloat(this.height)
        tempCanvas.width=w+51
        tempCanvas.height=h+51
        let ctx = tempCanvas.getContext('2d');
        ctx.drawImage(canvas,40,40)
        let tempPrimitive = new Square(w,h)
        tempPrimitive.shiftXY(40,40)
        tempPrimitive.drawMeasures(ctx,0,0,'',w)
        return tempCanvas
    }

    /**
     * If it has ctx then return mirror with measures
     * send ctx just for mirror itself
     */
    getMirrorPics(canvasElement,isMirror=false) {
        let ctx=canvasElement.getContext('2d')
        let el=isMirror ? this.getMirrorMeasure(ctx,canvasElement) : canvasElement;
        return fetch(el.toDataURL('image/png'))
            .then(res => res.blob()).then(blob => {
                this.mirrorPics.push(new File([blob], 'mirror.png', {type: "image/png"}))
            }).then(() => Promise.resolve()).catch(() => Promise.reject())
    }

    downloadMirrorPics() {
        let filename = this.constructor.name.replace('Mirror','')
        this.mirrorPics.forEach(pic => {
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(pic, filename);
                } else {
                    const elem = window.document.createElement('a');
                    elem.href = window.URL.createObjectURL(pic);
                    elem.download = filename;
                    document.body.appendChild(elem);
                    elem.click();
                    document.body.removeChild(elem);
                }
            }
        )
    }

    download(data, filename, type) {
        let file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            console.log(url)
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
}
