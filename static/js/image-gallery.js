document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".section .carousel-container");
    const slideContainer = document.querySelector(".section .carousel-slide");
    const slides = document.querySelectorAll(".section .carousel-slide img");
    const prevBtn = document.querySelector(".section .carousel-arrow.left");
    const nextBtn = document.querySelector(".section .carousel-arrow.right");
    

    const dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    

    carouselContainer.appendChild(dotsContainer);
    
    
    const dots = [];
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel() {
        slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentIndex);
        });
    }


    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });


    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });


    slideContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    slideContainer.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) { 
            currentIndex = (currentIndex + 1) % slides.length;
        } else if (difference < -50) { 
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        updateCarousel();
    }


    let intervalId;
    function startAutoPlay() {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 8000);
    }

    function stopAutoPlay() {
        clearInterval(intervalId);
    }


    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);

        updateCarousel();
    startAutoPlay(); 
});