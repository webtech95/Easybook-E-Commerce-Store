

// Auto-scroll carousel Testimonial
const carouselRef = document.querySelector('[ref]');
let scrollAmount = 0;
setInterval(() => {
    if (carouselRef) {
        carouselRef.scrollBy({ left: 420, behavior: 'smooth' });
        scrollAmount += 420;
        if (scrollAmount >= carouselRef.scrollWidth - carouselRef.clientWidth) {
            carouselRef.scrollTo({ left: 0, behavior: 'smooth' });
            scrollAmount = 0;
        }
    }
}, 3000);