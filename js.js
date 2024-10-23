//Скрипт для приветсвенной надписи
document.addEventListener("DOMContentLoaded", function() {
    const welcomeText = document.createElement("h1");
    welcomeText.className = "rainbow-text";
    welcomeText.textContent = "Добро пожаловать в GamingWorld!";
    document.getElementById("welcome-banner").appendChild(welcomeText);
});

//Скрипт для анимации при прокрутке
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll("#home .content > *, #games > .game-cards > *, #about > *, #contacts > *");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.classList.add("hidden");
        observer.observe(element);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    fetch('xml.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const reviews = Array.from(xml.querySelectorAll("review"));

            document.querySelectorAll(".card").forEach(card => {
                const title = card.getAttribute("data-title");
                const reviewElement = card.querySelector(".game-review");

                const review = reviews.find(r => r.querySelector("title").textContent === title);
                if (review) {
                    reviewElement.innerHTML = `<p>${review.querySelector("content").textContent}</p>`;
                }
            });
        })
        .catch(error => console.error("Ошибка при загрузке рецензий:", error));

    document.querySelectorAll(".toggle-button").forEach(button => {
        button.addEventListener("click", function(event) {
            const card = this.closest(".card");
            const gameInfo = card.querySelector(".game-info");
            const gameReview = card.querySelector(".game-review");

            if (gameReview.classList.contains("hide")) {
                event.preventDefault();
                gameInfo.classList.add("hide");
                gameReview.classList.remove("hide");
                gameReview.classList.add("show");

                this.textContent = "Перейти в Steam";
            } else {
                window.open(this.href, "_blank");
            }
        });
    });
});

//Для анимации падающих сердечек
document.addEventListener("DOMContentLoaded", function() {
    const heartContainer = document.getElementById('heart-container');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%'; // Случайное положение по ширине контейнера
        heart.style.animationDuration = 3 + Math.random() * 2 + 's'; // Различная продолжительность падения

        heartContainer.appendChild(heart);

        // Удаляем сердечко через 6 секунд, чтобы не перегружать DOM
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Создаем сердечки каждые 100 миллисекунд для увеличения количества
    setInterval(createHeart, 100);
});