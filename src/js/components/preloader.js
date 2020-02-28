import '../../blocks/preloader/preloader.css'
import BaseComponent from './baseComponent'

export default class Preloader extends BaseComponent {
  constructor() {
    super()
    this.circleOn = this.circleOn.bind(this)
    this.circleOff = this.circleOff.bind(this)
  }

  circleOn() {
    const preloaderBox = document.createElement('div')
    const preloaderCircle = document.createElement('div')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(this.domElements.preloader.preloaderBox)
    preloaderBox.id = this.domElements.preloader.preloaderBoxIdCircle
    this.preloaderSection.appendChild(preloaderBox)
    preloaderCircle.classList.add(this.domElements.preloader.preloaderCircle)
    preloaderBox.appendChild(preloaderCircle)
    preloaderSubtitle.classList.add(this.domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = this.domElements.preloader.preloaderSubtitleFindText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  circleOff() {
    const circleBox = document.getElementById(this.domElements.preloader.preloaderBoxIdCircle)
    this.preloaderSection.removeChild(circleBox)
  }

  noNewsOn() {
    const preloaderBox = document.createElement('div')
    const preloaderIcon = document.createElement('img')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(this.domElements.preloader.preloaderBox)
    preloaderBox.id = this.domElements.preloader.preloaderBoxIdNoNews
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
    const noNewsBox = (document.getElementById(this.domElements.preloader.preloaderBoxIdNoNews))
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }

  errorOn() {
    const preloaderBox = document.createElement('div')
    const preloaderTitle = document.createElement('h2')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(this.domElements.preloader.preloaderBox)
    preloaderBox.id = this.domElements.preloader.preloaderBoxIdError
    this.preloaderSection.appendChild(preloaderBox)
    preloaderTitle.classList.add(this.domElements.preloader.preloaderTitle)
    preloaderTitle.textContent = this.domElements.preloader.preloaderTitleText
    preloaderBox.appendChild(preloaderTitle)
    preloaderSubtitle.classList.add(this.domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = this.domElements.preloader.preloaderSubtitleErrorText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  errorOff() {
    const noNewsBox = (document.getElementById(this.domElements.preloader.preloaderBoxIdError))
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }
}
