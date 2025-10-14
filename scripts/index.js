fetch("notations/index.json")
    .then(res => res.json())
    .then(cards => {
        const grid = document.getElementById("top-grid");
        for (let i = 0; i < cards.length; i++) {
            const c = cards[i];
            grid.innerHTML += `
            <a href="${c.link}" class="card">
              <img src="${c.img}" alt="cover">
              <div class="card-text">
                <h4>${c.year}</h4>
                <h3>${c.title}</h3>
              </div>
            </a>`;
        }
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

fetch("notations/index_gallery.json")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("gallery-grid");

        data.forEach(item => {
            const card = document.createElement("a");
            card.className = "gallery-item";
            card.innerHTML = `
      <img src="${item.img}" alt="cover">
      <div class="gallery-info">
        <h4>${item.chapter}</h4>
        <h3>${item.title}</h3>
      </div>
    `;
            grid.appendChild(card);
        });
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

fetch("notations/index_trend.json")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("trend-grid");

        data.forEach(item => {
            const card = document.createElement("a");
            card.className = "gallery-item";
            card.innerHTML = `
      <img src="${item.img}" alt="cover">
      <div class="gallery-info">
        <h3>${item.title}</h3>
      </div>
    `;
            grid.appendChild(card);
        });
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

const main = document.getElementById("maid");
const btn = document.getElementById("dark-theme");

btn.addEventListener("click", () => {
    main.classList.toggle("light-theme");
    document.getElementById("header").classList.toggle("light-theme");
    document.getElementById("footer").classList.toggle("light-theme");
    document.getElementById("gall").classList.toggle("light-theme");

    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle("light-theme");
    }

    const galls = document.getElementsByClassName("gallery-item");
    for (let i = 0; i < galls.length; i++) {
        galls[i].classList.toggle("light-theme");
    }
});

document.querySelector(".prev-btn").addEventListener("click", () => {
    document.getElementById("top-grid").scrollBy({ left: -300, behavior: "smooth" });
});

document.querySelector(".next-btn").addEventListener("click", () => {
    document.getElementById("top-grid").scrollBy({ left: 300, behavior: "smooth" });
});

document.getElementById("swag").innerHTML = new Date().toLocaleDateString("en-US");