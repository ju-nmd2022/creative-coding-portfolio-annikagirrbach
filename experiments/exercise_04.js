function setup() {
    createCanvas(800, 800);
    frameRate(60);
    background(15, 140, 121);
    noLoop();
}

function drawHex(centerX, centerY, radius) {
    push();
    translate(centerX, centerY);
    stroke(205, 165, 20);
    strokeWeight(2);
    fill(255);
    beginShape();
    for (let i = 0; i < 6; i++) {
        let angle = TWO_PI / 6 * i;
        let x = radius * cos(angle);
        let y = radius * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}

function draw() {
    let radius = 50;
    let spacing = 13;
    let hexWidth = sqrt(3) * radius + spacing;
    let hexHeight = 1.5 * radius + spacing;

    for (let y = 0; y * hexHeight < height + 4 * radius; y++) {
        for (let x = 0; x * hexWidth < width + radius; x++) {
            let xPos = x * hexWidth + (y % 2) * (hexWidth / 2);
            let yPos = y * hexHeight;
            drawHex(xPos, yPos, radius);
        }
    }
}