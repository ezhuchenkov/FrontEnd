import '../../blocks/preloader/preloader.css'
import { domElements } from '../constants/config'

export default class Preloader {
  constructor() {
    this.preloaderSection = document.querySelector(domElements.preloader.preloaderSection)
    this.circleOn = this.circleOn.bind(this)
    this.circleOff = this.circleOff.bind(this)
  }

  circleOn() {
    const preloaderBox = document.createElement('div')
    const preloaderCircle = document.createElement('div')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(domElements.preloader.preloaderBox)
    preloaderBox.id = domElements.preloader.preloaderBoxIdCircle
    this.preloaderSection.appendChild(preloaderBox)
    preloaderCircle.classList.add(domElements.preloader.preloaderCircle)
    preloaderBox.appendChild(preloaderCircle)
    preloaderSubtitle.classList.add(domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = domElements.preloader.preloaderSubtitleFindText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  circleOff() {
    const circleBox = document.getElementById(domElements.preloader.preloaderBoxIdCircle)
    this.preloaderSection.removeChild(circleBox)
  }

  noNewsOn() {
    const preloaderBox = document.createElement('div')
    const preloaderIcon = document.createElement('img')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(domElements.preloader.preloaderBox)
    preloaderBox.id = domElements.preloader.preloaderBoxIdNoNews
    this.preloaderSection.appendChild(preloaderBox)
    preloaderIcon.classList.add(domElements.preloader.preloaderIcon)
    preloaderIcon.src = domElements.preloader.preloaderIconSrc
    preloaderIcon.alt = domElements.preloader.preloaderIconAlt
    preloaderBox.appendChild(preloaderIcon)
    preloaderSubtitle.classList.add(domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = domElements.preloader.preloaderSubtitleNotFoundText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  noNewsOff() {
    const noNewsBox = (document.getElementById(domElements.preloader.preloaderBoxIdNoNews))
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }

  errorOn() {
    const preloaderBox = document.createElement('div')
    const preloaderTitle = document.createElement('h2')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add(domElements.preloader.preloaderBox)
    preloaderBox.id = domElements.preloader.preloaderBoxIdError
    this.preloaderSection.appendChild(preloaderBox)
    preloaderTitle.classList.add(domElements.preloader.preloaderTitle)
    preloaderTitle.textContent = domElements.preloader.preloaderTitleText
    preloaderBox.appendChild(preloaderTitle)
    preloaderSubtitle.classList.add(domElements.preloader.preloaderSubtitle)
    preloaderSubtitle.textContent = domElements.preloader.preloaderSubtitleErrorText
    preloaderBox.appendChild(preloaderSubtitle)
  }

  errorOff() {
    const noNewsBox = (document.getElementById(domElements.preloader.preloaderBoxIdError))
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }
}
