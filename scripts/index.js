const links = [
    "beginning/main.html",
    "beginning/main.html",
    "beginning/main.html",
    "beginning/main.html",
    "beginning/main.html",
    "beginning/main.html"
];

const imgs = [
    "assets/menu-page/cover_begin.webp",
    "assets/menu-page/cover_nonam.webp",
    "assets/menu-page/cover_lalka.jpg",
    "assets/menu-page/cover_54c49cfa.webp",
    "assets/menu-page/cover_7673b861.webp",
    "assets/menu-page/cover_a425b408.webp"
];

const years = [
    "Manhwa 2018",
    "Manhwa 2019",
    "Manhwa 2022",
    "Manhwa 2019",
    "Manhwa 2019",
    "Manhwa 2019"
];

const titles = [
    "The Beginning After<br>the End",
    "A Monopoly on Chance",
    "Ice Flower Knight",
    "A Monopoly on Chance",
    "A Monopoly on Chance",
    "A Monopoly on Chance"
];

const grid = document.getElementById("top-grid");

for (let i = 0; i < imgs.length; i++) {
    grid.innerHTML += `
    <a href="${links[i]}" class="card">
      <img src="${imgs[i]}" alt="cover">
      <div class="card-text">
        <h4>${years[i]}</h4>
        <h3>${titles[i]}</h3>
      </div>
    </a>`;
}