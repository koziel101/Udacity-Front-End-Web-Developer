function validateUserEntry(data) {
    if (data.trim() === "") {
        return false;
    } else {
        return true;
    }
}

export { validateUserEntry }