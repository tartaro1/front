const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'prev', 'next');
                if (i === index) {
                    slide.classList.add('active');
                } else if (i === (index === 0 ? slides.length - 1 : index - 1)) {
                    slide.classList.add('prev');
                } else {
                    slide.classList.add('next');
                }
            });
        }

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        document.getElementById('next').addEventListener('click', nextSlide);
        document.getElementById('prev').addEventListener('click', prevSlide);

        let slideInterval = setInterval(nextSlide, 3000);

        const stopSlider = () => clearInterval(slideInterval);
        const startSlider = () => slideInterval = setInterval(nextSlide, 3000);

        document.querySelectorAll('.slide, #prev, #next').forEach(element => {
            element.addEventListener('mouseenter', stopSlider);
            element.addEventListener('mouseleave', startSlider);
        });