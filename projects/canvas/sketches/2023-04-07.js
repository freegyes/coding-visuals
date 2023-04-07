var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var size = 320;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
ctx.scale(dpr, dpr);

// Set up color palette
const swatch = [
  "hsl(0, 0%, 85%)",
  "hsl(0, 0%, 75%)",
  "hsl(0, 0%, 65%)",
  "hsl(0, 0%, 50%)"
];

// Set up a grid and displace it's points
const gridDimension = 8;
let gridPoints = [];

for (let i = 0; i < gridDimension; i++) {
  for (let j = 0; j < gridDimension; j++) {
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let displaceBy = (Math.floor(Math.random() * (size / gridDimension / 5))) * plusOrMinus;
    let x = (j * ((size * 0.8) / gridDimension)) + (size * 0.1) + displaceBy;
    let y = (i * ((size * 0.8) / gridDimension)) + (size * 0.1) + displaceBy;
    gridPoints.push([x, y]);
  }
}

// Draw triangles using the grid
for (let j = 0; j < gridDimension - 1; j++) {
  for (let i = 0; i < (gridDimension - 1); i++) {
    // Draw an upward pointing triangle
    ctx.beginPath();
    ctx.moveTo(gridPoints[(i + (j * gridDimension))][0], gridPoints[(i + (j * gridDimension))][1]);
    ctx.lineTo(gridPoints[(i + (j * gridDimension) + gridDimension)][0], gridPoints[(i + (j * gridDimension) + gridDimension)][1]);
    ctx.lineTo(gridPoints[(i + (j * gridDimension) + gridDimension + 1)][0], gridPoints[(i + (j * gridDimension) + gridDimension + 1)][1]);
    ctx.fillStyle = swatch[(Math.floor(Math.random() * swatch.length))];
    ctx.fill();
    // Draw a downward pointing triangle
    ctx.beginPath();
    ctx.moveTo(gridPoints[(i + (j * gridDimension))][0], gridPoints[(i + (j * gridDimension))][1]);
    ctx.lineTo(gridPoints[(i + (j * gridDimension) + 1)][0], gridPoints[(i + (j * gridDimension) + 1)][1]);
    ctx.lineTo(gridPoints[(i + (j * gridDimension) + gridDimension + 1)][0], gridPoints[(i + (j * gridDimension) + gridDimension + 1)][1]);
    ctx.fillStyle = swatch[(Math.floor(Math.random() * swatch.length))];
    ctx.fill();
  }
}
