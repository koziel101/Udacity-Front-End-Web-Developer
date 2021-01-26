const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

console.log("Testing");
console.log(`Your API key is ${process.env.API_KEY}`);