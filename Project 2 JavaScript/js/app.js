/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const sections = document.querySelectorAll("section");
const navBar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

let isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

let monitorSections = function (section) {
    let last_known_scroll_position = 0;
    let inViewport = false;

    document.addEventListener('scroll', function (e) {
        last_known_scroll_position = isInViewport(section);

        if (isInViewport(section)) {
            console.log(section.dataset.nav + " is in the viewport!");
            inViewport = true;
        } else {
            console.log(section.dataset.nav + ' is not in the viewport... :(');
            inViewport = false;
        }
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav

const div = document.createElement("div");

for (section of sections) {

    let newSectionNavBar = document.createElement("li");
    newSectionNavBar.textContent = (section.dataset.nav);
    newSectionNavBar.className = "navBarItemJS";
    div.appendChild(newSectionNavBar);
}

navBar.appendChild(div);
console.log(navBar);

// Add class 'active' to section when near top of viewport

for (section of sections) {
    monitorSections(section);
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
*/

    // Build menu 

    // Scroll to section on link click

    // Set sections as active
