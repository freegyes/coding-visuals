const paperWidth = 1760-100;
const paperHeight = 1250-100;

const reps = 20;

let x = 0;
let y = 0;

let probability = 0;

function setup() {
    createCanvas(paperWidth, paperHeight, SVG);
    background("white");
  }
  
  function draw() {
    const size = width / reps;

    stroke("black");

    if (random(1) < probability) {
        line(x, y, x + size, y + size);
    } else {
        line(x, y + size, x + size, y);
    }

    
    /* original 10PRINT
    if (random(1) < 0.5) {
        line(x, y, x + size, y + size);
    } else {
        line(x, y + size, x + size, y);
    }
    */

    /* vertical / horizontal lines
        if (random(1) < probability) {
        line(x + size/2, y, x + size/2, y + size);
    } else {
        line(x, y + size/2, x + size, y + size/2);
    }
    */

    /* rectangles b&w
    if (random(1) < probability) {
        rect(x, y, size, size);
        fill("white");
        //line(x, y, x + size, y + size);
    } else {
        rect(x, y, size, size);
        fill("black");
        //line(x, y + size, x + size, y);
    } 
    */

    x += size;

    if (x + size > width) {
        x = 0;
        probability += 1 / (height / size);
        y += size;
    }

    if (y + size > height) {
        return;
    }

}

function keyPressed() {
    if(key === 's' || key === 'S') {
      save("plot" + frameCount + ".svg");
  }
}