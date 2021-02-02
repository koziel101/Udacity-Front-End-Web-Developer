import { validateUserEntry } from "./checkTextUser.js";
let appData = {};

document.getElementById('btn-new-trip').addEventListener('click', buttonClicked);

function buttonClicked(e) {
    appData = document.getElementById('city').value;

    let cityValidation = validateUserEntry(appData);
    if (cityValidation) {
        // Sending data to server
        postData('http://localhost:3000/addCity', { cityProvided: appData })
        /* 
            // Server processed the data provided. Code below is for the Client to retrieve the server's response.
            .then(() => fetch("http://localhost:3000/return_data"))
            .then(res => res.json())
            .then(data => {
                console.log("New data was received from server")
                console.log(data)
                updateUI(data);
            })
        */
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

export { buttonClicked }