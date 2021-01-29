import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// Importing image files for the footer
import gitHubIconIcon from "./images/github.jpg";
import linkedInIconIcon from "./images/logo-linkedin.jpg";
import faceBookIconIcon from "./images/logo-fb.png";


var gitHub = document.querySelector("#github__logo");
gitHub.src = gitHubIconIcon;
var linkedIn = document.querySelector("#linkedin__logo");
linkedIn.src = linkedInIconIcon;
var faceBook = document.querySelector("#fb__logo");
faceBook.src = faceBookIconIcon;

export {
    checkForName,
    handleSubmit
}