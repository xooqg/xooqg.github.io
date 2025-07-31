const navButtons = document.querySelectorAll(".nav-bar a");
const navText = document.querySelectorAll(".nav-bar a h2");
const body = document.querySelector("body");
const image = document.querySelector(".self-photo img");
const description = document.querySelector(".description");


gsap.set(image, {
    y: "-100vh",
    opacity: 0
});

//Contact Page
const contact_page = document.querySelector("#contact-page")
const page = document.querySelector(".page")
const contact_button = document.querySelector(".contact-button");
const contact_buttons = document.querySelector(".contact-buttons");
if (contact_page) {
    contact_page.addEventListener("click", closeContactPage);
}


if (contact_button) {

    contact_button.addEventListener("click", openContactPage);
}

function openContactPage() {
    contact_page.style.opacity = "1";
    contact_page.style.pointerEvents = "all";

    page.classList.add("blur");
}

function closeContactPage(e) {
    if (contact_buttons && contact_buttons.contains(e.target)) {
        return;
    }
    contact_page.style.pointerEvents = "none";

    console.log("Clicked outside contact-buttons – closing");
    contact_page.style.opacity = "0";
    page.classList.remove("blur");
}

for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("mouseenter", () => onNavEnter(i))
    navButtons[i].addEventListener("mouseleave", () => onNavExit(i))

}

function onNavEnter(index) {
    navText[index].classList.add("selected");
}

function onNavExit(index) { 
    navText[index].classList.remove("selected");
}

window.addEventListener("load", () => {
    loadPage();
});

function loadPage()
{
    body.style.opacity = 1;

    let triggered = false;

    gsap.to(image, {
        y: window.innerHeight * -0.5,
        opacity: 1,
        duration: 1,
        ease: "power2.inout",
        onUpdate: function () {
            const currentY = gsap.getProperty(image, "y");

            const thirtyVh = window.innerHeight * -0.7;
            if (!triggered && currentY >= thirtyVh) {
                triggered = true;
                description.style.opacity = 1;
            }
        }
    });
}