import { validateUserEntry } from "./checkTextUser.js";
import { agreementAnalysis } from "./analyseAgreement.js";

let appData = {};

document.getElementById('btnSubmit').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    appData = document.getElementById('text__user').value;
    if (validateUserEntry(appData)) {
        postData('http://localhost:3000/addSentiment', { textUser: appData })
            .then(() => fetch("http://localhost:3000/return_data"))
            .then(res => res.json())
            .then(data => {
                console.log("New data was received from server")
                console.log(data)
                updateUI(data);
            })
    } else {
        window.alert("Text cannot be blank!");
    }
}

const postData = async (url = '', data = {}) => {
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
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

export function updateUI(newData) {
    document.getElementById('agreement').innerHTML = "Agreement of the text: " + newData.agreement.toLowerCase();
    document.getElementById('confidence').innerHTML = "Confidence of the text: " + newData.confidence + "%";
    document.getElementById('irony').innerHTML = "Irony of the text: " + newData.irony.toLowerCase();
    document.getElementById('subjectivity').innerHTML = "Subjectivity of the text: " + newData.subjectivity.toLowerCase();
    document.getElementById('score__tag').innerHTML = "Overall score of the text: " + agreementAnalysis(newData.score_tag);
}

export { buttonClicked }
