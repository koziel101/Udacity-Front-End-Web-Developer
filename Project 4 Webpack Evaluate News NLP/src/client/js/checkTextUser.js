function validateUserEntry(data) {

    let regExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    if (data.trim() === "") {
        return 0; // return 0 means that the user didn't typed any thing
    } else {
        if (regExp.test(data)) {
            return 2; // return 2 means that the user provided a valid url and the code can proceed
        }
        else {
            return 1; // return 1 means that the url provided by the user is not valid
        }
    }
}

export { validateUserEntry }