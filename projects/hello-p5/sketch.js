let canvasSize = 400;
let iterations = 256;

function setup() {
  createCanvas(canvasSize, canvasSize);
}

function draw() {
  background(256);
  let c = color(128, 10);
  for (let i = 0; i < iterations; i++) {
    ellipse(canvasSize / 2, canvasSize/2, noise(i) * canvasSize, noise(i) * canvasSize);
    fill(c);
  }
}
