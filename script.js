import BaseDrawer from "./Classes/BaseDrawer.js";
import LozengeMirror from "./Classes/Mirrors/LozengeMirror.js";
import Lozenge from "./Classes/Primitives/Lozenge.js";
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
console.log(canvas.clientWidth, canvas.clientHeight)
canvas.setAttribute('width', '400px');
canvas.setAttribute('height', '800px');
let body = document.body;

let lmirror = new LozengeMirror(ctx, 300, 200, 5, 4);
lmirror.draw();
// let drawer = new BaseDrawer(ctx, 300, 210, -30);

// let shapes = Array.from({ length: 45 }, (x) => new Lozenge(60, 60, 4))


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