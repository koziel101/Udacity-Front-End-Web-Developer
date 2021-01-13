/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// Personal API Key for OpenWeatherMap API
// To call OpenWeather API by Zip Code:
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=eb34694edecea0a4472b2e26672b6d04";
const imperialMetric = "&units=imperial";
// Zip code to test: 10001
// Working example url: https://api.openweathermap.org/data/2.5/weather?zip=10001&appid=eb34694edecea0a4472b2e26672b6d04&units=imperial

const postData = async(url = '', data = {}) => {
    console.log(data);
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
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error" + error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    console.log("Test");
}

postData('/addWeather', { movie: "Matrix", weather: 24 });



// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */