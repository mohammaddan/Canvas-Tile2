import BaseDrawer from "./Classes/BaseDrawer.js";
import LozengeMirror from "./Classes/Mirrors/LozengeMirror.js";
import Lozenge from "./Classes/Primitives/Lozenge.js";
import FourSpotSpearMirror from "./Classes/Mirrors/FourSpotSpearMirror.js";
import FourAndHalfSpotSpearMirror from "./Classes/Mirrors/FourAndHalfSpotSpearMirror.js";
import JeweledMirror from "./Classes/Mirrors/JeweledMirror.js";
import CutedLozenge from "./Classes/Primitives/CutedLozenge.js";
import MiddleFourSpotSpearMirror from "./Classes/Mirrors/MiddleFourSpotSpearMirror.js";
import SpearMirror from "./Classes/Mirrors/SpearMirror.js";
import NineSpotSpearMirror from "./Classes/Mirrors/NineSpotSpearMirror.js";
import SquareMirror from "./Classes/Mirrors/SquareMirror.js";
import TwoSpotSpearMirror from "./Classes/Mirrors/TwoSpotSpearMirror.js";
import BladeMirror from "./Classes/Mirrors/BladeMirror.js";
import BrickMirror from "./Classes/Mirrors/BrickMirror.js";
import Square from "./Classes/Primitives/Square.js";
import RhombusMirror from "./Classes/Mirrors/RhombusMirror.js";
import Blade from "./Classes/Primitives/Blade.js";
import BottomSpear from "./Classes/Primitives/BottomSpear.js";
import BottomTriangle from "./Classes/Primitives/BottomTriangle.js";
import HalfBlade from "./Classes/Primitives/HalfBlade.js";
import HalfCutedLozenge from "./Classes/Primitives/HalfCutedLozenge.js";
import HalfRhombus from "./Classes/Primitives/HalfRhombus.js";
import Rhombus from "./Classes/Primitives/Rhombus.js";
import RightTriangle from "./Classes/Primitives/RightTriangle.js";
import Spear from "./Classes/Primitives/Spear.js";
import UpperSpear from "./Classes/Primitives/UpperSpear.js";
import UpperTriangle from "./Classes/Primitives/UpperTriangle.js";
import CubeMirror from "./Classes/Mirrors/CubeMirror.js";
import CascadeMirror from "./Classes/Mirrors/CascadeMirror.js";
import DiamondMirror from "./Classes/Mirrors/DiamondMirror.js";
import RectanglesMirror from "./Classes/Mirrors/RectanglesMirror.js";
import ShatterMirror from "./Classes/Mirrors/ShatterMirror.js";
import RotatedRhombus from "./Classes/Primitives/RotatedRhombus.js";
import CompositeMirror from "./Classes/Mirrors/CompositeMirror.js";
import HexagonalMirror from "./Classes/Mirrors/HexagonalMirror.js";
import IrregularHexagon from "./Classes/Primitives/IrregularHexagon.js";

let width = 200, height =300;
let canvas = document.getElementById("myCanvas");
let canvas2 = document.getElementById("myCanvas2");
let canvas3 = document.getElementById("myCanvas3");
let ctx = canvas.getContext("2d");
let ctx2 = canvas2.getContext("2d");
let ctx3 = canvas3.getContext("2d");
canvas.setAttribute("width", ((Math.max(width,300)) + 5) + "px");
canvas.setAttribute("height", ((Math.max(height,300)) + 5) + "px");
canvas2.setAttribute("width", (Math.max(width,300))+"px");
canvas2.setAttribute("height", (Math.max(height,300))+"px");
let body = document.body;
let cx = 0;

