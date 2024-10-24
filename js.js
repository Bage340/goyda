document.addEventListener("DOMContentLoaded", function() {
    // Приветственная надпись
    const welcomeText = document.createElement("h1");
    welcomeText.className = "rainbow-text";
    welcomeText.textContent = "Добро пожаловать в GamingWorld!";
    document.getElementById("welcome-banner").appendChild(welcomeText);

    // Анимация элементов при прокрутке
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

    // Загрузка рецензий из XML
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
                if (review && reviewElement.innerHTML.trim() === '') {
                    reviewElement.innerHTML = `<p>${review.querySelector("content").textContent}</p>`;
                }
            });
        })
        .catch(error => console.error("Ошибка при загрузке рецензий:", error));

    // Обработчики событий для кнопок
    document.querySelectorAll(".toggle-button").forEach(button => {
        button.addEventListener("click", function(event) {
            const card = this.closest(".card");
            const gameInfo = card.querySelector(".game-info");
            const gameReview = card.querySelector(".game-review");

            if (gameReview.classList.contains("hide")) {
                event.preventDefault();
                
                if (!gameInfo.classList.contains("hide")) {
                    gameInfo.classList.add("hide");
                }

                gameReview.classList.remove("hide");
                gameReview.classList.add("show");

                this.textContent = "Перейти в Steam";
            } else {
                window.open(this.href, "_blank");
            }
        });
    });

    // Анимация падающих сердечек внутри блока с приветственной надписью
    const heartContainer = document.getElementById('welcome-banner');

    function createHeart() {
        console.log("Создание сердечка"); // Проверка, вызывается ли функция
    
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = 3 + Math.random() * 2 + 's';
    
        heartContainer.appendChild(heart);
    
        setTimeout(() => {
            heart.remove();
        }, parseFloat(heart.style.animationDuration) * 1000 + 1000);
    }
    
    // Создаем сердечки каждые 500 миллисекунд
    setInterval(createHeart, 500);
});
