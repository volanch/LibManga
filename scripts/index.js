const themeBtn = document.getElementById("dark-theme");
const topGrid = document.getElementById("top-grid");
const galleryGrid = document.getElementById("gallery-grid");
const trendGrid = document.getElementById("trend-grid");
const langButton = document.getElementById("lang");
const music = document.getElementById("myAudio");

function ru(){
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


window.onload = () => {
    en();
}

document.addEventListener("DOMContentLoaded", () => {


    var nowTheme = "en"

    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        document.documentElement.classList.add("light");
        themeBtn.textContent = "☀️";
    }

    langButton.addEventListener("click", () => {
        music.play();
        if (nowTheme === "en") {
            nowTheme = "ru";
            langButton.textContent = "RU"
            ru()
        }
        else if (nowTheme === "ru") {
            langButton.textContent = "EN"
            nowTheme = "en";
            en()
        }
    })

    themeBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("light");
        const isLight = document.documentElement.classList.contains("light");
        themeBtn.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });


    document.querySelector(".prev-btn").addEventListener("click", () => {
        topGrid.scrollBy({ left: -300, behavior: "smooth" });
    });

    document.querySelector(".next-btn").addEventListener("click", () => {
        topGrid.scrollBy({ left: 300, behavior: "smooth" });
    });

    document.getElementById("swag").textContent = new Date().toLocaleDateString("en-US");
});
