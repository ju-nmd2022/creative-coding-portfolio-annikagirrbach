let points = [];

function setup() {
    createCanvas(800, 600);
    frameRate(60);
    background(255, 195, 11);
    noLoop();

    for (let i = 0; i < 20; i++) {
        points.push({
            x: random(width),
            y: random(height),
            speed: random(1, 3),
            radius: random(5, 10),
            direction: random(TWO_PI)
        });
    }
}

function drawHex(centerX, centerY, radius) {
    push();
    translate(centerX, centerY);
    stroke(205, 165, 20);
    strokeWeight(5);
    fill(252, 230, 30);
    rotate(189);
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
    background(255, 195, 11);
    
    let radius = 50;
    let spacing = 0;

    let hexWidth = sqrt(3) * radius + spacing;
    let hexHeight = 1.5 * radius + spacing;

    for (let y = 0; y * hexHeight < height + radius; y++) {
        for (let x = 0; x * hexWidth < width + radius; x++) {
            let xPos = x * hexWidth + (y % 2) * (hexWidth / 2);
            let yPos = y * hexHeight;
            drawHex(xPos, yPos, radius);
        }
    }

    fill(101, 67, 33);
    noStroke();
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        ellipse(p.x, p.y, p.radius * 2);

        p.x += p.speed * cos(p.direction);
        p.y += p.speed * sin(p.direction);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
    }

    requestAnimationFrame(draw);
}