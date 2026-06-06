var toggleBtn = document.getElementById("theme-toggle-button");
var activePage = window.location.hash;
var navLinks = Array.from(document.querySelectorAll("nav a"));
var PageSections = document.querySelectorAll("section");
var tabs = Array.from(document.querySelectorAll(".portfolio-filter"));
var tabsItems = Array.from(document.querySelectorAll(".portfolio-item"));
var sideBarBtn = document.querySelector("#settings-toggle");
var sideBar = document.querySelector("#settings-sidebar");
var closeSideBarBtn = document.querySelector("#close-settings");
var fontBtns = document.querySelectorAll(".font-option");
var colorContainer = document.querySelector("#theme-colors-grid")
var resetBtn = document.querySelector("#reset-settings");
var testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
var nextNavBtn = document.querySelector("#next-testimonial");
var prevNavBtn = document.querySelector("#prev-testimonial");
var indicators = Array.from(document.querySelectorAll(".carousel-indicator"));
var scrollUpBtn = document.querySelector("#scroll-to-top");
var colorBtn;

var position = 0;
var maxPosition = 3;
var clickedIndex;



createColorBtn("#8465FA", "#7F6AFF")
createColorBtn("#F65B79", "#F38647")
createColorBtn("#07C278", "#068652")
createColorBtn("#23A6FE", "#1D7FC3")
createColorBtn("#FF455A", "#CD2C3D")
createColorBtn("#FF8D03", "#D15E03")

toggleBtn.addEventListener("click", e => {

    document.documentElement.classList.toggle("dark")
})

window.addEventListener("load", e => { scrollSpy() })

sideBarBtn.addEventListener("click", e => {

    sideBar.classList.remove("translate-x-full")
    sideBarBtn.style.cssText = "  transform: translateX(-320px); "
    e.stopPropagation()

})

closeSideBarBtn.addEventListener("click", e => {

    sideBar.classList.add("translate-x-full")
    sideBarBtn.style.cssText = "  transform: translateX(0); "
})

window.addEventListener("click", e => {

    sideBar.classList.add("translate-x-full")
    sideBarBtn.style.cssText = "  transform: translateX(0); "
})

fontBtns.forEach((btn) => {

    btn.addEventListener("click", e => {
        e.stopPropagation()
        changeFont()

    });
});

// colorBtn.addEventListener("mouseenter" , e => {
//     colorBtn.classList.add("scale(1.2)")
// })

resetBtn.addEventListener("click", e => {

    document.body.style.fontFamily = "Tajawal, sans-serif"
    e.stopPropagation()

})

window.addEventListener("scroll", e => {
    if (scrollY >= 720) {
        scrollUpBtn.classList.remove("opacity-0", "invisible")
    }

    else {
        scrollUpBtn.classList.add("opacity-0", "invisible")
    }
})

scrollUpBtn.addEventListener("click" , e => {
    var targetSection = document.querySelector("#hero-section"); 
    targetSection.scrollIntoView({behavior: 'smooth'});
})

// tabs.forEach(tab => {
//     tab.addEventListener("click", e => {
//         console.log(tab)

//         tabs.forEach(tab => {
//             tab.classList.remove("bg-linear-to-r", "from-primary", "to-secondary")
//             tabs[0].classList.add("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700")
//         })

//         e.currentTarget.classList.add("bg-linear-to-r", "from-primary", "to-secondary")

//         var filterBtn = document.querySelector(e.currentTarget.dataset.filter);
//         var items = document.querySelector(e.currentTarget.dataset.category)

//         if (filterBtn === items) {
//             items.style.display = "block";
//         }
//         else {
//             items.style.display = "none";
//         }

//         console.log(e.currentTarget.dataset.filter)
//     })
// })

nextNavBtn.addEventListener("click", e => {

    showNextSlide()

})

prevNavBtn.addEventListener("click", e => {

    showPrevSlide()

})

indicators.forEach(indicator => {

    indicator.addEventListener("click", e => {
        clickedIndex = indicators.indexOf(e.target);
        switchIndicators()
    });
});

function scrollSpy() {

    var options = {
        threshold: 0.3
    };

    var observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                var id = entry.target.getAttribute("id");

                navLinks.forEach((link) => link.classList.remove("active"));

                var activeLink = document.querySelector(`nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, options);

    PageSections.forEach((section) => observer.observe(section));

}

function changeFont() {

    var fontName = btn.dataset.font;
    document.body.style.fontFamily = `"${fontName}", sans-serif`;

    fontBtns.forEach((b) => {
        b.classList.remove("active");
    });

    btn.classList.add("active");

}

function createColorBtn(color1, color2) {

    colorBtn = document.createElement("button")
    colorBtn.style.cssText = `width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(to right , ${color1} , ${color2});
        border: 2px solid #314158;`

    colorContainer.appendChild(colorBtn)

}

function showNextSlide() {
    if (position === maxPosition) {

        nextNavBtn.classList.add("disabled:opacity-50", "disabled:pointer-events-none");
        return;

    }

    position++;

    testimonialCards.forEach(card => {
        var cardSize = card.getBoundingClientRect().width;
        var offset = cardSize * position;
        card.style.cssText = `  transform: translateX(${offset}px);
            transition: 0.5s`;

    })

}

function showPrevSlide() {

    if (position === 0) {

        prevNavBtn.classList.add("disabled:opacity-50", "disabled:pointer-events-none");
        return;
    }

    position--;

    testimonialCards.forEach(card => {
        var cardSize = card.getBoundingClientRect().width;
        var offset = cardSize * position;
        card.style.cssText = `  transform: translateX(${offset}px);
            transition: 0.5s`;

    })

}

function switchIndicators() {

    indicators.forEach((click, index) => {

        if (index === clickedIndex) {

            click.classList.add("bg-accent");
            click.classList.remove("dark:bg-slate-600");
            click.setAttribute("aria-selected", "true");
            // showNextSlide()
            position++
        }

        else {

            click.classList.remove("bg-accent");
            click.classList.add("dark:bg-slate-600");
            click.setAttribute("aria-selected", "false");
        }

    });

}






