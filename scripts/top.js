document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("top-grid");
    const buttons = document.querySelectorAll(".button");
    const themeToggle = document.getElementById("theme-toggle");

    // === Тема ===
    const currentTheme = localStorage.getItem("theme") || "dark";
    if (currentTheme === "light") {
        document.documentElement.classList.add("light");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("light");
        const isLight = document.documentElement.classList.contains("light");
        themeToggle.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    // === Загрузка данных ===
    function loadCategory(category) {
        fetch(`notations/${category}.json`)
            .then(res => {
                if (!res.ok) throw new Error(`Не удалось загрузить ${category}.json`);
                return res.json();
            })
            .then(data => {
                container.innerHTML = "";
                data.forEach(item => {
                    container.innerHTML += `
                        <a href="${item.link}" class="top-item">
                            <div class="rank" style="color: ${item.color};">${item.rank}</div>
                            <img src="${item.img}" alt="${item.title}">
                            <div class="info">
                                <h4>${item.year}</h4>
                                <h3>${item.title}</h3>
                            </div>
                        </a>`;
                });
            })
            .catch(err => console.error(`Ошибка загрузки ${category}.json:`, err));
    }

    // === Обработка кнопок ===
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            const category = button.textContent.trim().toLowerCase();
            loadCategory(category);
        });
    });

    // Загрузка категории по умолчанию
    buttons[0].classList.add("active");
    loadCategory("senen");
});
