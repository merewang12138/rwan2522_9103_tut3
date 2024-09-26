// We need a variable to hold our image
let img;

// We will divide the image into segments
let numSegments = 10; // 10x10 grid

// We will store the segments in an array
let segments = [];

// Lets make a variable to control whether to draw segments or the raw image
let drawSegments = true;

// Lets load the image from disk
function preload() {
  img = loadImage('assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup() {
  // We will make the canvas the same size as the image using its properties
  createCanvas(img.width, img.height);
  
  // We can use the width and height of the image to calculate the size of each segment
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  // Divide the original image into segments, each with a color based on the center pixel
  for (let segYPos = 0; segYPos < img.height; segYPos += segmentHeight) {
    // This is looping over the height
    for (let segXPos = 0; segXPos < img.width; segXPos += segmentWidth) {
      // This loops over width
      // Retrieve the color from the center of each segment
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
      segments.push(segment);
    }
  }
}

function draw() {
  background(0); // Set background to black
  
  if (drawSegments) {
    // Draw the segments to the canvas
    for (const segment of segments) {
      // Scale each segment based on its distance from the mouse
      segment.scale = dist(segment.srcImgSegXPos, segment.srcImgSegYPos, mouseX, mouseY) / 100;
      segment.draw();
    }
  } else {
    // Draw the image to the canvas
    image(img, 0, 0);
  }
}

// Toggle the drawSegments boolean when the space bar is pressed
function keyPressed() {
  if (key == " ") {
    // Invert the drawSegments boolean
    drawSegments = !drawSegments;
  }
}

// Class for the image segments
class ImageSegment {
  constructor(srcImgSegXPosInPrm, srcImgSegYPosInPrm, srcImgSegWidthInPrm, srcImgSegHeightInPrm, srcImgSegColourInPrm) {
    // Set the internal properties of an instance of the segment
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
    this.scale = 1; // Default scale
  }

  draw() {
    // Draw the segment to the canvas with the color and scaling
    stroke(0); // Border color
    fill(this.srcImgSegColour); // Segment color
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth * this.scale, this.srcImgSegHeight * this.scale);
  }
}