function postInfo(myData) {
    console.log("Test to get the api key");
    console.log(myData.key);
    getSentiment(baseUrl, zipCode, apiKey, celsiusMetric).then(function (data) {
        // Saving data with POST request
        console.log("Data saved:");
        postData("/addWeather", { city: data.name, currentTemp: data.main.temp, feeling: feeling, newDate: newDate });
    }).then(() =>
        updateUI()
    )
}

const getWeather = async (baseURL, zipCode, key, celsiusMetric) => {
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

const postData = async (textProvidedUser = {}) => {

    console.log("Sera?")
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

}

export { postInfo }