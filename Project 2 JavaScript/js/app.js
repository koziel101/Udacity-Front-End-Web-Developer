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

let sections = document.querySelectorAll("section");
let navBar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav

let div = document.createElement("div");

for (section of sections) {

    let newSectionNavBar = document.createElement("li");
    newSectionNavBar.textContent = (section.dataset.nav);
    newSectionNavBar.className = "navBarItemJS";
    div.appendChild(newSectionNavBar);
}

navBar.appendChild(div);
console.log(navBar)

    // Add class 'active' to section when near top of viewport


    // Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

    // Build menu 

    // Scroll to section on link click

    // Set sections as active
