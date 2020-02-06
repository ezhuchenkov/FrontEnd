export default class Overlay {
  constructor() {
    this.overlay = document.querySelector('.overlay')
  }

  on() {
    this.overlay.classList.add('overlay_on')
  }

  off() {
    this.overlay.classList.remove('overlay_on')
  }
}
