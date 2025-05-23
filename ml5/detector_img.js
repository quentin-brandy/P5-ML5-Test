// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let detector;
let detections = [];
let detecting = false;
let img = null;


function preload(){
  img = loadImage("images/5f89ae6ee5f7e.jpeg")
  detector = ml5.objectDetector('cocossd', modelReady);
}


function modelReady() {
  // Models available are 'cocossd', 'yolo'
  detecting = true;
  detector.detect(img, gotDetections);
}
function setup() {
  createCanvas(img.width , img.height);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(img, gotDetections);
}
// Removed duplicate modelReady function


function draw() {
  image(img, 0, 0);

  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(`${object.label} (${nf(object.confidence * 100, 0, 2)}%)`, object.x + 10, object.y + 24);
  }
}
