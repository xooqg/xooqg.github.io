const params = new URLSearchParams(window.location.search);
const img = document.querySelector(".starting_img");
const page = document.querySelector(".page")
console.log(img);
const colorThief = new ColorThief();

const navButtons = document.querySelectorAll(".nav-bar a");
const navText = document.querySelectorAll(".nav-bar a h2");

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

window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

openCard();

window.addEventListener("load", () => {
    animateCard();
});

function openCard() {
    const top = params.get("top");
    const left = params.get("left");

    img.src = params.get("src");
    img.alt = "cardImage";
    img.style.border = "2px solid transparent"
    let image = new Image();



    gsap.set(img, {
        borderColor: "rgba(0, 0, 0, 0.2)",
        position: 'absolute',
        height: '25vh',
        width: '25vw',
        top: `${top}px`,
        left: `${left}px`,
        skewY: 15,
    });

    image.crossOrigin = "Anonymous";
    image.src = img.src;
    image.onload = function () {

        let color = colorThief.getColor(image);
        let rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        img.style.borderColor = rgb;
    }
}


function animateCard() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.to(img, {
        duration: 1,
        top: centerY,
        left: centerX,
        xPercent: -50,
        yPercent: -50,
        ease: "power3.out",
        onComplete: () => {
            gsap.to(img, {
                duration: 1,
                skewY: 0,
                ease: "power3.out",
                onComplete: () => {
                    gsap.to(img, {
                        duration: 1.5,
                        opacity: 0,
                        ease: "power3.inOut",
                    });
                    page.style.opacity = "1";

                    gsap.utils.toArray('.fade-in img').forEach((el) => {
                        gsap.to(el, {
                            scrollTrigger: {
                                trigger: el,
                                start: "top 100%",
                                toggleActions: "play none none none",
                            },
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out"
                        });
                    });
                }
            });
        }
    });


}
