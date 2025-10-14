document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openPopupBtn");
    const overlay = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closePopupBtn");
    const form = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("email");
    const errorMsg = document.getElementById("errorMsg");

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

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            errorMsg.textContent = "Введите правильный e-mail, например: example@gmail.com";
            errorMsg.style.display = "block";
            emailInput.style.borderColor = "red";
            return;
        }

        errorMsg.style.display = "none";
        emailInput.style.borderColor = "";
        alert("Спасибо за подписку!");
        overlay.style.display = "none";
        form.reset();
    });
});