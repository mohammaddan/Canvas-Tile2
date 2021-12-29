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

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
canvas.setAttribute('width', '400px');
canvas.setAttribute('height', '500px');
let body = document.body;
let cx = 0;
// let mirror = new LozengeMirror(ctx, 300, 200, 6, 4, 2);
let mirror = new RhombusMirror(ctx,200,300,8,3,null,4);
mirror.draw();
document.getElementById('properties').innerHTML = 'area : ' + mirror.area() + ' cm2<br/>' + 'environment : ' + mirror.environment() + ' cm';

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
