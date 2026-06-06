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

var position = 0;
var maxPosition = 3;
var clickedIndex;
var colorBtns = [];

var colorList = [
    {
        primaryColor: 'oklch(71.4% 0.203 305.504)',
        secondaryColor: 'oklch(67.3% 0.182 276.935)',
        accent: 'oklch(55.4% 0.046 257.417)'
    },
    {
        primaryColor: 'oklch(63.7% 0.237 25.331)',
        secondaryColor: 'oklch(70.4% 0.191 22.216)',
        accent: 'oklch(76.9% 0.188 70.08)'
    },
    {
        primaryColor: 'oklch(72.3% 0.219 149.579)',
        secondaryColor: 'oklch(79.2% 0.209 151.711)',
        accent: 'oklch(76.5% 0.177 163.223)'
    },
    {
        primaryColor: 'oklch(62.3% 0.214 259.815)',
        secondaryColor: 'oklch(70.7% 0.165 254.624)',
        accent: 'oklch(67.3% 0.182 276.935)'
    },
    {
        primaryColor: 'oklch(57.7% 0.245 27.325)',
        secondaryColor: 'oklch(63.7% 0.237 25.331)',
        accent: 'oklch(70.4% 0.191 22.216)'
    },
    {
        primaryColor: 'oklch(70.5% 0.213 47.604)',
        secondaryColor: 'oklch(75% 0.183 55.934)',
        accent: 'oklch(76.9% 0.188 70.08)'
    },

]

createColorBtn("oklch(71.4% 0.203 305.504)", "oklch(67.3% 0.182 276.935)", "oklch(55.4% 0.046 257.417)")
createColorBtn("oklch(63.7% 0.237 25.331)", "oklch(70.4% 0.191 22.216)", "oklch(76.9% 0.188 70.08)")
createColorBtn("oklch(72.3% 0.219 149.579)", "oklch(79.2% 0.209 151.711)", "oklch(76.5% 0.177 163.223)")
createColorBtn("oklch(62.3% 0.214 259.815)", "oklch(70.7% 0.165 254.624)", "oklch(67.3% 0.182 276.935)")
createColorBtn("oklch(57.7% 0.245 27.325)", "oklch(63.7% 0.237 25.331)", "oklch(70.4% 0.191 22.216)")
createColorBtn("oklch(70.5% 0.213 47.604)", "oklch(75% 0.183 55.934)", "oklch(76.9% 0.188 70.08)")

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

fontBtns.forEach(btn => {

    btn.addEventListener("click", e => {

        e.stopPropagation()

        var fontName = btn.dataset.font;
        document.body.style.fontFamily = `"${fontName}", sans-serif`;

        fontBtns.forEach((b) => {
            b.classList.remove("active");
        });

        btn.classList.add("active");

    });
});

colorBtns.forEach(color => {
    color.addEventListener("mouseenter", e => {

        color.style.transform = "scale(1.1)";
        color.style.borderColor = "#EC4B97";

    })
})

colorBtns.forEach(color => {
    color.addEventListener("mouseleave", e => {

        color.style.transform = "scale(1)";
        color.style.borderColor = "#314158";

    })
})

// colorBtns.forEach(color => {
//     color.addEventListener("click" , e => {

//         e.stopPropagation()

//         // `.from-primary{ --tw-gradient-from: ${value}; }`

//         change.classList.remove"from-primary", 
//             "via-secondary", 
//             "to-accent", 
//         //     // "bg-clip-text", 
//         //     // "text-transparent",
//         //     // "bg-gradient-to-r")
//         // // change.style.cssText = "color: oklch(76.9% 0.188 70.08)"
//         // change.style.color = "oklch(76.9% 0.188 70.08)"
//     })
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

scrollUpBtn.addEventListener("click", e => {
    var targetSection = document.querySelector("#hero-section");
    targetSection.scrollIntoView({ behavior: 'smooth' });
})

tabs.forEach(tab => {
    tab.addEventListener("click", e => {

        tabs.forEach(tab => {
            tab.classList.remove("bg-linear-to-r", "from-primary", "to-secondary")
            tabs[0].classList.add("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700")
        })

        e.target.classList.add("bg-linear-to-r", "from-primary", "to-secondary")

        var filterValue = e.target.dataset.filter;
        var allItems = document.querySelectorAll('.portfolio-item');

        allItems.forEach(item => {
            var itemCategory = item.dataset.category;

            if (filterValue === "all" || filterValue === itemCategory) {

                item.classList.remove("hidden");
                item.style.display = "block";

            } else {

                item.classList.add("hidden");
                item.style.display = "none";
            }

        })

    })
})

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

function createColorBtn(color1, color2, color3) {

    var colorBtn = document.createElement("button")
    colorBtn.style.cssText = `width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(to right bottom , ${color1} , ${color2} , ${color3});
        border: 2px solid #314158;
        transition: all 0.3s`

    colorBtns.push(colorBtn)

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
            position++
        }

        else {

            click.classList.remove("bg-accent");
            click.classList.add("dark:bg-slate-600");
            click.setAttribute("aria-selected", "false");
        }

    });

}




