let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Masquer l'élément vidéo par défaut
}

function draw() {
  background(220);
  video.loadPixels();
  
  for (let y = 0; y < video.height; y += 10) {
    for (let x = 0; x < video.width; x += 10) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      // Calculer la luminosité (moyenne des valeurs RGB)
      let brightness = (r + g + b) / 3;
      
      // Taille du cercle inversement proportionnelle à la luminosité
      let radius = map(brightness, 0, 255, 10, 1);
      
      fill(r, g, b);
      noStroke();
      ellipse(x, y, radius, radius);
    }
  }
}