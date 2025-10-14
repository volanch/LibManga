document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("light-theme");
    const savedTheme = localStorage.getItem("theme");

    // Default = dark if nothing saved
    if (savedTheme === "light") {
        document.documentElement.classList.add("light");
        themeBtn.textContent = "☀️";
    } else {
        document.documentElement.classList.remove("light");
        themeBtn.textContent = "🌙";
    }

    themeBtn.addEventListener("click", () => {
        document.documentElement.classList.add("theme-transition");
        document.documentElement.classList.toggle("light");

        const isLight = document.documentElement.classList.contains("light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
        themeBtn.textContent = isLight ? "☀️" : "🌙";

        setTimeout(() => {
            document.documentElement.classList.remove("theme-transition");
        }, 400);
    });
});