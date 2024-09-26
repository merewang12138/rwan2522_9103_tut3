let t = 0; // time variable for animation

function setup() {
  createCanvas(400, 400);
  noFill(); // No fill, only stroke for the hand-drawn look
  stroke(0); // Black stroke to imitate hand-drawn lines
  strokeWeight(2); // Slightly thicker lines for emphasis
}

function draw() {
  background(255); // White background
  
  // Begin drawing the shape
  beginShape();
  for (let i = 0; i < TWO_PI; i += 0.1) {
    let xoff = cos(i) + 1; // Perlin noise offset in the x direction
    let yoff = sin(i) + 1; // Perlin noise offset in the y direction
    let r = map(noise(xoff + t, yoff + t), 0, 1, 100, 150); // Use noise to vary radius
    let x = r * cos(i) + width / 2; // X position of the vertex
    let y = r * sin(i) + height / 2; // Y position of the vertex
    vertex(x, y); // Draw vertex at calculated position
  }
  endShape(CLOSE); // Complete the shape by connecting the last vertex to the first
  
  t += 0.01; // Increment time for smooth noise transition
}
