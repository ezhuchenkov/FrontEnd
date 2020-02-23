
import { domElements } from '../constants/config'

export default class Overlay {
  constructor() {
    this.overlay = document.querySelector(domElements.overlay.overlay)
  }

  on() {
    this.overlay.classList.add(domElements.overlay.overlayOn)
  }

  off() {
    this.overlay.classList.remove(domElements.overlay.overlayOn)
  }
}
