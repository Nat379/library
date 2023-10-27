// burger-menu
const burger = document.querySelector(".burger");
const burgerMenu = document.querySelector(".open-burger-menu ");
const menuIcons = document.querySelector(".menu-icons");

function showHide() {
    burgerMenu.classList.toggle("active");
}

function hideMenu() {
    burgerMenu.classList.remove("active");
}

burger.addEventListener("click", showHide);
menuIcons.addEventListener("click", hideMenu); 

// carousel

const CAROUSEL = document.querySelector(".carousel-wrapper");
const ARROW_BTNS = document.querySelectorAll(".arrow");
const FIRST_CARD_WIDTH = document.querySelector(".item").offsetWidth;
const PAGINATION_BTNS = document.querySelectorAll(".pagination-button button");

ARROW_BTNS.forEach(btn => {
    btn.addEventListener("click", () => {
        const newScrollLeft = btn.id === "btn-left" ? CAROUSEL.scrollLeft - FIRST_CARD_WIDTH : CAROUSEL.scrollLeft + FIRST_CARD_WIDTH;
        scrollToNewPosition(newScrollLeft);
    });
});

PAGINATION_BTNS.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const newScrollLeft = index * FIRST_CARD_WIDTH;
        scrollToNewPosition(newScrollLeft);
    });
});

function scrollToNewPosition(newScrollLeft) {
    const visibleSlideIndex = Math.round(newScrollLeft / FIRST_CARD_WIDTH);
    CAROUSEL.scrollTo({
        left: newScrollLeft,
        behavior: "smooth"
    });

    PAGINATION_BTNS.forEach((btn, index) => {
        btn.classList.toggle("active", index === visibleSlideIndex);
    });
}

// slider (fade in / fade out)  into favorites section
//display cards based on the selected season
function showSeason(season) {
    const currentSeason = document.querySelector('.season.active');

    if (currentSeason) {
        currentSeason.classList.remove('fade-in');
        currentSeason.classList.add('fade-out');

        currentSeason.addEventListener('animationend', function () {
            currentSeason.classList.remove('active');
            showNewSeason(season);
        }, { once: true });
    } else {
        showNewSeason(season);
    }
}

// show the new season after fading out
function showNewSeason(season) {
    
    const selectedSeason = document.querySelector(`.${season}`);
    selectedSeason.classList.remove('fade-out');
    selectedSeason.classList.add('fade-in', 'active');
}

const radioButtons = document.querySelectorAll('input[type="radio"]');

radioButtons.forEach(button => {
    button.addEventListener('change', function () {
        showSeason(this.value);
    });
});

// display cards for the selected season (winter) by default
showSeason('winter');