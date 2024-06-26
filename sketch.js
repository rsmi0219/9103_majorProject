let circleDiameter;
let circles = []; // Array for big circles
let bgCircles = []; // Array for all the small background circles
let bgCircleAmount = 400; 

// arrays for the X and Y coordinates for the orange lines
let wavylineX = [2.8, 8.9, 14.9, 0.7, 6.8, 12.7, 19.2, -0.3, 5.8, 11.5, 17.4, 4.3, 10, 16];
let wavylineY = [2.7, 1, 0, 8.9, 7.7, 6.8, 4.2, 15.2, 13.5, 12.8, 10.5, 19.5, 18.5, 17];


//These are the colours as in the original artwork
let circleColors = [
  [210, 266, 248],
  [250, 181, 37],
  [255, 231, 233],
  [237, 213, 148],
  [220, 255, 237],
  [252, 179, 138],
  [239, 174, 49],
  [197, 254, 254],
  [251, 222, 131],
  [255, 235, 245],
  [255, 249, 239],
  [255, 247, 248],
  [255, 208, 139],
  [253, 220, 62]
];

//Draw all the wavy lines
function wavyLines(linesX, linesY, lineWeight, lineR, lineG, lineB) {
  noFill();
  stroke(lineR, lineG, lineB);
  strokeWeight(lineWeight);

  beginShape();
  var xoff = 0;
  var yoff = 0.0;
  let noiseY = 0.05;
  let radius = (windowHeight / 20) * 4.2;

  for (var a = 0; a < TWO_PI; a += 0.1) {
    var offset = map(noise(xoff, noiseY), 0, 1, -15, 5);
    var r = radius + offset;
    var x = (windowHeight/20)*linesX + 0.8*r * cos(a);
    var y = (windowHeight/20)*linesY + 0.8*r * sin(a);
    vertex(x, y);
    xoff += 0.5;
  }
  endShape();
}

// Class for small random background circles
class BgCirclePattern {
  constructor(xPos, yPos, radius) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.color = color(30, 100, 100) // radom hue value for the colors using HSB, rest is set (changed later in code)
    // These colours are not animated, but different every time
  }

  update () {
    // Adjust the colours of the small background circles
      //with the mouse position to change them when hovering over the screen
      // Map mouseX to a range between 0 and 360 for the hue
  
      let hue = map(mouseX, 0, windowWidth, 0, 360);
      // Update the colour with the new hue value
      this.color = color(hue, 10, 200); // Keeping saturation and brightness constant
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.xPos, this.yPos, this.radius * 2);
  }

}


// Class for the biggest Circle Pattern
class CirclePattern {
  constructor(xFactor, yFactor, color) {
    this.xFactor = xFactor;
    this.yFactor = yFactor;
    this.smallCircles = this.generateRandomSmallCircles();
    this.colour = color;
  
  }

  display() {
    fill(this.colour);
    let x = this.xFactor * windowHeight / 20;
    let y = this.yFactor * windowHeight / 20;
    circle(x, y, circleDiameter);

    this.drawRandomSmallCircles();
    this.drawNestedCircles(x, y);
  }

  //Now we add a click function for if a Big circle is clicked
  //I used the coding train video for this code:
  // https://www.youtube.com/watch?v=DEHsr4XicN8&lc=Ugg7r6_9i0CEnHgCoAEC&ab_channel=TheCodingTrain

  isClicked(mx, my) {
    let d = dist(mx, my, this.xPos, this.yPos);
    return d < this.radius;
  }

  //Function for if it is clicked the colour changes to one of the palette colours
  changeColor() {
    this.color = getPaletteColor([random(255), random(255), random(255)]);
  }

  //I changed the array here to each individual circle to be able to choose which circle I wanted animated
  // & made the other circles white and black for contrast and a bit more tranquility in the whole piece.

  drawNestedCircles(x, y) {
    let r2 = windowHeight / 20 * 1.5;
    fill(255,255,255); 
    circle(x, y, r2 * 2);

    let r3 = windowHeight / 20 * 1.35;
    fill(([random(255), random(255), random(255)])); // I want this to change colours randomly
    circle(x, y, r3 * 2);

    let r4 = windowHeight / 20 * 0.5;
    fill(255,255,255); 
    circle(x, y, r4 * 2);

    let r5 = windowHeight / 20 * 1.2;
    fill(0,0,0);
    circle(x, y, r5 * 2);

    let r6 = windowHeight / 20 * 1.0;
    fill(255,255,255);
    circle(x, y, r6 * 2);

    let r7 = windowHeight / 20 * 0.8;
    fill(([random(255), random(255), random(255)])); // I want this to change colours randomly
    circle(x, y, r7 * 2);

    let r8 = windowHeight / 20 * 0.6;
    fill(255,255,255);
    circle(x, y, r8 * 2);

    let r9 = windowHeight / 20 * 0.4;
    fill(([random(255), random(255), random(255)])); // I want the innercircle to change colours randomly
    circle(x, y, r9 * 2);
    }

