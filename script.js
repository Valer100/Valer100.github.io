const titlebar = document.querySelector(".titlebar");
const backToTopButton = document.querySelector(".back-to-top");

let scrollingToTop = false;
let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

function scrollToTop() {
    scrollingToTop = true;

    backToTopButton.classList.remove("visible");
    window.scroll(0, 0, "smooth");
}

backToTopButton.onclick = scrollToTop;

window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    console.log(scrollingToTop);

    if (currentScroll == 0) scrollingToTop = false;

    if (!scrollingToTop) {
        if (currentScroll > 50) backToTopButton.classList.add("visible");
        else backToTopButton.classList.remove("visible");
    }

    if (currentScroll > lastScrollTop) titlebar.classList.add("minimal");
    else if (currentScroll < lastScrollTop) titlebar.classList.remove("minimal");

    lastScrollTop = currentScroll;
}, false);
