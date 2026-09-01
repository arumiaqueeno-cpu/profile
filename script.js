const header = document.getElementById("header");
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
const hamburgerMenu =
    document.getElementById("hamburgerMenu");
const navLinks =
    document.querySelector(".nav-links");
hamburgerMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});
const track =
    document.getElementById("projectTrack");
const prevBtn =
    document.getElementById("prevBtn");
const nextBtn =
    document.getElementById("nextBtn");
const dots =
    document.querySelectorAll(".dot");
const cards =
    document.querySelectorAll(".project-card");
let currentSlide = 0;
function getSlidesPerView() {
    if (window.innerWidth <= 700) {
        return 1;
    }
    if (window.innerWidth <= 900) {
        return 2;
    }
    return 3;
}
function updateCarousel() {
    const slidesPerView =
        getSlidesPerView();
    const totalSlides =
        cards.length;
    const maxSlide =
        Math.max(
            0,
            totalSlides - slidesPerView
        );
    if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
    const cardWidth =
        cards[0].offsetWidth;
    const gap = 15;
    const move =
        currentSlide *
        (cardWidth + gap);
    track.style.transform =
        `translateX(-${move}px)`;
    dots.forEach(function (dot, index) {
        dot.classList.toggle(
            "active",
            index === currentSlide
        );
    });
}
nextBtn.addEventListener(
    "click",
    function () {
        const slidesPerView =
            getSlidesPerView();
        const maxSlide =
            Math.max(
                0,
                cards.length - slidesPerView
            );
        if (currentSlide < maxSlide) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateCarousel();
    }
);
prevBtn.addEventListener(
    "click",
    function () {
        const slidesPerView =
            getSlidesPerView();
        const maxSlide =
            Math.max(
                0,
                cards.length - slidesPerView
            );
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = maxSlide;
        }
        updateCarousel();
    }
);
let isDragging = false;
let startX = 0;
track.addEventListener(
    "mousedown",
    function (e) {
        isDragging = true;
        startX = e.clientX;
        track.style.transition = "none";
    }
);
track.addEventListener(
    "mouseup",
    function (e) {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition =
            "transform 0.5s ease";
        const distance =
            e.clientX - startX;
        if (distance < -60) {
            nextBtn.click();
        } else if (distance > 60) {
            prevBtn.click();
        } else {
            updateCarousel();
        }
    }
);
track.addEventListener(
    "mouseleave",
    function () {
        if (isDragging) {
            isDragging = false;
            track.style.transition =
                "transform 0.5s ease";
            updateCarousel();
        }
    }
);
let touchStartX = 0;
let touchEndX = 0;
track.addEventListener(
    "touchstart",
    function (e) {
        touchStartX =
            e.changedTouches[0].screenX;
    },
    {
        passive: true
    }
);
track.addEventListener(
    "touchend",
    function (e) {
        touchEndX =
            e.changedTouches[0].screenX;
        const distance =
            touchStartX - touchEndX;
        if (distance > 50) {
            nextBtn.click();
        }
        if (distance < -50) {
            prevBtn.click();
        }
    },
    {
        passive: true
    }
);
window.addEventListener(
    "resize",
    function () {
        updateCarousel();
    }
);
updateCarousel();