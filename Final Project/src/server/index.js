const dotenv = require('dotenv');

const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const geonamesUsername = "&maxRows=1&username=hiagokoziel"

// Example of working URL: http://api.geonames.org/searchJSON?q=hawaii&maxRows=1&username=hiagokoziel

var path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const data = [];
let latestEntry = {};
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

// post route for /addSentiment
app.post('/addCity', (req, res) => {
    console.log('I got a request.')
    data.push(req.body);
    console.log(data);
    let newEntry = {
        cityProvided: req.body.cityProvided
    }
    getSentimentAPI(geonamesBaseUrl, newEntry.cityProvided, geonamesUsername)
        .then(function (data) {
            latestEntry = data          //Updated part
            res.send(latestEntry)
            res.end();
        })
})

// Calling geonames API
const getSentimentAPI = async (geonamesBaseUrl, textUser, geonamesUsername) => {

    const res = await fetch(geonamesBaseUrl + textUser + geonamesUsername)
    try {
        const data = await res.json();
        console.log("Data received from the server: ")
        console.log(data)
        apiJsonResponse = data;
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}
