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

let canvas = document.getElementById("myCanvas");
let canvas2 = document.getElementById("myCanvas2");
let ctx = canvas.getContext("2d");
let ctx2 = canvas2.getContext("2d");
canvas.setAttribute("width", "400px");
canvas.setAttribute("height", "500px");
canvas2.setAttribute("width", "320px");
canvas2.setAttribute("height", "500px");
let body = document.body;
let cx = 0;
// let mirror = new LozengeMirror(ctx, 200, 200,{countX:4,countY:4}, 2);
// let mirror=new BladeMirror(ctx,200,200,{countX:4,upperBladeHeight:40},2);
// let mirror=new BrickMirror(ctx,200,200,{countX:4,countY:5},2);
// let mirror = new NineSpotSpearMirror(ctx,200,200,{countX:6,countY:5},2);
// let mirror = new FourAndHalfSpotSpearMirror(ctx,200,200,{countX:8,upperSpearHeight:40},2);
// let mirror = new FourSpotSpearMirror(ctx,200,200,{countX:6,upperSpearHeight:40},2);
// let mirror = new JeweledMirror(ctx,200,200,{countX:5,countY:5,squareWidth:10},2);
// let mirror = new MiddleFourSpotSpearMirror(ctx,200,200,{countX:5,countY:5,squareWidth:10},2);
// let mirror = new SpearMirror(ctx,200,200,{countX:6,countY:2,upperSpearHeight:40},2);
// let mirror = new TwoSpotSpearMirror(ctx,200,200,{countX:5,countY:5},2);
// let mirror = new RhombusMirror(ctx,200,200,{countX:5,countY:2},2);
// let mirror = new CubeMirror(ctx, 320, 300, { countX: 3, countY: 3 }, 2);
// let mirror = new CascadeMirror(ctx, 320, 300, { squareWidth: 5, countY: 3 }, 1);

let width = 200,
  height = 200;
let inParams = CascadeMirror.parameters(width, height);
console.log(inParams);
let params = {};
inParams.forEach((p) => {
  p.value = p.default; // prompt(p.label,p.default);
  params[p.name] = parseFloat(p.value);
});
let mirror = new CascadeMirror(ctx, width, height, params, 2);
mirror.draw();
mirror.drawMeasures(ctx2, params, 0.9);
// document.getElementById('properties').innerHTML = 'area : ' + mirror.area() + ' cm2<br/>' + 'environment : ' + mirror.environment() + ' cm';
// let loz = new UpperTriangle(40, 30);
// loz.draw(ctx);
// loz.drawMeasures(ctx, 50.5, 80.5, 20, 80)
// body.addEventListener('keyup', () => {
//     cx = (cx + 1) % 10;
//     mirror = new LozengeMirror(ctx, 300, 200, 6, 4, cx);
//     mirror.draw();
// });

// let drawer = new BaseDrawer(ctx, 300, 210, 0);
//
// let shapes = Array.from({ length: 45 }, (a,i) => {
//     console.log(i)
//     if(i%12===0 || i%12===6) return new Square(25,40)
//     return new Square(50,40)
// })
//
// let stop = false;
// body.addEventListener('keyup', () => {
//     if (stop) return;
//     if (shapes.length) {
//         let r = shapes[0];
//         shapes = shapes.splice(1);
//         drawer.addShape(r)
//     } else {
//         stop = true;
//         console.log('the end!')
//     }
// })
