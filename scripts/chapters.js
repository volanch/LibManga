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

$(document).ready(function () {
    $("#searchBar").on("keyup", function () {
        const query = $(this).val().toLowerCase();
        $(".chapter-item").filter(function () {
            $(this).toggle($(this).text().toLowerCase().includes(query));
        });
    });
});

$(document).ready(function () {
    const chapters = $(".chapter-item .caption").map(function () {
        return $(this).text().trim();
    }).get();

    $("#searchBar").on("input", function () {
        const query = $(this).val().toLowerCase();
        const suggestionsBox = $("#suggestions");
        suggestionsBox.empty();

        if (query.length === 0) return;

        const matches = chapters.filter(c => c.toLowerCase().includes(query)).slice(0, 4);

        matches.forEach(match => {
            suggestionsBox.append(`<li class="suggestion-item">${match}</li>`);
        });
    });

    $(document).on("click", ".suggestion-item", function () {
        const selected = $(this).text();
        $("#searchBar").val(selected);
        $("#suggestions").empty();

        $(".chapter-item").filter(function () {
            $(this).toggle($(this).text().toLowerCase().includes(selected.toLowerCase()));
        });
    });
});

$("#subscribeForm").on("submit", function (e) {
    e.preventDefault();
    const btn = $(".submit-btn");
    btn.prop("disabled", true);
    btn.html('<span class="spinner"></span> Please wait...');

    setTimeout(() => {
        btn.prop("disabled", false).text("Subscribe");
        alert("Form submitted successfully!");
    }, 2000);
});

function showToast(message) {
    $("#toast").text(message).addClass("show");
    setTimeout(() => $("#toast").removeClass("show"), 3000);
}
$("#openPopupBtn").on("click", function () {
    showToast("Popup opened successfully!");
});

$(window).on("scroll", function () {
    $(".lazy-image").each(function () {
        const $img = $(this);
        if ($img.offset().top < $(window).scrollTop() + $(window).height() + 200) {
            const src = $img.attr("data-src");
            if (src) {
                $img.attr("src", src).removeAttr("data-src");
                $img.on("load", function () {
                    $img.addClass("loaded");
                });
            }
        }
    });
});

$(window).trigger("scroll");