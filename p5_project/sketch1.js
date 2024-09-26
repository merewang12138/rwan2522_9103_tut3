 //We need a variable to hold our image
let img;

//We will divide the image into segments
let numSegments = 50;

//We will store the segments in an array
let segments = [];

//Lets make a variable to store the colour of the pixel at the mouse position
//We will set it to black to start with using the built in color constructor
let pixelColour = null;

//lets load the image from disk
function preload() {
  img = loadImage('assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup() {
  //We will make the canvas the same size as the image using its properties
  createCanvas(img.width, img.height);
  //We can use the width and height of the image to calculate the size of each segment
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  pixelColour = color(0);   
  
  /*
  Divide the original image into segments, we are going to use nested loops
  lets have a look at how nested loops work
  first we use a loop to move down the image, 
  we will use the height of the image as the limit of the loop
  then we use a loop to move across the image, 
  we will use the width of the image as the limit of the loop
  Lets look carefully at what happens, the outer loop runs once, so we start at the top of the image
  Then the inner loop runs to completetion, moving from left to right across the image
  Then the outer loop runs again, moving down 1 row image, and the inner loop runs again,
  moving all the way from left to right
  */

  for (let segYPos=0; segYPos<img.height; segYPos+=segmentHeight) {
    //this is looping over the height
    for (let segXPos=0; segXPos<img.width; segXPos+=segmentWidth) {
      //this loops over width
      //This will create a segment for each x and y position

      let segment = new ImageSegment(segXPos,segYPos,segmentWidth,segmentHeight);
      segments.push(segment);
    }
  }
}

function draw() {
  background(220);
  //lets draw the image to the canvas
  image(img, 0, 0);

  //lets draw the segments to the canvas,
  //we will use a for of loop to loop over the segments array
  for (const segment of segments) {
    segment.draw();
  }

  //Lets draw a circle with the colour of the pixel at the mouse position
  fill(pixelColour);
  stroke(255);
  circle(mouseX, mouseY, 40);
  
}

//We add the mouse moved function to get the colour of the pixel at the mouse position
function mouseMoved(){
  //lets get the colour of the pixel from the image at the mouse position
  pixelColour = img.get(mouseX, mouseY);
}

//Here is our class for the image segments, we start with the class keyword
class ImageSegment {
  /*
  then we give the class a constructor, this is a special function that runs
  when we create a new instance of the class
  this constructor takes 4 parameters, the x and y position of the segment in the image
  and the width and height of the segment
  */
  constructor(srcImgSegXPosInPrm,srcImgSegYPosInPrm,srcImgSegWidthInPrm,srcImgSegHeightInPrm) {
    //these parameters are used to set the internal properties of an instance of the segment
    //These parameters are named as imageSource as they are derived from the image we are using
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
  }

  draw() {
    //lets draw the segment to the canvas, for now we will draw it 
    //as an empty rectangle so we can see it
    noFill();
    stroke(0);
    rect(this.srcImgSegXPos,this.srcImgSegYPos,this.srcImgSegWidth,this.srcImgSegHeight);
  }
}
