const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const jsonSelector = "&of=json&txt=";
const lang = "&lang=en";
/*
Example of working URL:
https://api.meaningcloud.com/sentiment-2.1?key=c186ca2c0398960fffe88481da466218&of=json&txt=Main%20dishes%20were%20quite%20good%2C%20but%20desserts%20were%20too%20sweet%20for%20me.&lang=en

Breakthrough of the URL:
https://api.meaningcloud.com/sentiment-2.1?key=      (baseUrl)
c186ca2c0398960fffe88481da466218                     (API_KEY)
&of=json&txt=                                        (jsonSelector)
Text enter by user                                   ()
&lang=en                                             (lang)
*/

//console.log("Testing");
//onsole.log(`Your API key is ${process.env.API_KEY}`);

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const bodyParser = require('body-parser')
const data = [];
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
    console.log('Example app listening on port 3000!')
})

// get and post route for /addSentiment
app.get('/addSentiment', function (req, res) {
    res.send("Hey")
    console.log("Test")
})

app.post('/addSentiment', (req, res) => {
    console.log('I got a request.')
    data.push(req.body);
    console.log(data);
    let newEntry = {
        textUser: req.body.textUser
    }
    getSentimentAPI(baseUrl, API_KEY, jsonSelector, newEntry.textUser, lang);

    //console.log("New Entry:")
    //console.log(newEntry)
    //console.log("Text entered by user:")
    //console.log(newEntry.textUser)
});


// get route for /test
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// Calling the API
const getSentimentAPI = async (baseUrl, API_KEY, jsonSelector, textUser, lang) => {

    const res = await fetch(baseUrl + API_KEY + jsonSelector + textUser + lang)
    try {

        const data = await res.json();
        console.log("Data received from the server: ")
        console.log(data)
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}