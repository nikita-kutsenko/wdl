let nav = document.getElementById("nav"),
    logo = document.getElementById("logo"),
    nonActive = document.querySelectorAll(".nav-nonactive");

window.addEventListener("scroll", navFunc);

function navFunc() {
    if (window.pageYOffset >= 40) {
        nav.style.backgroundColor = "#051257";
        logo.style.color = "#FFFFFF"
        for (i = 0; i < nonActive.length; i++) {
            nonActive[i].style.boxShadow = "none"
        }
    } else {
        nav.style.backgroundColor = "transparent";
        logo.style.color = "#051257"
        for (i = 0; i < nonActive.length; i++) {
            nonActive[i].style.boxShadow = "-10px 10px 20px rgba(211, 212, 212, 0.2), 10px -10px 20px rgba(211, 212, 212, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.9), 10px 10px 25px rgba(211, 212, 212, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(211, 212, 212, 0.5)"
        }
    }
}