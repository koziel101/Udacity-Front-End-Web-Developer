const dotenv = require('dotenv');
dotenv.config();
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;

// Details for geonames API request
const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const geonamesUsername = "&maxRows=1&username=hiagokoziel"
// Example of working URL: http://api.geonames.org/searchJSON?q=hawaii&maxRows=1&username=hiagokoziel

// Details for weatherbit API request
const weatherbitCurrentBaseUrl = "https://api.weatherbit.io/v2.0/current?&";
const weatherbitCurrentLat = "lat=";
const weatherbitCurrentLon = "&lon=";
const weatherbitCurrentKey = "&key=";
// Example of working URL: 
// https://api.weatherbit.io/v2.0/current?&lat=20.78785&lon=-156.38612&key=9c1232e0219649419a091ae456846ef9


var path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const data = [];
let latestEntryGeoNames = {};
let latestEntryWeatherBit = {};
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
    console.log(data);
    let newEntry = {
        cityProvided: req.body.cityProvided
    }
    // Getting the city's coordinates
    getCoordinatesAPI(geonamesBaseUrl, newEntry.cityProvided, geonamesUsername)
        .then(function (data) {
            latestEntryGeoNames = data          //Updated part
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
    console.log(data)
    if (req.body.dayDifference > 5) {
        console.log("Date difference is higher than 5 days.")
    } else {
        let newEntry = {
            lng: req.body.lng,
            lat: req.body.lat
        }
        // Getting the city's current weather
        getWeatherDetailsAPI(weatherbitCurrentBaseUrl, weatherbitCurrentLat, newEntry.lat, weatherbitCurrentLon, newEntry.lng, weatherbitCurrentKey, WEATHERBIT_API_KEY)
            .then(function (data) {
                latestEntryWeatherBit = data
                res.send(latestEntryWeatherBit)
                res.end();
            })
    }

    /*
    let newEntry = {
        cityProvided: req.body.cityProvided
    }
    // Getting the city's coordinates
    getCoordinatesAPI(geonamesBaseUrl, newEntry.cityProvided, geonamesUsername)
        .then(function (data) {
            latestEntryWeatherBit = data          //Updated part
            res.send(latestEntryWeatherBit)
            res.end();
        })
        .then(function (data) {
            if (latestEntryWeatherBit.totalResultsCount === 0) {
                console.log("There are no results for the city provided")
            }
        })
    */
})

// Calling geonames API to obtain the city's coodinations
const getCoordinatesAPI = async (geonamesBaseUrl, textUser, geonamesUsername) => {

    const res = await fetch(geonamesBaseUrl + textUser + geonamesUsername)
    try {
        const data = await res.json();
        //console.log("Data received from the server: ")
        //console.log(data)
        apiJsonResponse = data;
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}

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

// Calling weatherbit API to obtain the city's coodinations
const getWeatherDetailsAPI = async (weatherbitCurrentBaseUrl, weatherbitCurrentLat, latValue, weatherbitCurrentLon, lngValue, weatherbitCurrentKey, WEATHERBIT_API_KEY) => {

    const res = await fetch(weatherbitCurrentBaseUrl + weatherbitCurrentLat + latValue + weatherbitCurrentLon + lngValue + weatherbitCurrentKey + WEATHERBIT_API_KEY)
    try {
        const data = await res.json();
        console.log("Data received from the WeatherBit server: ")
        console.log(data)
        apiJsonResponse = data;
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}
