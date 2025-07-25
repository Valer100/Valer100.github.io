const titlebar = document.querySelector(".titlebar");
const backToTopButton = document.querySelector(".back-to-top");


let scrollingToTop = false;
let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

function scrollToTop() {
    scrollingToTop = true;

    backToTopButton.classList.remove("visible");
    window.scroll(0, 0, "smooth");
}

if (backToTopButton != null) backToTopButton.onclick = scrollToTop;

window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll == 0) scrollingToTop = false;

    if (!scrollingToTop && backToTopButton != null) {
        if (currentScroll > 50) backToTopButton.classList.add("visible");
        else backToTopButton.classList.remove("visible");
    }

    if (currentScroll > lastScrollTop) titlebar.classList.add("minimal");
    else if (currentScroll < lastScrollTop) titlebar.classList.remove("minimal");

    lastScrollTop = currentScroll;
}, false);


const titlebarButtons = document.querySelectorAll("a.btn-titlebar");

function isElementFullyVisibleX(element) {
    const rect = element.getBoundingClientRect();
    return (rect.left + 1 >= 0 && rect.right + 1 <= (document.documentElement.clientWidth));
}

function adjustTooltipPositions() {
    for (let i = 0; i < titlebarButtons.length; i++) {
        const buttonTooltip = titlebarButtons[i].querySelector(".tooltip");
        buttonTooltip.style.transform = "translateX(" + (33 - buttonTooltip.offsetWidth) / 2 + "px) translateY(-7px)";
        
        if (!isElementFullyVisibleX(buttonTooltip)) {
            buttonTooltip.style.transform = "translateX(" + (33 - buttonTooltip.offsetWidth + 8) + "px) translateY(-7px)";
        }
    }
}

window.addEventListener("resize", adjustTooltipPositions, false);
adjustTooltipPositions();