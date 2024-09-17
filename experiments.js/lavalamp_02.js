let points = [];
let numPoints = 100;

function setup() {
  createCanvas(800, 600);
  noStroke();
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: random(width),
      y: random(height),
      ySpeed: random(-1, 1),
      size: random(20, 60)
    });
  }
}

function draw() {
  background(55, 0, 50);
  
  for (let point of points) {
    point.y -= point.ySpeed;
    
    if (point.y < 0) {
      point.y = height;
      point.x = random(width);
      point.ySpeed = random(-1, 1);
    }
    
    noStroke();
    fill(155, 0, 105, 50);
    ellipse(point.x, point.y, point.size * 1.5);
    
    fill(155, 0, 105);
    ellipse(point.x, point.y, point.size);
  }
}