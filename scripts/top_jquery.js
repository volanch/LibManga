$(document).ready(function () {
    $(document).on("click", ".top-item", function (e) {
        e.preventDefault();

        const title = $(this).find("h3").text().trim();

        navigator.clipboard.writeText(title).then(() => {
            $(this).trigger("copy");

            const $tooltip = $('<span class="copy-tooltip">Copied!</span>');
            $(this).append($tooltip);
            $tooltip.fadeIn(150).delay(800).fadeOut(300, function () {
                $(this).remove();
            });
        }).catch(err => console.error("Failed to copy title:", err));
    });

    $(document).on("copy", ".top-item", function () {
        console.log(`Copied title: ${$(this).find("h3").text().trim()}`);
    });

    $(document).on("dblclick", ".top-item", function () {
        const link = $(this).attr("href");
        if (link) window.location.href = link;
    });

    const $search = $("#search-bar");
    const $suggestions = $("#suggestions");


    $search.on("keyup", function () {
        const query = $(this).val().trim().toLowerCase();
        const $items = $("#top-grid .top-item");
        $suggestions.empty();

        if (!query) {
            $items.show();
            $items.find("h3").each(function () {
                $(this).html($(this).text());
            });
            $suggestions.hide();
            return;
        }

        const matches = [];
        $items.each(function () {
            const $title = $(this).find("h3");
            const text = $title.text();
            const lower = text.toLowerCase();

            if (lower.includes(query)) {
                $(this).show();
                matches.push(text);

                const regex = new RegExp(`(${query})`, "gi");
                $title.html(text.replace(regex, '<span class="highlight">$1</span>'));
            } else {
                $(this).hide();
                $title.html(text);
            }
        });

        const uniqueMatches = [...new Set(matches)];
        if (uniqueMatches.length > 0) {
            uniqueMatches.slice(0, 6).forEach(t =>
                $suggestions.append(`<li>${t}</li>`)
            );
            $suggestions.show();
        } else {
            $suggestions.hide();
        }
    });

    $(document).on("click", "#suggestions li", function () {
        const text = $(this).text();
        $search.val(text);
        $suggestions.hide();
        $search.trigger("keyup");
    });
});