    // these are the randomcircles within the big circles that are only drawn
    //if they are in the bigger circle
  generateRandomSmallCircles() {
    let smallCircles = [];
    let x = this.xFactor * windowHeight / 20;
    let y = this.yFactor * windowHeight / 20;
    let radius = circleDiameter / 2;
    let smallCircleDiameter = windowHeight/90;
    let maxAttempts = 10000;
    let attempts = 0;

    while (smallCircles.length < 100 && attempts < maxAttempts) {
      let angle = random(TWO_PI);
      let distance = random(radius - smallCircleDiameter / 2);
      let randX = x + distance * cos(angle);
      let randY = y + distance * sin(angle);
      //the tiny circles have random colours, I will leave those the same for balance in the image
      let randColor = color(random(255), random(255), random(255)); 
      let newCircle = { x: randX, y: randY, color: randColor };

      if (this.isValidPosition(newCircle, smallCircles, smallCircleDiameter)) {
        smallCircles.push(newCircle);
      }

      attempts++;
    }

    return smallCircles;
  }

  //draw if it is true that they are inside big circle
  isValidPosition(newCircle, smallCircles, diameter) {
    for (let circle of smallCircles) {
      let distance = dist(newCircle.x, newCircle.y, circle.x, circle.y);
      if (distance < diameter) {
        return false;
      }
    }
    return true;
  }

  // draw these tiny random circles
  drawRandomSmallCircles() {
    let smallCircleDiameter = 10;
    noStroke();
    for (let smallCircle of this.smallCircles) {
      fill(smallCircle.color);
      circle(smallCircle.x, smallCircle.y, smallCircleDiameter);
    }
  }

  getX() {
    return this.xFactor * windowHeight / 20;
  }

  getY() {
    return this.yFactor * windowHeight / 20;
  }

  //This is the function for changing the big circles if they are clicked
  //Check first which circle is clicked
  isClicked(mx, my) {
    let x = this.getX();
    let y = this.getY();
    let d = dist(mx, my, x, y);
    return d < circleDiameter / 2;
  }

  //then change a clicked circle to a colour from my chosen colourpalette
  changeColor() {
    this.colour = getPaletteColor([random(255), random(255), random(255)]);
  }
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(5, 89, 127);
  circleDiameter = (windowHeight / 20) * 5.5;

    // Set the frameRate lower to have colours changing slower
  //Framerate derived from https://p5js.org/reference/#/p5/frameRate 
  frameRate(5);
  
  //for creating an array with colours this tutorial was inspiration:
  //https://happycoding.io/tutorials/p5js/images/image-palette
  palette = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(0),
    color(255)
  ];

  for (let i = 0; i < wavylineX.length; i++) {
    circles.push(new CirclePattern(wavylineX[i], wavylineY[i], circleColors[i]));
  }

  //background circles do not overlap each other
  for (let i = 0; i < bgCircleAmount; i++) {
    let overlapping = true;
    let bgCircle;
    while (overlapping) {
      overlapping = false;
      bgCircle = new BgCirclePattern(random(width), random(height), random(1, 10));
      for (let other of bgCircles) {
        let d = dist(bgCircle.xPos, bgCircle.yPos, other.xPos, other.yPos);
        if (d < bgCircle.radius + other.radius) {
          overlapping = true;
          break;
        }
      }

      //background Circles do not overlap the big Circles
      for (let bigCircle of circles) {
        let d = dist(bgCircle.xPos, bgCircle.yPos, bigCircle.getX(), bigCircle.getY());
        if (d < bgCircle.radius + circleDiameter / 2 + 15) {
          overlapping = true;
          break;
        }
      }
    }
    bgCircles.push(bgCircle);
  }
}

function draw() {
  background(5, 89, 127);
    
  //draw the lines

  for (let t = 0; t < wavylineX.length; t++) {
    wavyLines(wavylineX[t], wavylineY[t], 5, 244, 198, 226);
  }

   //draw the lines
  for (let t = 0; t < wavylineX.length; t++) {
    wavyLines(wavylineX[t], wavylineY[t], 2, 134, 198, 226);
  }

   //draw the background circles
  for (let bgCircle of bgCircles) {
    bgCircle.update();
    bgCircle.display();
  }

  // draw the big circles
  for (let circle of circles) {
    circle.display();
  }
}


//This is the function for my colour palette
function getPaletteColor(circleColors) {
  const imgR = red(circleColors);
  const imgG = green(circleColors);
  const imgB = blue(circleColors);

  let minDistance = 999999;
  let targetColor;

  for (const c of palette) {
    const paletteR = red(c);
    const paletteG = green(c);
    const paletteB = blue(c);

    const colorDistance = dist(imgR, imgG, imgB, paletteR, paletteG, paletteB);

    if (colorDistance < minDistance) {
      targetColor = c;
      minDistance = colorDistance;
    }
  }

  return targetColor;
}

//The function mousepressed for colour changing from the big circles
function mousePressed() {
  for (let circle of circles) {
    if (circle.isClicked(mouseX, mouseY)) {
      circle.changeColor();
    }
  }

}


//Lastly resize the canvas only to windowHeight to keep the artwork squared

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
  circleDiameter = (windowHeight / 20) * 5.5;
  smallCircleDiameter = windowHeight/90;
  
  draw();
}
