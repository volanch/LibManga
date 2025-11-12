// === jQuery Tasks: Comments, Copy Buttons, Toasts, Scroll, Theme Sync ===
$(function () {
    const $win = $(window);

    /* ===== Toast ===== */
    function toast(msg, type = "ok", ttl = 2200) {
        const $box = $('<div class="toast"></div>').addClass(type).text(msg);
        let $ctr = $("#toastContainer");
        if (!$ctr.length) {
            $ctr = $('<div id="toastContainer" aria-live="polite" aria-atomic="true"></div>').appendTo("body");
        }
        $ctr.append($box);
        setTimeout(() => $box.fadeOut(200, () => $box.remove()), ttl);
    }

    /* ===== Scroll progress ===== */
    const $bar = $("#scrollProgress .scroll-bar");
    function updateProgress() {
        if (!$bar.length) return;
        const h = $(document).height() - $win.height();
        const p = h ? Math.max(0, $win.scrollTop()) / h * 100 : 0;
        $bar.css("width", `${p}%`);
    }
    updateProgress();
    $win.on("scroll", updateProgress);

    /* ===== Sidebar Users counter ===== */
    const $users = $("#usersCount");
    if ($users.length) {
        const target = Number($users.data("target") || 0);
        let ran = false;
        function anim() {
            if (ran) return;
            ran = true;
            const start = performance.now(), dur = 1200;
            (function step(ts) {
                const t = Math.min(1, (ts - start) / dur);
                const v = Math.round(target * (t * (2 - t)));
                $users.text(v);
                if (t < 1) requestAnimationFrame(step);
            })(start);
        }
        anim();
    }

    function addCopyButton($content) {
        if (!$content.find(".copy-btn").length) {
            const $actions = $('<div class="comment__actions"></div>');
            const $btn = $('<button type="button" class="copy-btn">Copy text</button>');
            $btn.on("click", async function () {
                const txt = $content.find(".comment__text").text();
                try {
                    await navigator.clipboard.writeText(txt);
                    $(this).addClass("copied").text("Copied ✓");
                    setTimeout(() => $(this).removeClass("copied").text("Copy text"), 1400);
                    toast("Copied to clipboard", "ok", 1200);
                } catch {
                    toast("Copy failed", "warn");
                }
            });
            $actions.append($btn);
            $content.append($actions);
            applyThemeStyles();
        }
    }
    $(".comment__content").each(function () { addCopyButton($(this)); });
    const $comments = $(".comments");
    if ($comments.length) {
        const obs = new MutationObserver((muts) => {
            for (const m of muts) {
                [...m.addedNodes].forEach(n => {
                    if (n.nodeType === 1 && n.classList.contains("comment")) {
                        $(n).find(".comment__content").each(function () { addCopyButton($(this)); });
                        if (!isDarkTheme()) {
                            const $card = $(n);
                            $card.css({
                                "background-color": "#f1f5f9",
                                "border": "1px solid #1e293b",
                                "color": "#9ca3af"
                            });

                            $card.find(".comment__text, .comment__author").css("color", "#9ca3af");
                            $card.find(".comment__date").css("color", "#9ca3af");
                            $card.find(".copy-btn").css({
                                "background-color": "#e2e8f0",
                                "color": "#0f172a",
                                "border": "1px solid #cbd5e1"
                            });
                        }
                        // >>>

                        toast("Comment added successfully ✅", "ok");
                        applyThemeStyles();
                    }
                });
            }
        });
        obs.observe($comments.get(0), { childList: true, subtree: false });
    }

    const $commentBtn = $("#but");
    const originalBtnText = $commentBtn.text();
    $("#commentForm").on("submit", function () {
        if (!$commentBtn.length || $commentBtn.hasClass("btn-busy")) return;
        $commentBtn.addClass("btn-busy").prop("disabled", true).text("Submitting...");
        setTimeout(() => {
            $commentBtn.removeClass("btn-busy").prop("disabled", false).text(originalBtnText);
        }, 650);
    });

    const $popupForm = $("#subscribeForm");
    if ($popupForm.length) {
        const $btn = $popupForm.find('button[type="submit"]');
        const txt = $btn.text();
        $popupForm.on("submit", function () {
            $btn.addClass("btn-busy").prop("disabled", true).text("Please wait...");
            setTimeout(() => {
                $btn.removeClass("btn-busy").prop("disabled", false).text(txt);
            }, 900);
        });
    }

    function isDarkTheme() {
        const key = localStorage.getItem("THEME_KEY");
        if (key === "dark") return true;
        if (key === "light") return false;
        const bg = getComputedStyle(document.body).backgroundColor;
        return bg === "rgb(15, 23, 32)";
    }

    function applyThemeStyles() {
        const dark = isDarkTheme();
        const $copyBtns = $(".copy-btn");
        const $stat = $(".stat.stat--mini");
        const $usersNum = $("#usersCount");

        if (dark) {
            $copyBtns.css({
                "background-color": "#1e293b",
                "color": "#ffffff",
                "border": "1px solid #334155"
            });
            $stat.css({
                "background-color": "#111827",
                "border": "1px solid #1f2937"
            });
            $usersNum.css({ "color": "#ffffff" });
        } else {

            $copyBtns.css({
                "background-color": "#e2e8f0",
                "color": "#0f172a",
                "border": "1px solid #cbd5e1"
            });
            $stat.css({
                "background-color": "#ffffff",
                "border": "1px solid #e5e7eb"
            });
            $usersNum.css({ "color": "#1f2937" });
        }
    }

    applyThemeStyles();

    $(document).on("themeChanged", applyThemeStyles);
    const origBlackTheme = window.black_theme;
    window.black_theme = function () {
        if (typeof origBlackTheme === "function") origBlackTheme();
        const darkNow = $("body").css("background-color") === "rgb(15, 23, 32)";
        localStorage.setItem("THEME_KEY", darkNow ? "dark" : "light");
        $(document).trigger("themeChanged");
    };
});
