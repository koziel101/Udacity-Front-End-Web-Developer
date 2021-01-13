// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Data will contain all data of the project, where projectData will have only the last entry
const data = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(req, res) {
    console.log("Server running");
    console.log(`Running on localhost: ${port}`);
}

// GET Request
app.get('/all', getData);

function getData(req, res) {
    console.log("ProjectData retrieve: ");
    console.log(projectData);
    res.send(projectData);

    console.log("Data retrieve: ");
    console.log(data);
}

// POST Request
app.post('/addWeather', addWeather);

function addWeather(req, res) {
    // data is an array that contains all the previous data
    newEntry = {
        city: req.body.city,
        currentTemp: req.body.currentTemp,
        feeling: req.body.feeling,
        newDate: req.body.newDate
    }
    data.push(newEntry);

    // projectData contains only the latest data
    projectData = req.body;
    res.send(projectData);
}