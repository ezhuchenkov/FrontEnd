/* eslint-disable no-useless-constructor */
import '../../blocks/preloader/preloader.css'
import BaseComponent from './baseComponent'

export default class Preloader extends BaseComponent {
  constructor() {
    super()
  }

  circleOn() {
    const preloaderBox = document.createElement('div')
    const preloaderCircle = document.createElement('div')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(this.domElements.preloader.preloaderBox)
    preloaderBox.classList.add(this.domElements.preloader.preloaderBoxCircle)
    this.preloaderSection.appendChild(preloaderBox)
    preloaderCircle.classList.add(this.domElements.preloader.preloaderCircle)
    preloaderBox.appendChild(preloaderCircle)
    preloaderSubtitle.classList.add(this.domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = this.domElements.preloader.preloaderSubtitleFindText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  circleOff() {
    const circleBox = document.querySelector(`.${this.domElements.preloader.preloaderBoxCircle}`)
    this.preloaderSection.removeChild(circleBox)
  }

  noNewsOn() {
    const preloaderBox = document.createElement('div')
    const preloaderIcon = document.createElement('img')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(this.domElements.preloader.preloaderBox)
    preloaderBox.classList.add(this.domElements.preloader.preloaderBoxNoNews)
    this.preloaderSection.appendChild(preloaderBox)
    preloaderIcon.classList.add(this.domElements.preloader.preloaderIcon)
    preloaderIcon.src = this.domElements.preloader.preloaderIconSrc
    preloaderIcon.alt = this.domElements.preloader.preloaderIconAlt
    preloaderBox.appendChild(preloaderIcon)
    preloaderSubtitle.classList.add(this.domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = this.domElements.preloader.preloaderSubtitleNotFoundText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  noNewsOff() {
    const noNewsBox = document.querySelector(`.${this.domElements.preloader.preloaderBoxNoNews}`)
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }

  errorOn() {
    const preloaderBox = document.createElement('div')
    const preloaderTitle = document.createElement('h2')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(this.domElements.preloader.preloaderBox)
    preloaderBox.classList.add(this.domElements.preloader.preloaderBoxError)
    this.preloaderSection.appendChild(preloaderBox)
    preloaderTitle.classList.add(this.domElements.preloader.preloaderTitle)
    preloaderTitle.textContent = this.domElements.preloader.preloaderTitleText
    preloaderBox.appendChild(preloaderTitle)
    preloaderSubtitle.classList.add(this.domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = this.domElements.preloader.preloaderSubtitleErrorText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  errorOff() {
    const noNewsBox = document.querySelector(`.${this.domElements.preloader.preloaderBoxError}`)
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }
}
