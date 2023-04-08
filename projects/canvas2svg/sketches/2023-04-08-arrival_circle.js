// Draw on a canvas2svg mock context 
const ctx = new C2S(1730/2, 1250/2);

// Main controls
const SIZE = 0.35;
const RESOLUTION = 29;
const ITERATIONS = 19;
const SPACING = 0.35;

// Let's draw!
const center_x = ctx.width / 2;
const center_y = ctx.height / 2;
const radius = Math.min(ctx.width, ctx.height) * SIZE;
const startAngle = Math.PI;

let drawCurve = function(r) {
  // Store a number of points in an arc
  // X_End = X_Center + R * Cos(End_Angle)
  // Y_End = Y_Center + R * Sin(End_Angle)
  // 1° × π/180 = rad
  let points = [];

  for (let i = 1; i < RESOLUTION + 1; i++) {
    let endAngle = startAngle + i * (360 / RESOLUTION * Math.PI / 180);
    let end_x = center_x + r * Math.cos(endAngle); 
    let end_y = center_y + r * Math.sin(endAngle);
    points.push({x: end_x, y: end_y}); 
  }

  // Draw an arc
  for (let i = 0; i < points.length - 1; i++) {
    while (i  < RESOLUTION / 2) {
      ctx.beginPath();  
      let endAngle = startAngle + i * (360 / RESOLUTION * Math.PI / 180);
      ctx.arc(center_x, center_y, radius, startAngle, endAngle);
      ctx.stroke();
      i++;
    }
    
    const x_diff = Math.max(points[i - 1].x, points[i].x) - Math.min(points[i - 1].x, points[i].x);
    const y_diff = Math.max(points[i - 1].y, points[i].y) - Math.min(points[i - 1].y, points[i].y);
    const x_average_1 = points[i - 1].x + x_diff / 2;
    const y_average_1 = points[i - 1].y + y_diff / 2;
    const x_average_2 = points[i].x - x_diff / 2;
    const y_average_2 = points[i].y - y_diff / 2;
    const control_radian = Math.min(x_diff, y_diff);

    const cp_x1 = x_average_1 + control_radian * Math.cos(Math.random() * i + i * SIZE);
    const cp_y1 = y_average_1 + control_radian * Math.sin(Math.random() * i + i * SIZE);
    const cp_x2 = x_average_2 + control_radian * Math.cos(Math.random() * i - i * SIZE);
    const cp_y2 = y_average_2 + control_radian * Math.sin(Math.random() * i - i * SIZE);
    ctx.bezierCurveTo(cp_x1, cp_y1, cp_x2, cp_y2, points[i - 1].x, points[i - 1].y);
    ctx.stroke();
  }
}

for (let i = 0; i < ITERATIONS; i++) {
  drawCurve(radius + SPACING * i);
}

// Display on the svg element
let svg = document.getElementById("svg");
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
// Download the svg file from the right click menu --> save as...