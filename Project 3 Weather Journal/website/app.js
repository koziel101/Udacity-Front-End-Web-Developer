// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
// To call OpenWeather API by Zip Code:
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=eb34694edecea0a4472b2e26672b6d04";
const celsiusMetric = "&units=metric";
// Zip code to test: 10001
// Working example url: https://api.openweathermap.org/data/2.5/weather?zip=10001&appid=eb34694edecea0a4472b2e26672b6d04&units=metric

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
        console.log("New data received: ");
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Error" + error);
    }
}

// Listening for when the "Generate" button is clicked
document.getElementById('generate').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    if (zipCode.length != 5) {
        window.alert("Zip code must have 5 numbers! It currently has " + zipCode.length + " characters.");
    } else {
        if (isNumeric(zipCode)) {
            getWeather(baseUrl, zipCode, apiKey, celsiusMetric).then(function(data) {
                // Saving data with POST request
                console.log("Data saved:");
                postData("/addWeather", { city: data.name, currentTemp: data.main.temp, feeling: feeling, newDate: newDate });
            }).then(() =>
                updateUI()
            )
        } else {
            window.alert("Zip code must be only numbers!");
        }
    }
}

// Check if the zip code typed is numeric
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

const getWeather = async(baseURL, zipCode, key, celsiusMetric) => {
    const res = await fetch(baseURL + zipCode + key + celsiusMetric);
    try {
        const data = await res.json();
        console.log("Data received from the Weather API:");
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = "Date: " + allData.newDate;
        document.getElementById('temp').innerHTML = "Current temperature: " + allData.currentTemp;
        document.getElementById('content').innerHTML = "How you are feeling: " + allData.feeling;

    } catch (error) {
        console.log("error", error);
    }
}