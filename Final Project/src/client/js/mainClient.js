import { validateUserEntry } from "./checkTextUser.js";
import { calculateDateDifference } from "./dayDifference"
let appData = {};
let departureDate = {};
let returnDate = {};
let dayDifference = [];
let hasTrip = false;
let wbData = {};

document.getElementById('btn-new-trip').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    appData = document.getElementById('city').value;
    departureDate = document.getElementById('departure-date').value;
    returnDate = document.getElementById('return-date').value;
    //dayDifference = calculateDateDifference(departureDate);
    dayDifference.push(calculateDateDifference(departureDate));

    if (validateUserEntry(appData)) {
        // Sending data to server, so geonames API will get lat and lng
        postData('http://localhost:3000/addCity', { cityProvided: appData })
            // Server processed the data provided. Code below is for the Client to retrieve the server's response from geonames.
            .then(() => fetch("http://localhost:3000/validateCity"))
            .then(res => res.json())
            .then(data => {
                console.log("New data was received from geonames server.")
                if (data.totalResultsCount === 0) {
                    window.alert("City provided is not valid!");
                } else if (!validateUserEntry(departureDate)) {
                    window.alert("Please select a departure date!");
                } else {
                    // Data provided by user is valid. Sending lat, lng and dayDifference to server. Server will call Weatherbit API 
                    postData('http://localhost:3000/addWeather', {
                        lat: data.geonames[0].lat,
                        lng: data.geonames[0].lng,
                        dayDifference: dayDifference[dayDifference.length - 1]
                    })
                        // Retrieving data provided by Weatherbit API
                        .then(() => fetch("http://localhost:3000/checkWeather"))
                        .then(res => res.json())
                        .then(data => {
                            console.log("New data was received from weatherbit server.")
                            wbData = data;
                        })
                        // Requesting Pixabay server for images on the city
                        .then(postData('http://localhost:3000/pixaPicture', { cityProvided: appData }))
                        // Retrieving data provided by Pixabay API
                        .then(() => fetch("http://localhost:3000/retrievePixaPicture"))
                        .then(res => res.json())
                        .then(data => {
                            console.log("New data was received from Pixabay server.")
                            updateUI(wbData, data);
                        })
                }
            })
    } else {
        window.alert("Text cannot be blank!");
    }
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

export function updateUI(wbData, pixabayData) {
    if (!hasTrip) {
        document.getElementById("no-trip-planned").remove();
        hasTrip = true;
    }

    var fragment = document.createDocumentFragment();
    var container = document.createElement("div");
    container.classList.add("trip-added");

    // Setting the image for the user:
    let image = document.createElement('img');
    image.classList.add("city-img");
    image.setAttribute('src', pixabayData.hits[0].largeImageURL);
    container.appendChild(image);

    // Days away until the trip:
    let myTripTo = document.createElement("h5");
    myTripTo.classList.add("my-trip-to");
    myTripTo.innerText = "Details about my trip to " + appData;
    container.appendChild(myTripTo);

    // Days away until the trip:
    let daysAway = document.createElement("h6");
    if (dayDifference[dayDifference.length - 1] === 0) {
        daysAway.innerText = "The trip is today!";
    } else if (dayDifference[dayDifference.length - 1] === 1) {
        daysAway.innerText = dayDifference[dayDifference.length - 1] + " day until the trip!";
    } else if (dayDifference[dayDifference.length - 1] < 0) {
        daysAway.innerText = "The departure already happened " + (dayDifference[dayDifference.length - 1] * -1) + " days ago";
    } else {
        daysAway.innerText = dayDifference[dayDifference.length - 1] + " days until the trip!";
    }
    daysAway.classList.add("days-away")
    container.appendChild(daysAway);

    // How is the weather:
    let howIsWeather = document.createElement("h6");
    howIsWeather.innerText = "How's the weather: " + wbData.data[0].weather.description;
    howIsWeather.classList.add("hows-weather")
    container.appendChild(howIsWeather);

    //Adding a button to remove trip
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.setAttribute("content", "Test BTN")
    deleteBtn.textContent = "Delete trip"
    deleteBtn.addEventListener('click', deleteMe);
    container.appendChild(deleteBtn)

    // Adding the fragment in the UI
    fragment.appendChild(container);
    document.getElementById("trip-content").appendChild(fragment);
}

function deleteMe(e) {
    e.currentTarget.parentNode.remove();
}

export { buttonClicked, deleteMe }