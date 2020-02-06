import '../../blocks/preloader/preloader.css'

export default class Preloader {
  constructor() {
    this.preloaderSection = document.querySelector('.preloader')
    this.circleOn = this.circleOn.bind(this)
    this.circleOff = this.circleOff.bind(this)
  }

  circleOn() {
    const preloaderBox = document.createElement('div')
    const preloaderCircle = document.createElement('div')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add('preloader__box')
    preloaderBox.id = 'preloaderCircle'
    this.preloaderSection.appendChild(preloaderBox)
    preloaderCircle.classList.add('preloader__circle')
    preloaderBox.appendChild(preloaderCircle)
    preloaderSubtitle.classList.add('preloader__subtitle')
    preloaderSubtitle.textContent = 'Идет поиск новостей...'
    preloaderBox.appendChild(preloaderSubtitle)
  }

  circleOff() {
    const circleBox = (document.getElementById('preloaderCircle'))
    this.preloaderSection.removeChild(circleBox)
  }

  noNewsOn() {
    const preloaderBox = document.createElement('div')
    const preloaderIcon = document.createElement('img')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add('preloader__box')
    preloaderBox.id = 'noNews'
    this.preloaderSection.appendChild(preloaderBox)
    preloaderIcon.classList.add('preloader__icon')
    preloaderIcon.src = './images/not-found.svg'
    preloaderIcon.alt = 'Ничего не найдено.'
    preloaderBox.appendChild(preloaderIcon)
    preloaderSubtitle.classList.add('preloader__subtitle')
    preloaderSubtitle.textContent = 'К сожалению по вашему запросу ничего не найдено.'
    preloaderBox.appendChild(preloaderSubtitle)
  }

  noNewsOff() {
    const noNewsBox = (document.getElementById('noNews'))
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }

  errorOn() {
    const preloaderBox = document.createElement('div')
    const preloaderTitle = document.createElement('h2')
    const preloaderSubtitle = document.createElement('h4')

    preloaderBox.classList.add('preloader__box')
    preloaderBox.id = 'error'
    this.preloaderSection.appendChild(preloaderBox)
    preloaderTitle.classList.add('title')
    preloaderTitle.textContent = 'Ошибка'
    preloaderBox.appendChild(preloaderTitle)
    preloaderSubtitle.classList.add('preloader__subtitle')
    preloaderSubtitle.textContent = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    preloaderBox.appendChild(preloaderSubtitle)
  }

  errorOff() {
    const noNewsBox = (document.getElementById('error'))
    if (noNewsBox) {
      this.preloaderSection.removeChild(noNewsBox)
    }
  }
}
