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
