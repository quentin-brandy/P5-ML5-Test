
// image classification
// /*
//  * 👋 Hello! This is an ml5.js example made and shared with ❤️.
//  * Learn more about the ml5.js project: https://ml5js.org/
//  * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
//  *
//  * This example demonstrates detecting objects in an image through ml5.imageClassifier.
//  */

// // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
// let classifier;

// // A variable to hold the image we want to classify
// let img;

// // Variables for displaying the results on the canvas
// let label = "";
// let confidence = "";

// function preload() {
//   classifier = ml5.imageClassifier("MobileNet");
//   img = loadImage("images/Vache-de-race-limousine-en-correze-2.jpg");
// }

// function setup() {
//   createCanvas(400, 400);
//   classifier.classify(img, gotResult);
//   image(img, 0, 0, width, height);
// }

// // Callback function for when classification has finished
// function gotResult(results) {
//   // The results are in an array ordered by confidence
//   console.log(results);

//   // Display the results on the canvas
//   fill(255);
//   stroke(0);
//   textSize(18);
//   label = "Label: " + results[0].label;
//   confidence = "Confidence: " + nf(results[0].confidence, 0, 2);
//   text(label, 10, 360);
//   text(confidence, 10, 380);
// }




// video


// /*
//  * 👋 Hello! This is an ml5.js example made and shared with ❤️.
//  * Learn more about the ml5.js project: https://ml5js.org/
//  * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
//  *
//  * This example demonstrates detecting objects in a live video through ml5.imageClassifier.
//  */

// // A variable to initialize the Image Classifier
 let classifier;

// // A variable to hold the video we want to classify
 let video;

// // Variable for displaying the results on the canvas
 let label = "Model loading...";

 function preload() {
   classifier = ml5.imageClassifier("DoodleNet"); // les 2 modles sont disponibles MobileNet // DoodleNet
 }

 function setup() {
   createCanvas(640, 480);
   background(255);

//   // Using webcam feed as video input, hiding html element to avoid duplicate with canvas
   video = createCapture(VIDEO);
   video.size(640, 480);
   video.hide();
   classifier.classifyStart(video, gotResult);
 }

 function draw() {
 //   Each video frame is painted on the canvas
   image(video, 0, 0);

 //   Printing class with the highest probability on the canvas
   fill(255);
   textSize(32);
   text(label, 20, 50);
 }

// // Callback function for when classification has finished
 function gotResult(results) {
//   // Update label variable which is displayed on the canvas
   label = results[0].label;
 }




// // doodlenet 

// // Initialize the Image Classifier method with DoodleNet.
// let classifier;

// // Two variable to hold the label and confidence of the result
// let clearButton;
// let resultsP;
// let canvas;

// function preload() {
//   classifier = ml5.imageClassifier("DoodleNet");
// }

// function setup() {
//   canvas = createCanvas(280, 280);
//   background(255);
//   classifier.classifyStart(canvas, gotResult);

//   // Create 'label' and 'confidence' div to hold results
//   resultsP = createP("label");
//   // Create a clear canvas button
//   clearButton = createButton("clear canvas");
//   clearButton.mousePressed(clearCanvas);
// }

// function clearCanvas() {
//   background(255);
// }

// function draw() {
//   strokeWeight(16);
//   stroke(0);
//   if (mouseIsPressed) {
//     line(pmouseX, pmouseY, mouseX, mouseY);
//   }
// }

// // A function to run when we get any errors and the results
// function gotResult(results) {
//   // The results are in an array ordered by confidence.
//   // console.log(results);
//   // Show the first label and confidence
//   let label = results[0].label;
//   let confidence = results[0].confidence;
//   resultsP.html(label + " " + nf(confidence, 0, 2));
// }
