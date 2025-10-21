document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openPopupBtn");
    const overlay = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closePopupBtn");
    const form = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("email");
    const errorMsg = document.getElementById("errorMsg");
    const resetBtn = document.getElementById("resetBtn");
    const successMsg = document.getElementById("successMsg");

    const popupManager = {
        isOpen: false,
        open() {
            overlay.style.display = "flex";
            this.isOpen = true;
        },
        close() {
            overlay.style.display = "none";
            this.isOpen = false;
        }
    };

    openBtn.addEventListener("click", () => popupManager.open());
    closeBtn.addEventListener("click", () => popupManager.close());

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

        const formData = { email: emailValue };


        sendFormData(formData)
            .then(success => {
                if (success) {
                    successMsg.textContent = "Спасибо за подписку!";
                    successMsg.style.display = "block";
                    setTimeout(() => {
                        successMsg.style.display = "none";
                        overlay.style.display = "none";
                        form.reset();
                    }, 2000);
                } else {
                    errorMsg.textContent = "Произошла ошибка при отправке.";
                    errorMsg.style.display = "block";
                }
            });
    });

    resetBtn.addEventListener("click", () => {
        const sound = new Audio("../assets/sounds/button-press.mp3");
        sound.play();
        document.querySelectorAll('input').forEach(input => input.value = '');
        errorMsg.style.display = "none";
        emailInput.style.borderColor = "";
    });

    async function sendFormData(data) {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return response.ok;
    }
});