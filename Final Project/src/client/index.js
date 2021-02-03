import './styles/base.scss'
import './styles/navbar.scss'
import { buttonClicked } from './js/mainClient'

import cityView from "./images/example.jpg";
var cityElement = document.querySelector("#city-img");
cityElement.src = cityView;

export { buttonClicked }