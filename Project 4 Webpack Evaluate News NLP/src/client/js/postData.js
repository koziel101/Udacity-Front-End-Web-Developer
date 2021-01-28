import { text } from "body-parser";

let appData = {};

document.getElementById('btnSubmit').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    appData = document.getElementById('text__user').value;
    if (appData.trim() === "") {
        window.alert("Text cannot be blank!");
    } else {
        postData('http://localhost:3000/addSentiment', { textUser: appData })
            .then
        console.log("THEN statement starting")
        fetch("http://localhost:3000/return_data", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: apiJsonResponse })
        }).then(res => res.json())
            .then(data => {
                console.log("Initial print")
                console.log(data)
                console.log("Final print")
            })
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
*/

export { buttonClicked }