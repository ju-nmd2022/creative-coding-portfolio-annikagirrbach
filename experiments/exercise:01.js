function setup() {
    createCanvas (800, 800);
    background (255, 195, 11);
}

function drawHex(centerX, centerY, radius) {
    push();
    translate(250, 300);
    noStroke();
    fill(0);
    for(let slice = 1; slice <= 6; slice++){
    drawLine(40, slice * 60);
    }
    pop();
}

function drawLine(length, rotation) {
    push();
    angleMode(DEGREES);
    rotate(rotation);
    noFill();
    stroke(0);
    strokeWeight(1);
    line(-(length/2), (PI * length/ 3), (length/2), (PI * length/ 3));
    pop();

}

function draw() {

    drawHex();
}