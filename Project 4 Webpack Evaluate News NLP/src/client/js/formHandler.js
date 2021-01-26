function handleSubmit(event) {
    event.preventDefault();
    // check what text was put into the form field
    const textUser = document.getElementById('text__user').value;
    console.log(textUser);
    if (textUser.trim() === "") {
        window.alert("Text cannot be blank!");
    } else {
        Client.postInfo(textUser);
    }
}


export { handleSubmit }
