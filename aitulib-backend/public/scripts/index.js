document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("dark-theme");
    const langButton = document.getElementById("lang");
    const topGrid = document.getElementById("top-grid");
    const galleryGrid = document.getElementById("gallery-grid");
    const trendGrid = document.getElementById("trend-grid");
    const account = document.getElementById("account");
    const music = document.getElementById("myAudio");

    // Универсальная функция загрузки данных из БД
    async function loadMangaFromDB() {
        try {
            // Запрашиваем данные из твоего нового API
            const response = await fetch('/api/manga');
            const mangas = await response.json();

            // Очищаем сетки перед заполнением
            topGrid.innerHTML = '';
            galleryGrid.innerHTML = '';
            trendGrid.innerHTML = '';

            mangas.forEach(m => {
                // ПЕРЕХОД ПО ID: меняем href на /api/manga/${m._id} или на страницу просмотра
                // Обычно для пользователя создается страница manga.html?id=...
                const detailLink = `manga.html?id=${m._id}`;

                // 1. Заполняем карусель (Top)
                topGrid.innerHTML += `
                    <a href="${detailLink}" class="card">
                        <img src="${m.coverImage}" alt="cover" onerror="this.src='assets/default.jpg'">
                        <div class="card-text">
                            <h4>${m.status}</h4>
                            <h3>${m.title}</h3>
                        </div>
                    </a>`;

                // 2. Заполняем "Last Updated"
                galleryGrid.innerHTML += `
                    <a href="${detailLink}" class="gallery-item">
                        <img src="${m.coverImage}" alt="cover">
                        <div class="gallery-info">
                            <h4>${m.author || 'Author'}</h4>
                            <h3>${m.title}</h3>
                        </div>
                    </a>`;

                // 3. Заполняем "Trending" (здесь просто для примера те же данные)
                trendGrid.innerHTML += `
                    <a href="${detailLink}" class="gallery-item">
                        <img src="${m.coverImage}" alt="cover">
                        <div class="gallery-info">
                            <h3>${m.title}</h3>
                        </div>
                    </a>`;
            });
        } catch (err) {
            console.error("Ошибка загрузки из БД:", err);
        }
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        document.documentElement.classList.add("light");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("light");
        const isLight = document.documentElement.classList.contains("light");
        themeBtn.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    document.querySelector(".prev-btn").addEventListener("click", () => {
        topGrid.scrollBy({left: -300, behavior: "smooth"});
    });

    document.querySelector(".next-btn").addEventListener("click", () => {
        topGrid.scrollBy({left: 300, behavior: "smooth"});
    });

    document.getElementById("swag").textContent = new Date().toLocaleDateString("ru-RU");

    loadMangaFromDB();
});