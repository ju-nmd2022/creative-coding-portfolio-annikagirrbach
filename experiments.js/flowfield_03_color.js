let particles = [];
const num = 10000;

const noiseScale = 0.01;

function setup() {
    createCanvas (750, 570);
    //colorMode(HSB, 255);
    for(let i = 0; i < num; i++) {
        particles.push(createVector (random(width), random(height)));
    }
    stroke(255);
}

function draw() {
    background (0, 10);
    for(let i = 0; i < num; i++) {
        let p = particles[i];
        point(p.x, p.y);
        let n = noise(p.x * noiseScale, p.y * noiseScale); 
        let a = TAU * n;
        let hueValue = map(p.x, 0, width, 0, 255);
        let brightnessValue = map(p.y, 0, height, 255, 0);
        stroke(hueValue, 255, brightnessValue);
        p.x += cos(a);
        p.y += sin(a);
        if(!onScreen(p)) {
            p.x = random(width);
            p.y = random(height);
        }
    }
}

function mouseReleased() {
    noiseSeed(millis());
}

function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}