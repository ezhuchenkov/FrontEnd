/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'

import Popup from "../src/blocks/popup/popup";

const popupNew = new Popup(document.querySelector('#registration'));

document.querySelector('.menu__link_logged').addEventListener('click', function (event) {
  popupNew.open(event);});