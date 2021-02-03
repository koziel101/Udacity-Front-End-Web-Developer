const dotenv = require('dotenv');
dotenv.config();
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// Details for geonames API request
const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const geonamesUsername = "&maxRows=1&username=hiagokoziel"
// Example of working URL: http://api.geonames.org/searchJSON?q=hawaii&maxRows=1&username=hiagokoziel

// Details for weatherbit API request
// Shared details
const WbLat = "lat=";
const WbLon = "&lon=";
const WbKey = "&key=";

// Current Weather API
const WbCurrentBaseUrl = "https://api.weatherbit.io/v2.0/current?&";
// Example of working URL: 
// https://api.weatherbit.io/v2.0/current?&lat=20.78785&lon=-156.38612&key=9c1232e0219649419a091ae456846ef9

// 16-day forecast weatherbit API
const WbForecastBaseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?&";
// Example of working URL: 
// https://api.weatherbit.io/v2.0/forecast/daily?&lat=20.78785&lon=-156.38612&key=9c1232e0219649419a091ae456846ef9

const pixabayBaseUrl = "https://pixabay.com/api/?key=";
const pixabaySearchTerm = "&q=";
const pixabayImageType = "&image_type=photo";
// Example of working URL: https://pixabay.com/api/?key=20141295-22fabcece44eace15b1dd2bbb&q=yellow+flowers&image_type=photo

var path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const data = [];
let latestEntryGeoNames = {};
let latestEntryWeatherBit = {};
let latestEntryPixaPicture = {};
let apiJsonResponse = null;
const fetch = require("node-fetch");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'))
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Designate port 3000 to listen for incoming requests
app.listen(3000, function () {
    console.log('Server side is running and listening on port 3000!')
})

// post route for /addCity, to obtain latitude and longitude from geonames
app.post('/addCity', (req, res) => {
    console.log('I got a request for geonames.')
    data.push(req.body);
    let newEntry = {
        cityProvided: req.body.cityProvided
    }
    // Getting the city's coordinates
    getCoordinatesAPI(geonamesBaseUrl, newEntry.cityProvided, geonamesUsername)
        .then(function (data) {
            latestEntryGeoNames = data
            res.send(latestEntryGeoNames)
            res.end();
        })
        .then(function (data) {
            if (latestEntryGeoNames.totalResultsCount === 0) {
                console.log("There are no results for the city provided")
            }
        })
})

// post route for /addWeather to obtain weather forecast
app.post('/addWeather', (req, res) => {
    console.log('I got a request for weatherbit.')
    data.push(req.body);
    if (req.body.dayDifference > 7) {
        let newEntry = {
            lng: req.body.lng,
            lat: req.body.lat
        }
        // Getting the city's current weather
        getForecastWeatherDetailsAPI(WbForecastBaseUrl, WbLat, newEntry.lat, WbLon, newEntry.lng, WbKey, WEATHERBIT_API_KEY)
            .then(function (data) {
                latestEntryWeatherBit = data
                res.send(latestEntryWeatherBit)
                res.end();
            })
    } else {
        let newEntry = {
            lng: req.body.lng,
            lat: req.body.lat
        }
        // Getting the city's current weather
        getCurrentWeatherDetailsAPI(WbCurrentBaseUrl, WbLat, newEntry.lat, WbLon, newEntry.lng, WbKey, WEATHERBIT_API_KEY)
            .then(function (data) {
                latestEntryWeatherBit = data
                res.send(latestEntryWeatherBit)
                res.end();
            })
    }
})

// post route for /addCity, to obtain latitude and longitude from geonames
app.post('/pixaPicture', (req, res) => {
    console.log('I got a request for Pixabay.')
    data.push(req.body);
    console.log(data);
    let newEntry = {
        cityProvided: req.body.cityProvided
    }
    // Getting the city's picture
    getPixaPictureAPI(pixabayBaseUrl, PIXABAY_API_KEY, pixabaySearchTerm, newEntry.cityProvided, pixabayImageType)
        .then(function (data) {
            latestEntryPixaPicture = data
            res.send(latestEntryPixaPicture)
            res.end();
        })
})

// Returning geonomes API data to the client side
app.post("/validateCity", (req, res) => {
    return { latestEntryGeoNames };
})

app.get("/validateCity", (req, res) => {
    res.send(latestEntryGeoNames)
})

// Returning Weatherbit API data to the client side
app.post("/checkWeather", (req, res) => {
    return { latestEntryWeatherBit };
})

app.get("/checkWeather", (req, res) => {
    res.send(latestEntryWeatherBit)
})

// Returning Pixabay API data to the client side
app.post("/retrievePixaPicture", (req, res) => {
    return { latestEntryPixaPicture };
})

app.get("/retrievePixaPicture", (req, res) => {
    res.send(latestEntryPixaPicture)
})

// Calling geonames API to obtain the city's coodinations
const getCoordinatesAPI = async (geonamesBaseUrl, textUser, geonamesUsername) => {

    const res = await fetch(geonamesBaseUrl + textUser + geonamesUsername)
    try {
        const data = await res.json();
        apiJsonResponse = data;
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}


// Calling weatherbit API to obtain the city's coodinations - Current
const getCurrentWeatherDetailsAPI = async (WbCurrentBaseUrl, WbLat, latValue, WbLon, lngValue, WbKey, WEATHERBIT_API_KEY) => {

    const res = await fetch(WbCurrentBaseUrl + WbLat + latValue + WbLon + lngValue + WbKey + WEATHERBIT_API_KEY)
    try {
        const data = await res.json();
        apiJsonResponse = data;
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}

// Calling weatherbit API to obtain the city's coodinations - Forecast
const getForecastWeatherDetailsAPI = async (WbForecastBaseUrl, WbLat, latValue, WbLon, lngValue, WbKey, WEATHERBIT_API_KEY) => {

    const res = await fetch(WbForecastBaseUrl + WbLat + latValue + WbLon + lngValue + WbKey + WEATHERBIT_API_KEY)
    try {
        const data = await res.json();
        apiJsonResponse = data;
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}

// Calling Pixabay API to obtain the city's picture
const getPixaPictureAPI = async (pixabayBaseUrl, PIXABAY_API_KEY, pixabaySearchTerm, cityProvided, pixabayImageType) => {

    const res = await fetch(pixabayBaseUrl + PIXABAY_API_KEY + pixabaySearchTerm + cityProvided + pixabayImageType)
    try {
        const data = await res.json();
        console.log("Data received from Pixabay server: ")
        console.log(data)
        apiJsonResponse = data;
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}
