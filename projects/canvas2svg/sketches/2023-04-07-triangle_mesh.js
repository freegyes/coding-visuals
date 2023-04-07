var svg = document.getElementById("svg");
var ctx = new C2S(800, 800);

var size = ctx.width;

const gridDimension = 8;
let gridPoints = [];

// Set up color palette
let swatch = [];

for (let i = 0; i < gridDimension; i++) {
  let lightness = 100 - (i * (50 / gridDimension));
  swatch.push("hsl(0, 0%, " + lightness + "%)");  
}

ctx.lineWidth = .25;
ctx.strokeStyle = "hsl(0, 0%, 0%)";

// Set up a grid and displace its points
for (let i = 0; i < gridDimension; i++) {
  for (let j = 0; j < gridDimension; j++) {
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let displaceBy;
    if (i % 2 == 1) {
      displaceBy = (Math.floor(Math.random() * (size / gridDimension / 7))) * plusOrMinus;
    } else {
      displaceBy = (Math.floor(Math.random() * (size / gridDimension / 5))) * plusOrMinus;
    }
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
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Draw a downward pointing triangle
    ctx.beginPath();
    ctx.moveTo(gridPoints[(i + (j * gridDimension))][0], gridPoints[(i + (j * gridDimension))][1]);
    ctx.lineTo(gridPoints[(i + (j * gridDimension) + 1)][0], gridPoints[(i + (j * gridDimension) + 1)][1]);
    ctx.lineTo(gridPoints[(i + (j * gridDimension) + gridDimension + 1)][0], gridPoints[(i + (j * gridDimension) + gridDimension + 1)][1]);
    ctx.fillStyle = swatch[(Math.floor(Math.random() * swatch.length))];
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
svg.appendChild(ctx.getSvg());


// Downloading the SVG
var source = ctx.getSerializedSvg();
if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
}
if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
}
source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
document.getElementById("link").href = url;
// Download svg file from right click menu --> save as...