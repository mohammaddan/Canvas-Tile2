import BaseDrawer from "./Classes/BaseDrawer.js";
import LozengeMirror from "./Classes/Mirrors/LozengeMirror.js";
import Lozenge from "./Classes/Primitives/Lozenge.js";
import FourSpotSpearMirror from "./Classes/Mirrors/FourSpotSpearMirror.js";
import FourAndHalfSpotSpearMirror from "./Classes/Mirrors/FourAndHalfSpotSpearMirror.js";
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
canvas.setAttribute('width', '400px');
canvas.setAttribute('height', '500px');
let body = document.body;
let cx = 0;
// let mirror = new LozengeMirror(ctx, 300, 200, 6, 4, 2);
let mirror = new FourAndHalfSpotSpearMirror(ctx,200,300,4,40,3)
mirror.draw();
document.getElementById('properties').innerHTML = 'area : ' + mirror.area() + ' cm2<br/>' + 'environment : ' + mirror.environment() + ' cm';
// body.addEventListener('keyup', () => {
//     cx = (cx + 1) % 10;
//     mirror = new LozengeMirror(ctx, 300, 200, 6, 4, cx);
//     mirror.draw();
// });
// let drawer = new BaseDrawer(ctx, 300, 210, 0);

// let shapes = Array.from({ length: 45 }, (x) => new Lozenge(301 / 9, 50, 4))

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
