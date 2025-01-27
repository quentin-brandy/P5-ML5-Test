let video;
let pixelSkip = 8; // Augmenté à 8 pour plus de performance
let circleSize = 8; // Taille fixe des cercles

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
}

function draw() {
    background(0);
    image(video, 0, 0);
    if (targetColor) {
        findTargetPixels();
    }
}

let targetColor;
let threshold = 30;

function mousePressed() {
    let x = constrain(mouseX, 0, width-1);
    let y = constrain(mouseY, 0, height-1);
    targetColor = video.get(x, y);
}

function isColorSimilar(c1, c2) {
    return abs(red(c1) - red(c2)) < threshold &&
           abs(green(c1) - green(c2)) < threshold &&
           abs(blue(c1) - blue(c2)) < threshold;
}

function findTargetPixels() {
    video.loadPixels();
    let sumX = 0, sumY = 0, count = 0;
    
    for (let y = 0; y < height; y += pixelSkip) {
        for (let x = 0; x < width; x += pixelSkip) {
            let index = (y * width + x) * 4;
            let pixelColor = color(
                video.pixels[index],
                video.pixels[index + 1],
                video.pixels[index + 2]
            );
            
            if (isColorSimilar(pixelColor, targetColor)) {
                // Dessine un simple cercle au lieu de copier l'image
                fill(255, 0, 0);
                noStroke();
                circle(x, y, circleSize);
                sumX += x;
                sumY += y;
                count++;
            }
        }
    }
    
    if (count > 0) {
        let centerX = sumX / count;
        let centerY = sumY / count;
        fill(0, 255, 0);
        circle(centerX, centerY, 15);
    }
}
