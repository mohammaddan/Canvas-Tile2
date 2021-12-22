import BaseDrawer from "./Classes/BaseDrawer.js";
import LozengeMirror from "./Classes/Mirrors/LozengeMirror.js";
import Lozenge from "./Classes/Primitives/Lozenge.js";
import FourSpotSpearMirror from "./Classes/Mirrors/FourSpotSpearMirror.js";
import FourAndHalfSpotSpearMirror from "./Classes/Mirrors/FourAndHalfSpotSpearMirror.js";
import JeweledMirror from "./Classes/Mirrors/JeweledMirror.js";
import CutedLozenge from "./Classes/Primitives/CutedLozenge.js";
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
canvas.setAttribute('width', '400px');
canvas.setAttribute('height', '500px');
let body = document.body;
let cx = 0;
// let mirror = new LozengeMirror(ctx, 300, 200, 6, 4, 2);
let mirror = new JeweledMirror(ctx,200,300,4,5,2,10)
mirror.draw();
document.getElementById('properties').innerHTML = 'area : ' + mirror.area() + ' cm2<br/>' + 'environment : ' + mirror.environment() + ' cm';
// body.addEventListener('keyup', () => {
//     cx = (cx + 1) % 10;
//     mirror = new LozengeMirror(ctx, 300, 200, 6, 4, cx);
//     mirror.draw();
// });

// let drawer = new BaseDrawer(ctx, 300, 210, 0);
//
// let shapes = Array.from({ length: 45 }, () => new CutedLozenge(50,40,20,0,1,true))
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
