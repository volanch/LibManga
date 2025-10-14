document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("top-grid");
    const buttons = document.querySelectorAll(".button");

    // Функция загрузки данных
    function loadCategory(category) {
        fetch(`notations/${category}.json`)
            .then(res => {
                if (!res.ok) throw new Error(`Не удалось загрузить ${category}.json`);
                return res.json();
            })
            .then(data => {
                container.innerHTML = ""; // Очистка перед загрузкой
                data.forEach(item => {
                    container.innerHTML += `
                        <a href="${item.link}" class="top-item">
                            <div class="rank" style="color: ${item.color};">${item.rank}</div>
                            <img src="${item.img}" alt="${item.title}">
                            <div class="info">
                                <h4>${item.year}</h4>
                                <h3>${item.title}</h3>
                            </div>
                        </a>
                    `;
                });
            })
            .catch(err => console.error(`Ошибка загрузки ${category}.json:`, err));
    }

    // Привязка обработчиков к кнопкам
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.textContent.trim().toLowerCase(); // senen / sedze
            loadCategory(category);
        });
    });

    // Загружаем первую категорию по умолчанию
    loadCategory("senen");
});
