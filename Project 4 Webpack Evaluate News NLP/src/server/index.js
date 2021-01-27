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

// Post Route
app.post('/sentiment', addPost);
async function addPost(req,res){
    //get and set url:
    newEntry = req.body
    input_url = req.body.url;
    console.log("URL is: ", input_url)
    
    //get data from input:
    console.log(`${baseUrl}${API_KEY}${jsonSelector}${req.body.txt}${lang}`);
    const info = await fetch(`${baseUrl}${API_KEY}${jsonSelector}${req.body.txt}${lang}`)
    //translate response obj to json:
    .then( (info) => info.json())
    .then( data => { 
        res.send(data)})
    //handle error:
    .catch((error) => {
        console.log("error in promise (server side): ", error);
    });
};