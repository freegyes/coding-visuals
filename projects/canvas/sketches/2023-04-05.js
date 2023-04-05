var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = 320;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

const repetitions = 9;
const rectSize = (size * 0.8) / repetitions;
const margin = (size * 0.1);


for (let i = 0; i < repetitions; i++) {
  for (let j = 0; j < repetitions; j++) {
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let displaceBy = j / rectSize * plusOrMinus * Math.random() * (rectSize * 0.9);
    let rotateBy = j / rectSize * Math.PI / 180 * plusOrMinus * Math.random() * (rectSize * 1.4);
    // Save the state of the canvas
    context.save();
    // Move the canvas to the center of the shape
    context.translate(i * rectSize + rectSize / 2 + displaceBy + margin,j * rectSize + rectSize / 2 + displaceBy + margin);
    // Rotate the canvas
    context.rotate(rotateBy);
    // Draw the rectangle
    context.strokeRect(0 - rectSize / 2,0 - rectSize / 2,rectSize,rectSize);
    // Reset the canvas
    context.restore();
  }
}
