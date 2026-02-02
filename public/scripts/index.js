document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("dark-theme");
    const langButton = document.getElementById("lang");
    const topGrid = document.getElementById("top-grid");
    const galleryGrid = document.getElementById("gallery-grid");
    const trendGrid = document.getElementById("trend-grid");
    const account = document.getElementById("account");
    const music = document.getElementById("myAudio");

    function ru() {
        fetch("notations/ru/index.json")
            .then(res => res.json())
            .then(cards => {
                topGrid.innerHTML = ``;
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

        fetch("notations/ru/index_gallery.json")
            .then(res => res.json())
            .then(data => {
                galleryGrid.innerHTML = ``;
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

        fetch("notations/ru/index_trend.json")
            .then(res => res.json())
            .then(data => {
                trendGrid.innerHTML = ``;
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
    }

    function en() {
        fetch("notations/index.json")
            .then(res => res.json())
            .then(cards => {
                topGrid.innerHTML = ``;
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
                galleryGrid.innerHTML = ``;
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
                trendGrid.innerHTML = ``;
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
    }

    const profile = localStorage.getItem("user_email");
    if (profile !== null) {
        fetch('https://api.waifu.im/search?is_nsfw=false')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.images && data.images.length > 0) {
                    account.src = data.images[0].url;
                }
            })
            .catch(error => {
                console.error('Error loading waifu image:', error);
                account.src = 'default-avatar.png';
            });
    }

    let nowTheme = "en";

    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        document.documentElement.classList.add("light");
        themeBtn.textContent = "☀️";
    }

    langButton.addEventListener("click", () => {
        music.play();
        if (nowTheme === "en") {
            nowTheme = "ru";
            langButton.textContent = "RU";
            ru();
        } else if (nowTheme === "ru") {
            langButton.textContent = "EN";
            nowTheme = "en";
            en();
        }
    });

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

    document.getElementById("swag").textContent = new Date().toLocaleDateString("en-US");

    en();
});
