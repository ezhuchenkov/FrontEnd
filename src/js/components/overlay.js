
import { domElements } from '../constants/config'

export default class Overlay {
  constructor() {
    this._overlay = document.querySelector(domElements.overlay.overlay)
  }

  on() {
    this._overlay.classList.add(domElements.overlay.overlayOn)
  }

  off() {
    this._overlay.classList.remove(domElements.overlay.overlayOn)
  }
}
