let points = [];
let numPoints = 100;

function setup() {
  createCanvas(800, 600);
  noStroke();
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: random(width),
      y: random(height),
      ySpeed: random(-1, 1), // Geschwindigkeit des Aufsteigens
      size: random(20, 60) // Größe der Punkte
    });
  }
}

function draw() {
  background(55, 0, 50);
  
  for (let point of points) {
    // Update der y-Position der Punkte
    point.y -= point.ySpeed;
    
    // Rücksetzen, wenn die Punkte außerhalb des Sichtbereichs sind
    if (point.y < 0) {
      point.y = height;
      point.x = random(width);
      point.ySpeed = random(-1, 1);
    }
    
    // Zeichne die Punkte
    fill(155, 0, 105); // Farbe der Punkte (rot)
    ellipse(point.x, point.y, point.size);
  }
}