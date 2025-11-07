document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('commentForm');
    const textarea = document.getElementById('comment2');
    const list = document.querySelector('.comments');
    if (!form || !textarea || !list) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = textarea.value.trim();
        if (!text) { alert('Введите комментарий'); return; }
        const sound = new Audio("../assets/sounds/Tamer.mp3");
        sound.play();
        const author = 'Your comment';
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const dateStr = `${pad(now.getDate())}.${pad(now.getMonth()+1)}.${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

        const item = document.createElement('div');
        item.className = 'comment';

        const avatar = document.createElement('div');
        avatar.className = 'comment__avatar';
        const img = document.createElement('img');
        img.src = '../assets/user.png';
        img.alt = 'user';
        avatar.appendChild(img);
        const content = document.createElement('div');
        content.className = 'comment__content';
        const spanAuthor = document.createElement('span');
        spanAuthor.className = 'comment__author';
        spanAuthor.textContent = author;
        const pText = document.createElement('p');
        pText.className = 'comment__text';
        pText.textContent = text;
        const spanDate = document.createElement('span');
        spanDate.className = 'comment__date';
        spanDate.textContent = dateStr;
        content.append(spanAuthor, pText, spanDate);
        item.append(avatar, content);
        list.prepend(item);
        textarea.value = '';
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openPopupBtn");
    const overlay = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closePopupBtn");
    const form = document.getElementById("subscribeForm");
    if (!openBtn || !overlay || !closeBtn || !form) return;

    const open = () => {
        overlay.style.display = "flex";
        overlay.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
    };
    const close = () => {
        overlay.style.display = "none";
        overlay.setAttribute('aria-hidden', 'true');
        openBtn.focus();
    };

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);

    document.addEventListener('keydown', (e) => {
        if (overlay.style.display === "flex" && e.key === 'Escape') close();
    });

    form.addEventListener('reset', (e) => {
        if (!confirm('Очистить форму?')) e.preventDefault();

    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        fetch("https://jsonplaceholder.typicode.com/posts",{
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(Callback)
            .catch(Error);
    });
    function Callback(data) {
        console.log("Response:", data);
        alert("Your data sent to the server successfully");
    }
    function Error(err) {
        console.error(err);
        alert("Error");
    }
});
const THEME_KEY = 'theme';
function black_theme() {
    const body = document.getElementById("body");
    const header = document.querySelector(".header");
    const sidebar = document.querySelector(".sidebar");
    const button = document.querySelector(".buttonnigga");
    const comments = document.querySelectorAll(".comment");
    const form = document.getElementById("comment2");
    const button2 = document.getElementById("but");

    const isDark = getComputedStyle(body).backgroundColor === "rgb(15, 23, 32)";

    if (isDark) {
        body.style.backgroundColor = "rgb(255, 255, 255)";
        header && (header.style.backgroundColor = "rgb(234, 234, 234)");
        sidebar && sidebar.style.setProperty('background-color', 'rgb(234, 234, 234)', 'important');

        button && (button.style.backgroundColor = "rgb(255, 255, 255)");
        comments && comments.forEach(el => el.style.setProperty('background-color','rgb(245, 247, 250)','important'));
        form && (form.style.backgroundColor = "rgb(255, 255, 255)");
        button2 && (button2.style.backgroundColor = "rgb(234, 234, 234)");

        localStorage.setItem(THEME_KEY, 'light');
    } else {
        body.style.backgroundColor = "rgb(15, 23, 32)";
        header && (header.style.backgroundColor = "rgb(11, 18, 32)");
        sidebar && sidebar.style.setProperty('background-color', 'rgb(11, 18, 32)', 'important');

        button && (button.style.backgroundColor = "rgb(15, 23, 32)");
        comments && comments.forEach(el => el.style.setProperty('background-color','rgb(25, 35, 50)','important'));
        form && (form.style.backgroundColor = "rgb(15, 23, 32)");
        button2 && (button2.style.backgroundColor = "rgb(243,111,50)");

        localStorage.setItem(THEME_KEY, 'dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (!saved) return;
        const body = document.getElementById("body");
        if (!body) return;
        const isCurrentlyDark = getComputedStyle(body).backgroundColor === "rgb(15, 23, 32)";
        if (saved === 'light' && isCurrentlyDark) black_theme();
        if (saved === 'dark' && !isCurrentlyDark) black_theme();
    } catch (_) {
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.getElementById("greeting");
    const hour = new Date().getHours();
    let message;

    switch (true) {
        case (hour < 12):
            message = "Good morning! ☀️";
            break;
        case (hour < 18):
            message = "Good afternoon! 🌤️";
            break;
        default:
            message = "Good evening! 🌙";
    }

    greeting.textContent = message;
});
arr = [1,2,3,4,5,6,7,8,9]
let i=0;
while (arr[i]<=arr.length)
{
    if (arr[i] % 2 == 0) {
        console.log(arr[i]);
    }
    i++;
}






