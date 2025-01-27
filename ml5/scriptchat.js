const data = [
  { taille: 82, poids: 14, age: 10, animal: "chat" },
  { taille: 80, poids: 23, age: 10, animal: "chien" },
  { taille: 43, poids: 24, age: 13, animal: "chien" },
  { taille: 45, poids: 39, age: 10, animal: "chien" },
  { taille: 53, poids: 20, age: 10, animal: "chien" },
  { taille: 54, poids: 23, age: 6, animal: "chat" },
  { taille: 37, poids: 15, age: 1, animal: "chat" },
  { taille: 59, poids: 45, age: 12, animal: "chien" },
  { taille: 61, poids: 25, age: 5, animal: "chat" },
  { taille: 68, poids: 35, age: 13, animal: "chien" },
  { taille: 49, poids: 22, age: 4, animal: "chat" },
  { taille: 70, poids: 41, age: 8, animal: "chien" },
  { taille: 42, poids: 18, age: 3, animal: "chat" },
  { taille: 77, poids: 50, age: 7, animal: "chien" },
  { taille: 56, poids: 26, age: 6, animal: "chat" },
  { taille: 64, poids: 33, age: 9, animal: "chien" },
  { taille: 38, poids: 16, age: 2, animal: "chat" },
  { taille: 72, poids: 47, age: 11, animal: "chien" },
  { taille: 55, poids: 21, age: 4, animal: "chat" },
  { taille: 67, poids: 38, age: 8, animal: "chien" },
  { taille: 47, poids: 20, age: 3, animal: "chat" },
  { taille: 78, poids: 48, age: 9, animal: "chien" },
  { taille: 50, poids: 22, age: 5, animal: "chat" },
  { taille: 65, poids: 36, age: 7, animal: "chien" },
  { taille: 39, poids: 17, age: 2, animal: "chat" },
  { taille: 74, poids: 44, age: 10, animal: "chien" },
  { taille: 58, poids: 25, age: 6, animal: "chat" },
  { taille: 69, poids: 40, age: 8, animal: "chien" },
  { taille: 41, poids: 19, age: 3, animal: "chat" },
  { taille: 75, poids: 46, age: 9, animal: "chien" },
  { taille: 52, poids: 23, age: 5, animal: "chat" },
  { taille: 66, poids: 37, age: 7, animal: "chien" },
  { taille: 40, poids: 18, age: 2, animal: "chat" },
  { taille: 71, poids: 43, age: 11, animal: "chien" },
  { taille: 57, poids: 24, age: 6, animal: "chat" },
  { taille: 63, poids: 32, age: 8, animal: "chien" },
  { taille: 44, poids: 20, age: 3, animal: "chat" },
  { taille: 76, poids: 49, age: 9, animal: "chien" },
  { taille: 51, poids: 22, age: 5, animal: "chat" },
  { taille: 62, poids: 30, age: 7, animal: "chien" },
  { taille: 48, poids: 21, age: 4, animal: "chat" },
  { taille: 73, poids: 45, age: 10, animal: "chien" },
  { taille: 60, poids: 26, age: 6, animal: "chat" },
  { taille: 68, poids: 34, age: 8, animal: "chien" },
  { taille: 46, poids: 19, age: 3, animal: "chat" },
  { taille: 79, poids: 50, age: 9, animal: "chien" },
  { taille: 53, poids: 23, age: 5, animal: "chat" },
  { taille: 64, poids: 31, age: 7, animal: "chien" },
  { taille: 42, poids: 18, age: 2, animal: "chat" },
  { taille: 70, poids: 42, age: 8, animal: "chien" }
];

let regressor;
let tailleSlider, ageSlider;
let label = "training";

function setup() {
  createCanvas(640, 240);

  // For this example to work across all browsers
  // "webgl" or "cpu" needs to be set as the backend
  ml5.setBackend("webgl");

  // Step 2: set your neural network options
  let options = {
    task: "regression",
    debug: true,
  };

  // Step 3: initialize your neural network
  regressor = ml5.neuralNetwork(options);

  // Step 4: add data to the neural network
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let inputs = [item.taille,item.animal, item.age];
    let output = [ item.poids ];
    regressor.addData(inputs, output);
  }

  // Step 5: normalize your data;
  regressor.normalizeData();

  // Step 6: train your neural network
  const trainingOptions = {
    epochs: 40,
    batchSize: 12,
  };
  regressor.train(trainingOptions, finishedTraining);
}

// Step 7: use the trained model
function finishedTraining() {
  const input = [67,"chien", 12];
  regressor.predict(input, handleResults);
}


// Step 8: make a prediction
function predict() {
  const input = [tailleSlider.value(), ageSlider.value()];
  regressor.predict(input, handleResults);
}

function draw() {
  background(200);
  textAlign(CENTER, CENTER);
  textSize(64);
  text(label, width / 2, height / 2 + 80);
}

// Step 9: define a function to handle the results of your prediction
function handleResults(results) {
  label = `Poids: ${results[0].value.toFixed(2)}`;
}





















// EXO1 Q1
 
/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates training a color classifier through ml5.neuralNetwork.
 */

