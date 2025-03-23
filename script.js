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

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registrationModal");
    const closeModal = document.querySelector(".modal-close");
    const choosePlanBtns = document.querySelectorAll(".choose-plan");
    const form = document.getElementById('registrationForm');

    choosePlanBtns.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const icon = button.querySelector("i");
            icon.classList.toggle("rotate");
            modal.style.display = "flex";
            modal.classList.add("show");
        });
    });

    closeModal.addEventListener("click", () => closeModalFunction());
    window.addEventListener("click", (event) => {
        if (event.target === modal) closeModalFunction();
    });

    function closeModalFunction() {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.success) closeModalFunction();
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert("Erreur lors de l'inscription.");
        });
    });
});












    
    


    
    





