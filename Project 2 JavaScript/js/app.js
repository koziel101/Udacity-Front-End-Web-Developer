// Global Variables
const sections = document.querySelectorAll("section");
const navBar = document.getElementById("navbar__list");
let activeSection;
// Get the container element
const btnContainer = document.getElementById("navbar__list");
// Get all list items with class="navBarItemJS" inside the container
const btns = btnContainer.getElementsByClassName("navBarItemJS");

/**
 * Functions
*/

// Check if a section is in the Viewport
let isInViewport = function (section) {
    let bounding = section.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Adds eventListener for when user scrolls. Also sets activeSection to which section is currently on the Viewport.
const monitorSections = function (section) {
    let inViewport = false;

    document.addEventListener('scroll', function (e) {

        if (isInViewport(section.getElementsByClassName("landing__container")[0].getElementsByTagName("h2")[0])) {
            inViewport = true;
            activeSection = section;

            //Setting active__state on the navBar
            let current = document.getElementsByClassName("active__state");

            // If there's an active class
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active__state", "");
            }

            // Add the active class to the current/clicked NavBarItem
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

// Building the navBar
for (section of sections) {
    let newSectionNavBar = document.createElement("li");
    newSectionNavBar.textContent = (section.dataset.nav);
    newSectionNavBar.className = "navBarItemJS";
    navBar.appendChild(newSectionNavBar);
}

// Starts monitoring the user's scrolling
for (section of sections) {
    monitorSections(section);
}

// Loop through the elements and add the active class to the current/clicked button
for (btn of btns) {
    btn.addEventListener("click", function () {
        let current = document.getElementsByClassName("active__state");

        // If there's an active class
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active__state", "");
        }

        // Add the active class to the current/clicked button
        this.className += " active__state";

        // If the section is clicked, scroll to it
        for (section of sections) {
            if (this.textContent === section.dataset.nav) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}
