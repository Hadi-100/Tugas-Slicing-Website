const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function (event) {

        event.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        const targetPosition = targetSection.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;

        const duration = 1000; 
        let startTime = null;

        function animation(currentTime) {

            if (startTime === null) {
                startTime = currentTime;
            }

            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Membuat gerakan lebih halus
            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(
                0,
                startPosition + distance * ease
            );

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
});

const sections = document.querySelectorAll("section");

function cekSection() {

    sections.forEach(section => {

        const posisiSection = section.getBoundingClientRect().top;
        const tinggiLayar = window.innerHeight;

        if (posisiSection < tinggiLayar - 100) {
            section.classList.add("show");
        }

    });

}

window.addEventListener("scroll", cekSection);

cekSection();