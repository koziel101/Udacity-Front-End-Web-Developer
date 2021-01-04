// Global Variables
const sections = document.querySelectorAll("section");
const navBar = document.getElementById("navbar__list");
let activeSection;
// Get the container element
let btnContainer = document.getElementById("navbar__list");
// Get all list items with class="navBarItemJS" inside the container
let btns = btnContainer.getElementsByClassName("navBarItemJS");

/**
 * Functions
*/

// Check if a section is in the Viewport
let isInViewport = function (section) {
    var bounding = section.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Adds eventListener for when user scrolls. Also sets activeSection to which section is currently on the Viewport.
let monitorSections = function (section) {
    let last_known_scroll_position = 0;
    let inViewport = false;

    document.addEventListener('scroll', function (e) {
        last_known_scroll_position = isInViewport(section);

        if (isInViewport(section)) {
            inViewport = true;
            activeSection = section;


            //Setting active__state on the navBar
            var current = document.getElementsByClassName("active__state");

            // If there's no active class
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active__state", "");
            }

            // Add the active class to the current/clicked button
            for (btn of btns) {
                if (btn.textContent === section.dataset.nav) {
                    btn.className += " active__state";
                    break;
                }
            }

        } else {
            inViewport = false;
        }
    });
}

// Building the nav
const div = document.createElement("div");

for (section of sections) {
    let newSectionNavBar = document.createElement("li");
    newSectionNavBar.textContent = (section.dataset.nav);
    newSectionNavBar.className = "navBarItemJS";
    div.appendChild(newSectionNavBar);
}

navBar.appendChild(div);

// Starts monitoring the user's scrolling
for (section of sections) {
    monitorSections(section);
}

// Add class 'active' to section when near top of viewport

// Loop through the elements and add the active class to the current/clicked button
for (btn of btns) {
    btn.addEventListener("click", function () {
        var current = document.getElementsByClassName("active__state");

        // If there's no active class
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active__state", "");
        }

        // Add the active class to the current/clicked button
        this.className += " active__state";
    });
}

// Scroll to anchor ID using scrollTO event

// Scroll to section on link click

// Set sections as active