// Step 1: load data or create some data
 /*
const data = [
  { taille: 82, poids: 14, age: 10, animal: "chat" },
  { taille: 80, poids: 23, age: 10, animal: "chien" },
  { taille: 43, poids: 24, age: 13, animal: "chien" },
  { taille: 45, poids: 39, age: 10, animal: "chien" },
  { taille: 53, poids: 20, age: 10, animal: "chien" },
  { taille: 54, poids: 23, age: 6, animal: "chat" },
  { taille: 37, poids: 15, age: 1, animal: "chat" },
  { taille: 59, poids: 45, age: 12, animal: "chien" },
  { taille: 61, poids: 25, age: 5, animal: "chat" },
  { taille: 68, poids: 35, age: 13, animal: "chien" },
  { taille: 49, poids: 22, age: 4, animal: "chat" },
  { taille: 70, poids: 41, age: 8, animal: "chien" },
  { taille: 42, poids: 18, age: 3, animal: "chat" },
  { taille: 77, poids: 50, age: 7, animal: "chien" },
  { taille: 56, poids: 26, age: 6, animal: "chat" },
  { taille: 64, poids: 33, age: 9, animal: "chien" },
  { taille: 38, poids: 16, age: 2, animal: "chat" },
  { taille: 72, poids: 47, age: 11, animal: "chien" },
  { taille: 55, poids: 21, age: 4, animal: "chat" },
  { taille: 67, poids: 38, age: 8, animal: "chien" },
  { taille: 47, poids: 20, age: 3, animal: "chat" },
  { taille: 78, poids: 48, age: 9, animal: "chien" },
  { taille: 50, poids: 22, age: 5, animal: "chat" },
  { taille: 65, poids: 36, age: 7, animal: "chien" },
  { taille: 39, poids: 17, age: 2, animal: "chat" },
  { taille: 74, poids: 44, age: 10, animal: "chien" },
  { taille: 58, poids: 25, age: 6, animal: "chat" },
  { taille: 69, poids: 40, age: 8, animal: "chien" },
  { taille: 41, poids: 19, age: 3, animal: "chat" },
  { taille: 75, poids: 46, age: 9, animal: "chien" },
  { taille: 52, poids: 23, age: 5, animal: "chat" },
  { taille: 66, poids: 37, age: 7, animal: "chien" },
  { taille: 40, poids: 18, age: 2, animal: "chat" },
  { taille: 71, poids: 43, age: 11, animal: "chien" },
  { taille: 57, poids: 24, age: 6, animal: "chat" },
  { taille: 63, poids: 32, age: 8, animal: "chien" },
  { taille: 44, poids: 20, age: 3, animal: "chat" },
  { taille: 76, poids: 49, age: 9, animal: "chien" },
  { taille: 51, poids: 22, age: 5, animal: "chat" },
  { taille: 62, poids: 30, age: 7, animal: "chien" },
  { taille: 48, poids: 21, age: 4, animal: "chat" },
  { taille: 73, poids: 45, age: 10, animal: "chien" },
  { taille: 60, poids: 26, age: 6, animal: "chat" },
  { taille: 68, poids: 34, age: 8, animal: "chien" },
  { taille: 46, poids: 19, age: 3, animal: "chat" },
  { taille: 79, poids: 50, age: 9, animal: "chien" },
  { taille: 53, poids: 23, age: 5, animal: "chat" },
  { taille: 64, poids: 31, age: 7, animal: "chien" },
  { taille: 42, poids: 18, age: 2, animal: "chat" },
  { taille: 70, poids: 42, age: 8, animal: "chien" }
];

  
let classifier;
let tailleSlider, poidsSlider, ageSlider;
let label = "training";

function setup() {
  createCanvas(640, 240);

  // For this example to work across all browsers
  // "webgl" or "cpu" needs to be set as the backend
  ml5.setBackend("webgl");

  tailleSlider = createSlider(30, 80, 50).position(10, 20);
  poidsSlider = createSlider(10, 50, 30).position(10, 40);
  ageSlider = createSlider(1, 15, 7).position(10, 60);

  // Step 2: set your neural network options
  let options = {
    task: "classification",
    debug: true,
  };

  // Step 3: initialize your neural network
  classifier = ml5.neuralNetwork(options);

  // Step 4: add data to the neural network
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let inputs = [item.taille, item.poids, item.age];
    let outputs = [item.animal];
    classifier.addData(inputs, outputs);
  }

  // Step 5: normalize your data;
  classifier.normalizeData();

  // Step 6: train your neural network
  const trainingOptions = {
    epochs: 500,
    batchSize: 12,
  };
  classifier.train(trainingOptions, finishedTraining);
}

// Step 7: use the trained model
function finishedTraining() {
  classify();
}

// Step 8: make a classification
function classify() {
  const input = [tailleSlider.value(), poidsSlider.value(), ageSlider.value()];
  classifier.classify(input, handleResults);
}

function draw() {
  let taille = tailleSlider.value();
  let poids = poidsSlider.value();
  let age = ageSlider.value();
  background(200);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Taille: ${taille}`, width / 2, height / 2 - 40);
  text(`Poids: ${poids}`, width / 2, height / 2);
  text(`Age: ${age}`, width / 2, height / 2 + 40);
  textSize(64);
  text(label, width / 2, height / 2 + 80);
}

// Step 9: define a function to handle the results of your classification
function handleResults(results, error) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classify();
}
*/