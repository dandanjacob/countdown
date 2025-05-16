// Carousel functionality
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.prevButton = document.querySelector('.prev');
        this.nextButton = document.querySelector('.next');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.carouselInner = document.querySelector('.carousel-inner');

        // Clone first and last slides for infinite effect
        this.setupInfiniteSlides();
        this.createDots();
        this.addEventListeners();
        this.updateCarousel(false);
        this.startAutoSlide();
    }

    setupInfiniteSlides() {
        // Clone the first few slides and add them to the end
        for (let i = 0; i < 2; i++) {
            const clone = this.slides[i].cloneNode(true);
            this.carouselInner.appendChild(clone);
        }

        // Clone the last few slides and add them to the beginning
        for (let i = this.totalSlides - 2; i < this.totalSlides; i++) {
            const clone = this.slides[i].cloneNode(true);
            this.carouselInner.insertBefore(clone, this.carouselInner.firstChild);
        }

        // Update slides collection after adding clones
        this.slides = document.querySelectorAll('.slide');
    }

    createDots() {
        this.slides.forEach((_, index) => {
            if (index >= 2 && index < this.totalSlides + 2) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 2) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index - 2));
                this.dotsContainer.appendChild(dot);
            }
        });
    }

    addEventListeners() {
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
    }

    updateCarousel(animate = true) {
        if (!animate) {
            this.carouselInner.style.transition = 'none';
        } else {
            this.carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }

        // Calculate the transform value considering the clone offset
        const translateX = 33.333 - ((this.currentSlide + 2) * 33.333);
        this.carouselInner.style.transform = `translateX(${translateX}%)`;

        if (!animate) {
            // Force reflow
            this.carouselInner.offsetHeight;
            this.carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }

        // Update active states
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index >= 2 && index < this.totalSlides + 2) {
                const dotIndex = index - 2;
                document.querySelectorAll('.dot')[dotIndex]?.classList.remove('active');
            }
        });

        // Add active class to current slide
        const activeIndex = this.currentSlide + 2;
        this.slides[activeIndex].classList.add('active');
        document.querySelectorAll('.dot')[this.currentSlide]?.classList.add('active');
    }

    handleTransitionEnd() {
        // If we're at the cloned slides, jump to the real slides without animation
        if (this.currentSlide === -2) {
            this.currentSlide = this.totalSlides - 2;
            this.updateCarousel(false);
        } else if (this.currentSlide === this.totalSlides) {
            this.currentSlide = 0;
            this.updateCarousel(false);
        }
    }

    nextSlide() {
        this.currentSlide++;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentSlide--;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    startAutoSlide() {
        // Add transition end listener for infinite loop
        this.carouselInner.addEventListener('transitionend', () => this.handleTransitionEnd());
        setInterval(() => this.nextSlide(), 10000); // Change slide every 5 seconds
    }
}

// Countdown functionality
class Countdown {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate);
        this.daysElement = document.querySelector('.days');
        this.hoursElement = document.querySelector('.hours');
        this.minutesElement = document.querySelector('.minutes');
        this.secondsElement = document.querySelector('.seconds');

        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const currentTime = new Date();
        const difference = this.targetDate - currentTime;

        if (difference <= 0) {
            this.daysElement.textContent = '00';
            this.hoursElement.textContent = '00';
            this.minutesElement.textContent = '00';
            this.secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        this.daysElement.textContent = days.toString().padStart(2, '0');
        this.hoursElement.textContent = hours.toString().padStart(2, '0');
        this.minutesElement.textContent = minutes.toString().padStart(2, '0');
        this.secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
}

// Quote Rotation
class Quotes {
    constructor() {
        this.quotes = [
            // English quotes
            "The journey of a thousand miles begins with a single step.",
            "Every moment brings us closer together.",
            "The best is yet to come.",
            "Distance means so little when someone means so much.",

            // Portuguese quotes
            "A saudade é a memória do coração.",  // Longing is the heart's memory
            "Cada dia mais perto de você.",  // Each day closer to you
            "A distância não é nada quando o amor é tudo.",  // Distance is nothing when love is everything
            "O tempo só faz crescer este amor.",  // Time only makes this love grow

            // Spanish quotes
            "La distancia no es el olvido.",  // Distance is not forgetfulness
            "Cada segundo es un paso más cerca de ti.",  // Every second is one step closer to you
            "El tiempo pasa, pero nuestro amor crece.",  // Time passes, but our love grows
            "La espera vale la pena cuando el amor es verdadero."  // The wait is worth it when love is true
        ];
        this.currentQuote = 0;
        this.quoteElement = document.getElementById('quote');
        this.rotateQuotes();
    }

    rotateQuotes() {
        setInterval(() => {
            this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
            this.quoteElement.style.opacity = 0;
            setTimeout(() => {
                this.quoteElement.textContent = this.quotes[this.currentQuote];
                this.quoteElement.style.opacity = 1;
            }, 500);
        }, 10000); // Change quote every 10 seconds
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
    new Quotes();
    new Countdown('2025-07-03T00:00:00');
}); 