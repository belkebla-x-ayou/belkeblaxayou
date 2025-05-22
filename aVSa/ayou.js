// c:\Users\ayoub\OneDrive\المستندات\aVSa\ayou.js
let currentPageNumber = 1; // Page actuelle (commence à 1)
const pages = []; // Tableau pour stocker les éléments de page
let totalPages = 0; // Nombre total de pages

// Cette fonction s'exécute une fois que tout le HTML est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les éléments avec la classe 'page' dans la div 'book'
    const pageElements = document.querySelectorAll('.book .page');
    pageElements.forEach(page => pages.push(page)); // Ajoute chaque page au tableau 'pages'
    totalPages = pages.length; // Définit le nombre total de pages

    if (totalPages > 0) {
        // Trouve si une page est déjà marquée comme 'active-page' dans le HTML
        const activePageIndex = pages.findIndex(page => page.classList.contains('active-page'));
        
        if (activePageIndex !== -1) {
            currentPageNumber = activePageIndex + 1; // Définit la page actuelle
        } else {
            currentPageNumber = 1; // Par défaut, la première page est active
            pages[0].classList.add('active-page'); // Ajoute la classe 'active-page' à la première page
        }
        
        updatePageDisplay(); // Affiche la page correcte
        updateNavigationButtons(); // Met à jour l'état des boutons de navigation
    }
});

// Fonction pour afficher la page actuelle et cacher les autres
function updatePageDisplay() {
    if (totalPages === 0) return; // Ne fait rien s'il n'y a pas de pages

    pages.forEach((page, index) => {
        if ((index + 1) === currentPageNumber) {
            page.style.display = 'block'; // Affiche la page actuelle
            page.classList.add('active-page'); // S'assure qu'elle a la classe active
        } else {
            page.style.display = 'none'; // Cache les autres pages
            page.classList.remove('active-page'); // Retire la classe active des autres pages
        }
    });

    // Met à jour l'indicateur de page (ex: "Page 1 / 4")
    const pageIndicator = document.getElementById('pageIndicator');
    if (pageIndicator) {
        pageIndicator.textContent = `Page ${currentPageNumber} / ${totalPages}`;
    }
}

// Fonction pour activer/désactiver les boutons Précédent/Suivant
function updateNavigationButtons() {
    if (totalPages === 0) return;

    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const pageJumpButtons = document.querySelectorAll('.page-jump-button');

    if (prevButton) {
        prevButton.disabled = (currentPageNumber <= 1); // Désactive "Précédent" si sur la première page
    }
    if (nextButton) {
        nextButton.disabled = (currentPageNumber >= totalPages); // Désactive "Suivant" si sur la dernière page
    }

    // Optionnel: style pour le bouton de la page actuelle
    pageJumpButtons.forEach(button => {
        const pageNum = parseInt(button.dataset.page);
        if (pageNum === currentPageNumber) {
            button.classList.add('active-nav-button'); 
        } else {
            button.classList.remove('active-nav-button');
        }
    });
}

// Fonction pour aller à une page spécifique
function goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        currentPageNumber = pageNumber;
        updatePageDisplay();
        updateNavigationButtons();
    }
}

// Fonction pour aller à la page suivante
function nextPage() {
    if (currentPageNumber < totalPages) {
        currentPageNumber++;
        updatePageDisplay();
        updateNavigationButtons();
    }
}

// Fonction pour aller à la page précédente
function prevPage() {
    if (currentPageNumber > 1) {
        currentPageNumber--;
        updatePageDisplay();
        updateNavigationButtons();
    }
}