// let ih=new IrregularHexagon(100,100,20,5)
// ih.shiftXY(100,100)
// ih.draw(ctx)
// ------------------------------------------------------------------------------------------------
// let mirror = new BladeMirror(ctx, 200, 200, {countX: 4, upperBladeHeight: 40}, 2);
// let mirror = new BrickMirror(ctx, 200, 200, {countX: 4, countY: 5}, 2);
// let mirror = new CompositeMirror(ctx, width, height, {countX:3, countY: 2}, 2);
// let mirror = new CubeMirror(ctx, width, height, {countX: 3, countY: 3}, 2);
// let mirror = new DiamondMirror(ctx, width, height, {countX: 4, countY: 4}, 2);
// let mirror = new FourAndHalfSpotSpearMirror(ctx, 200, 200, {countX: 8, upperSpearHeight: 40}, 2);
// let mirror = new FourSpotSpearMirror(ctx, 200, 200, {countX: 6, upperSpearHeight: 40}, 2);
// let mirror = new HexagonalMirror(ctx, width, height, {hexWidth: 100}, 2);
// let mirror = new JeweledMirror(ctx, 200, 200, {countX: 5, countY: 5, squareWidth: 10}, 2);
// let mirror = new LozengeMirror(ctx, 200, 200, {countX: 4, countY: 4}, 2);
// let mirror = new MiddleFourSpotSpearMirror(ctx, 200, 200, {countX: 5, countY: 5, squareWidth: 10}, 2);
// let mirror = new NineSpotSpearMirror(ctx, 200, 200, {countX: 6, countY: 5}, 2);
// let mirror = new RectanglesMirror(ctx, 200, 200, {squareWidth: 50, squareHeight: 50}, 2);
// let mirror = new RhombusMirror(ctx, 200, 200, {countX: 5, countY: 2}, 2);
// let mirror = new CascadeMirror(ctx, width, height, {squareWidth: 10, countY: 3}, 1);
// let mirror = new SpearMirror(ctx, 200, 200, {countX: 6, countY: 2, upperSpearHeight: 40}, 2);
// let mirror = new SquareMirror(ctx, 200, 200, {countX:5,countY:5}, 2);
// let mirror = new TwoSpotSpearMirror(ctx, 200, 200, {countX: 5, countY: 5}, 2);

// mirror.draw('white');
// mirror.getMirrorPics(canvas).then(() => {
//     // mirror.downloadMirrorPics()
// });
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
let inParams = TwoSpotSpearMirror.parameters(width, height);
// console.log(inParams);
let params = {};
inParams.forEach((p) => {
  p.value = p.default; // prompt(p.label,p.default);
  params[p.name] = parseFloat(p.value);
});
let mirror= new TwoSpotSpearMirror(ctx,width,height,params,1,0.75);
// smoky , blue , gold , boronze , mesi , rozgold , white , grey
mirror.draw('grey');
mirror.drawMeasures(ctx2, params);

// document.body.append(mirror.getMirrorMeasure(ctx,canvas))

let reserves=mirror.reservePrimitives(180,180);
reserves.forEach(r=>{
  r.primitive.moveToCenter(200,200)
  r.primitive.draw(ctx3)
  console.log(r.primitive.area(),r.primitive.constructor.name)
})
mirror.getMirrorPics(canvas,true).then(()=>{
  // mirror.downloadMirrorPics()
})
// mirror.getMirrorPics(canvas2)
// console.log(mirror.mirrorPics)
// mirror.drawDXF().downloadDXF()
document.getElementById('properties').innerHTML = 'area : ' + mirror.area() + ' cm<sup>2</sup><br/>' + 'environment : ' + mirror.environment() + ' cm';
// ------------------------------------------------------------------------------------------------

// let w=150;
// let h=150;
// let a=(4*w-Math.sqrt(16*w**2-12*(w**2-h**2/4)))/6
// let x=w-2*a;
//
// let loz = new CutedLozenge(w, h,x,3,1,true);
// loz.shiftXY(50,100)
// loz.draw(ctx);

// loz.drawMeasures(ctx, 50.5, 80.5, 20, 80)
// body.addEventListener('keyup', () => {
//     cx = (cx + 1) % 10;
//     mirror = new LozengeMirror(ctx, 300, 200, 6, 4, cx);
//     mirror.draw();
// });
// ------------------------------------------------------------------------------------------
// let drawer = new BaseDrawer(ctx, 300, 210, 0);
//
// let rects=[];
//
// Array.from({ length: 90 }, (a,i) => {
//     rects.push({w: Math.floor(Math.random() * 2 + 1), h: Math.floor(Math.random() * 2 + 1)})
// })
//
//
// // let shapes = Array.from({ length: 45 }, (a,i) => {
// //     if(i%12===0 || i%12===6) return new Square(25,40)
// //     return new Square(50,40)
// // })
//
// let shapes =[];
// rects.forEach(r => {
//     shapes.push(new Square(r.w*25,r.h*25,3))
// })
//
// let stop = false;
// body.addEventListener('keyup', () => {
//     if (stop) return;
//     if (shapes.length) {
//         let r = shapes[0];
//         shapes = shapes.splice(1);
//         console.log(drawer.addRect(r))
//     } else {
//         stop = true;
//         console.log('the end!')
//     }
// })
