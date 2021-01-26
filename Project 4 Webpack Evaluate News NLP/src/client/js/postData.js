function postInfo(textProvidedUser) {
    postData(textProvidedUser);
}
const postData = async (textProvidedUser = {}) => {
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