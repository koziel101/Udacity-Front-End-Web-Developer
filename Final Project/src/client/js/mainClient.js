import { validateUserEntry } from "./checkTextUser.js";
import { calculateDateDifference } from "./dayDifference"
let appData = {};
let departureDate = {};
let returnDate = {};
let dayDifference = {};

document.getElementById('btn-new-trip').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    appData = document.getElementById('city').value;
    departureDate = document.getElementById('departure-date').value;
    returnDate = document.getElementById('return-date').value;
    dayDifference = calculateDateDifference(departureDate);

    if (validateUserEntry(appData)) {
        // Sending data to server
        postData('http://localhost:3000/addCity', { cityProvided: appData })
            // Server processed the data provided. Code below is for the Client to retrieve the server's response from geonames.
            .then(() => fetch("http://localhost:3000/validateCity"))
            .then(res => res.json())
            .then(data => {
                if (data.totalResultsCount === 0) {
                    window.alert("City provided is not valid!");
                } else if (!validateUserEntry(departureDate)) {
                    window.alert("Please select a departure date!");
                } else {
                    postData('http://localhost:3000/addWeather', {
                        lat: data.geonames[0].lat,
                        lng: data.geonames[0].lng,
                        dayDifference: dayDifference
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

export { buttonClicked }