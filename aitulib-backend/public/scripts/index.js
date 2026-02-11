
async function loadWaifuAvatar() {
    const account = document.getElementById("account");
    const savedAvatar = localStorage.getItem("userAvatar");

    if (savedAvatar) {
        account.src = savedAvatar;
        return;
    }
    try {
        const response = await fetch('https://api.waifu.im/images?is_nsfw=false');
        if (!response.ok) throw new Error(`Ошибка API: ${response.status}`);

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const imageUrl = data.items[0].url;
            account.src = imageUrl;
            localStorage.setItem("userAvatar", imageUrl);
        } else {
            account.src = 'assets/Card 1.png';
        }
    } catch (error) {
        console.error('Ошибка загрузки аватарки:', error);
        account.src = 'assets/Card 1.png';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("dark-theme");
    const langButton = document.getElementById("lang");
    const topGrid = document.getElementById("top-grid");
    const galleryGrid = document.getElementById("gallery-grid");
    const trendGrid = document.getElementById("trend-grid");

    const music = document.getElementById("myAudio");

    async function loadMangaFromDB() {
        try {
            const response = await fetch('/api/manga');
            const mangas = await response.json();

            topGrid.innerHTML = '';
            galleryGrid.innerHTML = '';
            trendGrid.innerHTML = '';

            mangas.forEach(m => {
                const detailLink = `manga.html?id=${m._id}`;

                topGrid.innerHTML += `
                    <a href="${detailLink}" class="card">
                        <img src="${m.coverImage}" alt="cover" onerror="this.src='assets/default.jpg'">
                        <div class="card-text">
                            <h4>${m.status}</h4>
                            <h3>${m.title}</h3>
                        </div>
                    </a>`;

                galleryGrid.innerHTML += `
                    <a href="${detailLink}" class="gallery-item">
                        <img src="${m.coverImage}" alt="cover">
                        <div class="gallery-info">
                            <h4>${m.author || 'Author'}</h4>
                            <h3>${m.title}</h3>
                        </div>
                    </a>`;

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

    loadWaifuAvatar();


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