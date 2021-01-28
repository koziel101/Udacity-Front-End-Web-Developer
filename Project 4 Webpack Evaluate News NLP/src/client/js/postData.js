import { text } from "body-parser";

let appData = {};

document.getElementById('btnSubmit').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    appData = document.getElementById('text__user').value;
    if (appData.trim() === "") {
        window.alert("Text cannot be blank!");
    } else {
        postData('http://localhost:3000/addSentiment', { textUser: appData })
    }
}

const postData = async (url = '', data = {}) => {
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
        console.log("error", error);
    }
}



/*


function buttonClicked(e) {
    const textUser = document.getElementById('text__user').value;
    // Data that is in server\index.js :
    // baseUrl, API_KEY, jsonSelector, lang
    if (textUser.trim() === "") {
        window.alert("Text cannot be blank!");
    } else {
        console.log("baseurl: " + baseUrl)
        getSentiment(baseUrl, API_KEY, jsonSelector, textUser, lang).then(function (data) {
            // Saving data with POST request
            postData("/sentiment", { polarity: data.polarity, subjectivity: data.subjectivity, confidence: data.confidence, irony: data.irony });
        }).then(() =>
            updateUI()
        )
    }
}

export function updateUI(newData) {
    document.getElementById('polarity').innerHTML = "Polarity: " + polarityAnalysis(newData.score_tag);
    document.getElementById('subjectivity').innerHTML = "subjectivity: " + newData.subjectivity;
    document.getElementById('confidence').innerHTML = "Confidence of the text: " + newData.confidence + "%";
    document.getElementById('irony').innerHTML = "Irony: " + newData.irony;
}

function polarityAnalysis(analysis) {
    let result;
    switch (analysis) {
        case "P+":
            result = "Strong Positive";
            break;
        case "P":
            result = "Positive";
            break;
        case "NEU":
            result = "Neutral";
            break;
        case "N":
            result = "Negative";
            break;
        case "N+":
            result = "Strong Negative";
            break;
        case "NONE":
            result = "No Sentiment";
    }
    return result;
}

const getSentiment = async (baseUrl, API_KEY, jsonSelector, textUser, lang) => {
    const res = await fetch(baseUrl + API_KEY + jsonSelector + textUser + lang);
    try {
        const data = await res.json();
        console.log("Data received from the Sentiment API:");
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}

const postData = async (url = '', data = {}) => {
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

*/

export { buttonClicked }