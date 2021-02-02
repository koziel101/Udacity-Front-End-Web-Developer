function validateUserEntry(data) {

    if (data.trim() === "") {
        return false; // User didn't typed anything
    } else {
        return true;
    }
}

export { validateUserEntry }