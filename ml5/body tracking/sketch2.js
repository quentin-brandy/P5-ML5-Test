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
let ball = { x: 0, y: 0, vx: 0, vy: 0, active: false };

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
            shootBall(leftElbow, leftWrist);
        }

        // Draw right arm
        if (rightElbow.confidence > 0.1 && rightWrist.confidence > 0.1) {
            stroke(255, 0, 0);
            strokeWeight(2);
            line(rightElbow.x, rightElbow.y, rightWrist.x, rightWrist.y);
            shootBall(rightElbow, rightWrist);
        }
    }

    // Draw the ball
    if (ball.active) {
        fill(0, 0, 255);
        noStroke();
        circle(ball.x, ball.y, 10);
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Deactivate the ball if it goes off screen
        if (ball.x < 0 || ball.x > width || ball.y < 0 || ball.y > height) {
            ball.active = false;
        }
    }
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
    // Save the output to the poses variable
    poses = results;
}

// Function to shoot a ball in the direction of the arm
function shootBall(elbow, wrist) {
    if (!ball.active) {
        let dx = wrist.x - elbow.x;
        let dy = wrist.y - elbow.y;
        let magnitude = sqrt(dx * dx + dy * dy);
        ball.x = wrist.x;
        ball.y = wrist.y;
        ball.vx = (dx / magnitude) * 5;
        ball.vy = (dy / magnitude) * 5;
        ball.active = true;
    }
}
