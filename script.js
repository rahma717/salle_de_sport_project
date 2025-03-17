const arrowRightElement = document.querySelector(".arrow_right");
const arrowLeftElement = document.querySelector(".arrow_left");
const divDotsElement = document.querySelector(".dots");
const bannerImg = document.querySelector(".banner-img");

let selectedImage = 0;

const slides = [
    { "image": "assets/images/slide1.jpg" },
    { "image": "assets/images/slide2.jpg" },
    { "image": "assets/images/slide3.jpg" },
    { "image": "assets/images/slide4.jpg" }
];

// 🔹 Fonction pour changer l'image
function changeImage() {
    bannerImg.src = slides[selectedImage].image;
}

// 🔹 Fonction pour gérer les dots
function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("dot_selected", index === selectedImage);
    });
}

// 🔹 Ajout des dots dynamiquement au chargement
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === selectedImage) dot.classList.add("dot_selected");

        dot.addEventListener("click", () => {
            selectedImage = index;
            changeImage();
            updateDots();
        });

        divDotsElement.appendChild(dot);
    });
}

// 🔹 Flèche droite (aller à l'image suivante)
arrowRightElement.addEventListener("click", () => {
    selectedImage = (selectedImage + 1) % slides.length;
    changeImage();
    updateDots();
});

// 🔹 Flèche gauche (aller à l'image précédente)
arrowLeftElement.addEventListener("click", () => {
    selectedImage = (selectedImage - 1 + slides.length) % slides.length;
    changeImage();
    updateDots();
});

// 🔹 Initialisation
createDots();
changeImage();
// 🔹 Défilement automatique du carrousel toutes les 3 secondes
let autoSlide = setInterval(() => {
    selectedImage = (selectedImage + 1) % slides.length;
    changeImage();
    updateDots();
}, 3000);

// 🔹 Arrêter le carrousel automatique lors du survol
document.querySelector(".carousel").addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

//  Reprendre le carrousel automatique lorsque la souris quitte
document.querySelector(".carousel").addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
        selectedImage = (selectedImage + 1) % slides.length;
        changeImage();
        updateDots();
    }, 3000);
});
//
document.querySelectorAll(".choose-plan").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const icon = this.querySelector("i");
        icon.classList.toggle("rotate");
    });
});

