$(document).ready(function() {
    function animateCounters() {
        $('#stats .count').each(function() {
            const $this = $(this);
            const target = +$this.data('target');
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function updateCounter(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easedProgress);

                $this.text(current.toLocaleString()+"+");

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    let animated = false;
    $(window).on('scroll', function() {
        const statsTop = $('#stats').offset().top - window.innerHeight + 100;
        if (!animated && $(window).scrollTop() > statsTop) {
            animateCounters();
            animated = true;
        }
    });
});