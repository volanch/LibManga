document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('commentForm');
    const textarea = document.getElementById('comment2');
    const list = document.querySelector('.comments');
    if (form && textarea && list) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = textarea.value.trim();
            if (!text) { alert('Введите комментарий'); return; }
            const sound = new Audio("../assets/sounds/Tamer.mp3");
            sound.play();
            const author = 'Your comment';
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const dateStr = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

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
    }
    const openBtn = document.getElementById("openPopupBtn");
    const overlay = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closePopupBtn");
    const subscribeForm = document.getElementById("subscribeForm");
    if (openBtn && overlay && closeBtn && subscribeForm) {
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

        subscribeForm.addEventListener('reset', (e) => {
            if (!confirm('Очистить форму?')) e.preventDefault();
        });
        subscribeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = subscribeForm.querySelector('input[type="email"]')?.value || '';
            const password = subscribeForm.querySelector('input[type="password"]')?.value || '';
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_password', password);
            close();
        });
    }
    const openBtn2 = document.getElementById("openPopupBtn2");
    const overlay2 = document.getElementById("popupOverlay2");
    const closeBtn2 = document.getElementById("closePopupBtn2");
    const form2 = document.getElementById("subscribeForm2");

    if (openBtn2 && overlay2 && closeBtn2 && form2) {
        const open2 = () => {
            overlay2.style.display = "flex";
            overlay2.setAttribute('aria-hidden', 'false');
            closeBtn2.focus();
            const storedEmail = localStorage.getItem('user_email') || '';
            const storedPassword = localStorage.getItem('user_password') || '';

            const emailLabel = form2.querySelector('label[for="email"]');
            const passwordLabel = form2.querySelector('label[for="password"]');

            if (emailLabel) emailLabel.textContent = `Email: ${storedEmail || '—'}`;
            if (passwordLabel) passwordLabel.textContent = `Password: ${storedPassword || '—'}`;
        };
        const close2 = () => {
            overlay2.style.display = "none";
            overlay2.setAttribute('aria-hidden', 'true');
            openBtn2.focus();
        };

        openBtn2.addEventListener("click", open2);
        closeBtn2.addEventListener("click", close2);
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
    const footer = document.querySelector("footer");

    const isDark = getComputedStyle(body).backgroundColor === "rgb(15, 23, 32)";

    if (isDark) {
        body.style.backgroundColor = "rgb(255, 255, 255)";
        header && (header.style.backgroundColor = "rgb(234, 234, 234)");
        sidebar && sidebar.style.setProperty('background-color', 'rgb(234, 234, 234)', 'important');
        button && (button.style.backgroundColor = "rgb(255, 255, 255)");
        comments && comments.forEach(el => el.style.setProperty('background-color', 'rgb(245, 247, 250)', 'important'));
        form && (form.style.backgroundColor = "rgb(255, 255, 255)");
        button2 && (button2.style.backgroundColor = "rgb(234, 234, 234)");
        footer.style.backgroundColor = "rgb(255, 255, 255)";
        footer.style.color = "rgb(74,73,73)";
        localStorage.setItem(THEME_KEY, 'light');
    } else {
        body.style.backgroundColor = "rgb(15, 23, 32)";
        header && (header.style.backgroundColor = "rgb(11, 18, 32)");
        sidebar && sidebar.style.setProperty('background-color', 'rgb(11, 18, 32)', 'important');
        button && (button.style.backgroundColor = "rgb(15, 23, 32)");
        comments && comments.forEach(el => el.style.setProperty('background-color', 'rgb(25, 35, 50)', 'important'));
        form && (form.style.backgroundColor = "rgb(15, 23, 32)");
        button2 && (button2.style.backgroundColor = "rgb(243,111,50)");
        footer.style.backgroundColor = "rgb(15, 23, 32)";
        footer.style.color = "rgb(255,253,253)";
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
    } catch (_) {}
});
document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.getElementById("greeting");
    if (!greeting) return;
    const hour = new Date().getHours();
    let message;
    if (hour < 12) message = "Good morning! ☀️";
    else if (hour < 18) message = "Good afternoon! 🌤️";
    else message = "Good evening! 🌙";
    greeting.textContent = message;
});
