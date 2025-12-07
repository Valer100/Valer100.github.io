const titlebar = document.querySelector(".titlebar");
const backToTopButton = document.querySelector(".back-to-top");

// Collapsing toolbar (for small screens) and back to top button
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


// Show only the Romanian strings if the browser's language is set to Romanian
if (navigator.language.toLowerCase() === "ro" || navigator.language.toLowerCase() === "ro-ro") {
    document.documentElement.removeAttribute("lang");
    
    en_elements = document.querySelectorAll("*[lang=\"en\"]");
    ro_elements = document.querySelectorAll("*[lang=\"ro\"]");

    document.documentElement.setAttribute("lang", "ro");

    for (let i = 0; i < en_elements.length; i++) {
        const previousState = getComputedStyle(en_elements[i]).display

        en_elements[i].style.setProperty("display", "none", "important");
        ro_elements[i].style.setProperty("display", previousState, "important");

    }
}


// Adjust navigation bar buttons' tooltips
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
setTimeout(adjustTooltipPositions, 100);