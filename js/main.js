var toggleBtn = document.getElementById("theme-toggle-button");
var activePage = window.location.hash;
var navLinks = Array.from(document.querySelectorAll("nav a"));
var PageSections = document.querySelectorAll("section");
var tabs = Array.from(document.querySelectorAll(".portfolio-filter"));
var items = Array.from(document.querySelectorAll(".portfolio-item"));
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
var clickedIndex;
var colorBtns = [];

var colorList = [
    {
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        accent: '#a855f7'
    },
    {
        primaryColor: '#fb2c36',
        secondaryColor: '#ff6467',
        accent: '#fe9a00'
    },
    {
        primaryColor: '#00c950',
        secondaryColor: '#06df72',
        accent: '#00d492'
    },
    {
        primaryColor: '#2b7fff',
        secondaryColor: '#51a2ff',
        accent: '#7c86ff'
    },
    {
        primaryColor: '#e7000b',
        secondaryColor: '#fb2c36',
        accent: '#ff6467'
    },
    {
        primaryColor: '#ff6900',
        secondaryColor: '#ff8903',
        accent: '#fe9a00'
    },

]

createColorBtn("#6366f1", "#8b5cf6", "#a855f7")
createColorBtn("#fb2c36", "#ff6467", "#fe9a00")
createColorBtn("#00c950", "#06df72", "#00d492")
createColorBtn("#2b7fff", "#51a2ff", "#7c86ff")
createColorBtn("#e7000b", "#fb2c36", "#ff6467")
createColorBtn("#ff6900", "#ff8903", "#fe9a00")

document.documentElement.style.setProperty("--color-primary", JSON.parse(localStorage.getItem("primary color")), "important");
document.documentElement.style.setProperty("--color-secondary", JSON.parse(localStorage.getItem("secondary color")), "important");
document.documentElement.style.setProperty("--color-accent", JSON.parse(localStorage.getItem("accent color")), "important");
document.body.style.fontFamily = JSON.parse(localStorage.getItem("font"));

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

        localStorage.setItem("font", JSON.stringify(document.body.style.fontFamily))
    });


});

colorBtns.forEach(color => {
    color.addEventListener("mouseenter", e => {

        color.style.transform = "scale(1.1)";
        color.style.borderColor = "#EC4B97";

        color.addEventListener("mouseleave", e => {

            color.style.transform = "scale(1)";
            color.style.borderColor = "#314158";

        })
    })
})

colorBtns.forEach((btn, index) => {
    btn.addEventListener("click", e => {
        e.stopPropagation();

        var theme = colorList[index];

        document.documentElement.style.setProperty("--color-primary", theme.primaryColor, "important");
        document.documentElement.style.setProperty("--color-secondary", theme.secondaryColor, "important");
        document.documentElement.style.setProperty("--color-accent", theme.accent, "important");


        localStorage.setItem("primary color", JSON.stringify(theme.primaryColor))
        localStorage.setItem("secondary color", JSON.stringify(theme.secondaryColor))
        localStorage.setItem("accent color", JSON.stringify(theme.accent))

    });
});

resetBtn.addEventListener("click", e => {

    document.body.style.fontFamily = "Tajawal, sans-serif"

    document.documentElement.style.setProperty("--color-primary", "#6366f1", "important");
    document.documentElement.style.setProperty("--color-secondary", "#8b5cf6", "important");
    document.documentElement.style.setProperty("--color-accent", "#6366f1", "important");

    localStorage.setItem("font", JSON.stringify(document.body.style.fontFamily))


    localStorage.setItem("primary color", JSON.stringify("#6366f1"))
    localStorage.setItem("secondary color", JSON.stringify("#8b5cf6"))
    localStorage.setItem("accent color", JSON.stringify("#6366f1"))
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

        items.forEach(item => {
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

    var maxPosition = 3;

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
        }

        else {

            click.classList.remove("bg-accent");
            click.classList.add("dark:bg-slate-600");
            click.setAttribute("aria-selected", "false");
        }

    });

}











// indicators.forEach(indicator => {
//     changeSlides()
// })

// function changeSlides(index) {
//     testimonialCards.forEach( card => {
//         var cardSize = card.getBoundingClientRect().width;
        
//         var offset = -(cardSize * index);
        
//         // card.style.cssText = `
//         //     transform: translateX(${offset}px);
//         //     transition: 0.5s ease-in-out;
//         // `;
        
//     });
// }






