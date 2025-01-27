let video;
let pixelSkip = 8;
let circleSize = 8;
let targetColor;
let threshold = 50;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    // Définir directement la couleur cible (par exemple, rouge)
    targetColor = color(255, 255, 255); // Rouge pur
}

function draw() {
    background(0);
    image(video, 0, 0);
    findTargetPixels();
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
