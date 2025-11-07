// Assignment 7 — jQuery tasks (light version)
$(function () {
    const $win = $(window);

    /* ===== Toast ===== */
    function toast(msg, type = 'ok', ttl = 2200) {
        const $box = $('<div class="toast"></div>').addClass(type).text(msg);
        let $ctr = $('#toastContainer');
        if (!$ctr.length) { $ctr = $('<div id="toastContainer" aria-live="polite" aria-atomic="true"></div>').appendTo('body'); }
        $ctr.append($box);
        setTimeout(() => $box.fadeOut(200, () => $box.remove()), ttl);
    }

    /* ===== Scroll progress (если есть) ===== */
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
            (function step(ts){
                const t = Math.min(1, (ts - start) / dur);
                const v = Math.round(target * (t * (2 - t)));
                $users.text(v);
                if (t < 1) requestAnimationFrame(step);
            })(start);
        }
        // Сайдбар виден сразу — запускаем сразу
        anim();
    }

    /* ===== Copy button (оставляем) ===== */
    function addCopyButton($content) {
        if (!$content.find(".copy-btn").length) {
            const $actions = $('<div class="comment__actions"></div>');
            const $btn = $('<button type="button" class="copy-btn">Copy text</button>');
            $btn.on("click", async function () {
                const txt = $content.find(".comment__text").text();
                try { await navigator.clipboard.writeText(txt);
                    $(this).addClass("copied").text("Copied ✓");
                    setTimeout(() => $(this).removeClass("copied").text("Copy text"), 1400);
                    toast("Copied to clipboard", "ok", 1200); // только тост копирования
                } catch { toast("Copy failed", "warn"); }
            });
            $actions.append($btn);
            $content.append($actions);
        }
    }
    $(".comment__content").each(function () { addCopyButton($(this)); });

    /* ===== Тост при добавлении КОММЕНТАРИЯ — без дублей ===== */
    const $comments = $(".comments");
    if ($comments.length) {
        const obs = new MutationObserver((muts) => {
            for (const m of muts) {
                // ТОЛЬКО добавления прямых детей .comments и ТОЛЬКО элементов .comment
                [...m.addedNodes].forEach(n => {
                    if (n.nodeType === 1 && n.classList.contains('comment')) {
                        toast("Comment added successfully ✅", "ok");
                        $(n).find(".comment__content").each(function () { addCopyButton($(this)); });
                    }
                });
            }
        });
        // ВАЖНО: subtree: false — чтобы не ловить внутренние вставки и не дублировать
        obs.observe($comments.get(0), { childList: true, subtree: false });
    }

    /* ===== Submit spinner для кнопки отправки ===== */
    const $commentBtn = $("#but");
    const originalBtnText = $commentBtn.text();
    $("#commentForm").on("submit", function () {
        if (!$commentBtn.length || $commentBtn.hasClass("btn-busy")) return;
        $commentBtn.addClass("btn-busy").prop("disabled", true).text("Submitting...");
        setTimeout(() => {
            $commentBtn.removeClass("btn-busy").prop("disabled", false).text(originalBtnText);
        }, 650);
    });

    /* ===== Popup form: мягкий индикатор (без лишних тостов) ===== */
    const $popupForm = $("#subscribeForm");
    if ($popupForm.length) {
        const $btn = $popupForm.find('button[type="submit"]');
        const txt = $btn.text();
        $popupForm.on("submit", function () {
            $btn.addClass("btn-busy").prop("disabled", true).text("Please wait...");
            setTimeout(() => { $btn.removeClass("btn-busy").prop("disabled", false).text(txt); }, 900);
        });
    }

});


