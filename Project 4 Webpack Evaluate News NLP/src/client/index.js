import { handleSubmit } from './js/formHandler'
import { agreementAnalysis } from './js/analyseAgreement'
import { validateUserEntry } from './js/checkTextUser'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// Importing image files for the footer
import gitHubIconIcon from "./images/github.png";
import linkedInIconIcon from "./images/logo-linkedin.png";
import faceBookIconIcon from "./images/logo-fb.png";


var gitHub = document.querySelector("#github__logo");
gitHub.src = gitHubIconIcon;
var linkedIn = document.querySelector("#linkedin__logo");
linkedIn.src = linkedInIconIcon;
var faceBook = document.querySelector("#fb__logo");
faceBook.src = faceBookIconIcon;

export {
    handleSubmit,
    agreementAnalysis,
    validateUserEntry
}