/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates drawing skeletons on poses for the MoveNet model.
 */

let video;
let bodyPose;
let poses = [];
let connections;
let square = { x: 320, y: 480, size: 20, speed: 2 };

function preload() {
    // Load the bodyPose model
    bodyPose = ml5.bodyPose();
}

function setup() {
    createCanvas(640, 480);

    // Create the video and hide it
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    // Start detecting poses in the webcam video
    bodyPose.detectStart(video, gotPoses);
    // Get the skeleton connection information
    connections = bodyPose.getSkeleton();
}

function draw() {
    // Draw the webcam video
    image(video, 0, 0, width, height);

    // Draw the skeleton connections and track the arm
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        let leftElbow = pose.keypoints[7];
        let leftWrist = pose.keypoints[9];
        let rightElbow = pose.keypoints[8];
        let rightWrist = pose.keypoints[10];

        // Draw left arm
        if (leftElbow.confidence > 0.1 && leftWrist.confidence > 0.1) {
            stroke(255, 0, 0);
            strokeWeight(2);
            line(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y);
            checkArmOpen(leftElbow, leftWrist);
        }

        // Draw right arm
        if (rightElbow.confidence > 0.1 && rightWrist.confidence > 0.1) {
            stroke(255, 0, 0);
            strokeWeight(2);
            line(rightElbow.x, rightElbow.y, rightWrist.x, rightWrist.y);
            checkArmOpen(rightElbow, rightWrist);
        }
    }

    // Draw the square
    fill(0, 0, 255);
    noStroke();
    rect(square.x, square.y, square.size, square.size);

    // Move the square up if the arm is open
    if (square.y > 0) {
        square.y -= square.speed;
    }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
    // Save the output to the poses variable
    poses = results;
}

// Function to check if the arm is open
function checkArmOpen(elbow, wrist) {
    let dx = wrist.x - elbow.x;
    let dy = wrist.y - elbow.y;
    let distance = sqrt(dx * dx + dy * dy);

    // If the distance between elbow and wrist is greater than a threshold, move the square up
    if (distance > 50) {
        square.y -= square.speed;
    }
}
let ball = { x: width / 2, y: height / 2, size: 15, speedX: 3, speedY: 3 };
let leftPaddle = { x: 20, y: height / 2 - 50, width: 10, height: 100 };
let rightPaddle = { x: width - 30, y: height / 2 - 50, width: 10, height: 100 };

function draw() {
    // Draw the webcam video
    image(video, 0, 0, width, height);

    // Draw the skeleton connections and track the arms
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        let leftElbow = pose.keypoints[7];
        let leftWrist = pose.keypoints[9];
        let rightElbow = pose.keypoints[8];
        let rightWrist = pose.keypoints[10];

        // Draw left arm
        if (leftElbow.confidence > 0.1 && leftWrist.confidence > 0.1) {
            stroke(255, 0, 0);
            strokeWeight(2);
            line(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y);
            leftPaddle.y = leftWrist.y - leftPaddle.height / 2;
        }

        // Draw right arm
        if (rightElbow.confidence > 0.1 && rightWrist.confidence > 0.1) {
            stroke(255, 0, 0);
            strokeWeight(2);
            line(rightElbow.x, rightElbow.y, rightWrist.x, rightWrist.y);
            rightPaddle.y = rightWrist.y - rightPaddle.height / 2;
        }
    }

    // Draw paddles
    fill(255);
    rect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    rect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Draw the ball
    ellipse(ball.x, ball.y, ball.size);

    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom
    if (ball.y < 0 || ball.y > height) {
        ball.speedY *= -1;
    }

    // Ball collision with paddles
    if (ball.x - ball.size / 2 < leftPaddle.x + leftPaddle.width &&
        ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
        ball.speedX *= -1;
    }

    if (ball.x + ball.size / 2 > rightPaddle.x &&
        ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
        ball.speedX *= -1;
    }

    // Ball out of bounds
    if (ball.x < 0 || ball.x > width) {
        ball.x = width / 2;
        ball.y = height / 2;
        ball.speedX *= -1;
    }
}