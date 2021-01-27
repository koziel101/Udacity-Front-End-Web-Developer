function postInfo(myData) {
    console.log("Test to get the api key");
    console.log(myData.key);
    getSentiment(baseUrl, zipCode, apiKey, celsiusMetric).then(function (data) {
        // Saving data with POST request
        console.log("Data saved:");
        postData("/sentiment", { city: data.name, currentTemp: data.main.temp, feeling: feeling, newDate: newDate });
    }).then(() =>
        updateUI()
    )
}

const getSentiment = async (baseURL, zipCode, key, celsiusMetric) => {
    const res = await fetch(baseURL + zipCode + key + celsiusMetric);
    try {
        const data = await res.json();
        console.log("Data received from the Weather API:");
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error: ", error);
        // appropriately handle the error
    }
}


document.getElementById('btnSubmit').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    console.log("Heyyyy")

}

const postData = async (textProvidedUser = {}) => {
    console.log(textUser)
    const response = await fetch("http://localhost:8080/test", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify({ value: textProvidedUser }),
    });

    try {
        const newData = await response.json();
        console.log("New data received: ");
        console.log(newData);
        updateUI(newData);
        return newData;
    }
    catch (error) {
        console.log("Error ", error);
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

export { postInfo }