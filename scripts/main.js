document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            const answer = item.querySelector(".faq-answer");

            if (item.classList.contains("active")) {
                answer.style.maxHeight = null;
                item.classList.remove("active");
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                item.classList.add("active");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".nav-item");
    let currentIndex = -1;

    function extractText(item) {
        return item.textContent.trim();
    }
    const menuNames = Array.from(menuItems).map(extractText);
    for (let i = 0; i < menuNames.length; i++) {
        console.log(`Menu item ${i + 1}: ${menuNames[i]}`);
    } //output in console

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (currentIndex === -1) {
                currentIndex = 0;
                menuItems[currentIndex].classList.add("active");
                menuItems[currentIndex].focus();
            } else {
                menuItems[currentIndex].classList.remove("active");
                currentIndex = (currentIndex + 1) % menuItems.length;
                menuItems[currentIndex].classList.add("active");
                menuItems[currentIndex].focus();
            }
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (currentIndex === -1) {
                currentIndex = menuItems.length - 1;
                menuItems[currentIndex].classList.add("active");
                menuItems[currentIndex].focus();
            } else {
                menuItems[currentIndex].classList.remove("active");
                currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
                menuItems[currentIndex].classList.add("active");
                menuItems[currentIndex].focus();
            }
        }
    });
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
