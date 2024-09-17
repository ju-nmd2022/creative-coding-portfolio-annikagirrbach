function setup() {
    createCanvas(800, 600);
    frameRate(60);
    background(255, 195, 11);
    noLoop();
}

function drawHex(centerX, centerY, radius, angle) {
    push();
    translate(centerX, centerY);
    rotate(angle);
    stroke(205, 165, 20);
    strokeWeight(2);
    fill(252, 230, 30);
    beginShape();
    for (let i = 0; i < 6; i++) {
        let a = TWO_PI / 6 * i;
        let x = radius * cos(a);
        let y = radius * sin(a);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
}

function draw() {
    background(255, 195, 11);
    
    let radius = 50;
    let spacing = 0;

    let hexWidth = sqrt(3) * radius + spacing;
    let hexHeight = 1.5 * radius + spacing;

    for (let y = 0; y * hexHeight < height + 2 * radius; y++) {
        for (let x = 0; x * hexWidth < width + radius; x++) {
            let xPos = x * hexWidth + (y % 2) * (hexWidth / 2);
            let yPos = y * hexHeight;
            
            let angle = frameCount * 0.01;
            drawHex(xPos, yPos, radius, angle);
        }
    }
    
    loop();
}
