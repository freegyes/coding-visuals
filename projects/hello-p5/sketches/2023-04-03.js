const paperWidth = 1760-100;
const paperHeight = 1250-100;

function setup(){
    createCanvas(paperWidth/2, paperHeight/2);
    rectMode(CENTER);
}

let x = 0;

function draw(){
    background("white");
    noFill();
    stroke(1,40);
    circle(width/2+x,height/2+x,width/3);
}