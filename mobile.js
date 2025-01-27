let video;
let pixelSkip = 8;
let circleSize = 8;

function setup() {
    // Création d'un canvas qui s'adapte à la taille de l'écran
    createCanvas(windowWidth, windowHeight);
    
    // Configuration des options de la caméra
    let constraints = {
        video: {
            facingMode: {
                ideal: "environment" // Utilise la caméra arrière
                // Pour la caméra frontale, utilisez "user" à la place de "environment"
            }
        }
    };
    
    // Création de la capture vidéo avec les contraintes
    video = createCapture(constraints);
    video.size(windowWidth, windowHeight);
    video.hide();
}

// Ajoutez cette fonction pour redimensionner le canvas si la taille de la fenêtre change
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    video.size(windowWidth, windowHeight);
}
