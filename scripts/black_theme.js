document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('commentForm');
    const textarea = document.getElementById('comment2');
    const list = document.querySelector('.comments');
    if (!form || !textarea || !list) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = textarea.value.trim();
        if (!text) { alert('Введите комментарий'); return; }

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

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', (e) => {
        if (overlay.style.display === "flex" && e.key === 'Escape') close();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for signing up!");
        form.reset();
        close();
    });
});
function black_theme() {
    const body    = document.getElementById("body");
    const header  = document.querySelector(".header");
    const sidebar = document.querySelector(".sidebar");
    const button  = document.querySelector(".buttonnigga");
    const comments = document.querySelectorAll(".comment");
    const form = document.getElementById("comment2");
    const button2 = document.getElementById("but");

    const isDark = getComputedStyle(body).backgroundColor === "rgb(15, 23, 32)";
    if (isDark) {
        body.style.backgroundColor    = "rgb(255, 255, 255)";
        header.style.backgroundColor  = "rgb(234, 234, 234)";
        sidebar.style.setProperty('background-color', 'rgb(234, 234, 234)', 'important');
        button.style.backgroundColor  = "rgb(255, 255, 255)";
        form.style.backgroundColor  = "rgb(234, 234, 234)";
        button2.style.backgroundColor  = "rgb(234, 234, 234)";
        comments.forEach(el => {
            el.style.backgroundColor = "rgb(234, 234, 234)";
            el.style.borderColor     = "rgb(209, 213, 219)";
        });
        document.querySelectorAll('.sidebar a').forEach(a => a.style.color = '#0f1720');
    } else {
        body.style.backgroundColor    = "rgb(15, 23, 32)";
        header.style.backgroundColor  = "rgb(11, 18, 32)";
        sidebar.style.setProperty('background-color', 'rgb(11, 18, 32)', 'important');
        button.style.backgroundColor  = "rgb(0, 0, 0)";
        form.style.backgroundColor  = "rgb(11, 18, 32)";
        button2.style.backgroundColor  = "#f97316";
        comments.forEach(el => {
            el.style.backgroundColor = "rgb(11, 18, 32)";
            el.style.borderColor     = "rgb(30, 41, 59)";
        });
        document.querySelectorAll('.sidebar a').forEach(a => a.style.color = '#9ca3af');
    }
}




