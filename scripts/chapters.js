document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openPopupBtn");
    const overlay = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closePopupBtn");

    openBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.style.display = "none";
        }
    });

    const form = document.getElementById("subscribeForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Thank you for subscribing!");
        overlay.style.display = "none";
        form.reset();
    });
});
