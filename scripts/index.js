document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("dark-theme");
    const topGrid = document.getElementById("top-grid");
    const galleryGrid = document.getElementById("gallery-grid");
    const trendGrid = document.getElementById("trend-grid");

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

    fetch("notations/index.json")
        .then(res => res.json())
        .then(cards => {
            cards.forEach(c => {
                topGrid.innerHTML += `
                <a href="${c.link}" class="card">
                    <img src="${c.img}" alt="cover">
                    <div class="card-text">
                        <h4>${c.year}</h4>
                        <h3>${c.title}</h3>
                    </div>
                </a>`;
            });
        })
        .catch(err => console.error("Ошибка загрузки JSON:", err));

    fetch("notations/index_gallery.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                galleryGrid.innerHTML += `
                <a href="${item.link || '#'}" class="gallery-item">
                    <img src="${item.img}" alt="cover">
                    <div class="gallery-info">
                        <h4>${item.chapter}</h4>
                        <h3>${item.title}</h3>
                    </div>
                </a>`;
            });
        });

    fetch("notations/index_trend.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                trendGrid.innerHTML += `
                <a href="${item.link || '#'}" class="gallery-item">
                    <img src="${item.img}" alt="cover">
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                    </div>
                </a>`;
            });
        });

    document.querySelector(".prev-btn").addEventListener("click", () => {
        topGrid.scrollBy({ left: -300, behavior: "smooth" });
    });

    document.querySelector(".next-btn").addEventListener("click", () => {
        topGrid.scrollBy({ left: 300, behavior: "smooth" });
    });

    document.getElementById("swag").textContent = new Date().toLocaleDateString("en-US");
});
