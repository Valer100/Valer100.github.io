document.addEventListener("DOMContentLoaded", function() {
    function checkBodyScrollable() {
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (!isMobile) {
            if (document.body.scrollHeight > window.innerHeight) {
                document.body.classList.add("scrollable");
            } else {
                document.body.classList.remove("scrollable");
            }
        }
    }

    checkBodyScrollable();

    window.addEventListener("resize", checkBodyScrollable);
});