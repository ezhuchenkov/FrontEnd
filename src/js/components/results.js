/* eslint-disable class-methods-use-this */
import BaseComponent from './baseComponent'
import { MONTHS } from '../constants/config'

export default class Results extends BaseComponent {
  constructor(apiMethod, options, title) {
    super()
    this._options = options
    this._title = title
    this._preloader = this._options.preloader
    if (this.headerForm) {
      this.inputArea = this.headerForm.querySelector(this.domElements.header.inputArea)
      this.findButton = this.headerForm.querySelector(`.${this.domElements.button}`)
      this.addlistener(this.headerForm, 'submit', (event) => this._takeNews(event))
    }
    this._isResults = this._isResults.bind(this)
    this._noResults = this._noResults.bind(this)
    this._cardList = options.cardList
    this._news = []
    this._apiMethod = apiMethod
    this._counter = 3
    this._showMoreNewsLimiter = 3
  }

  _isResults() {
    const resultsTitle = document.createElement('h3')
    const resultsNews = document.createElement('div')
    const resultsButton = document.createElement('button')

    this.resultSection.classList.remove(this.domElements.results.hide)
    resultsTitle.classList.add(this.domElements.results.title)
    resultsTitle.textContent = this.domElements.results.titleText
    this.resultSection.appendChild(resultsTitle)
    resultsNews.classList.add(this.domElements.results.news)
    this.resultSection.appendChild(resultsNews)
    resultsButton.classList.add(this.domElements.button)
    resultsButton.classList.add(this.domElements.results.button)
    resultsButton.textContent = this.domElements.results.buttonText
    this.resultSection.appendChild(resultsButton)

    resultsButton.addEventListener('click', () => {
      console.log('1')
      this._takeMoreNews()
    })
  }

  _disableForm() {
    this.inputArea.setAttribute('disabled', true)
    this.findButton.setAttribute('disabled', true)
  }

  _enableForm() {
    this.inputArea.removeAttribute('disabled')
    this.findButton.removeAttribute('disabled')
  }

  _noResults() {
    this.resultSection.classList.add(this.domElements.results.hide)
    this._cleanResults()
  }

  _cleanResults() {
    this._counter = 3
    while (this.resultSection.firstChild) {
      this.resultSection.removeChild(this.resultSection.firstChild)
    }
  }

  _emptyInputErrorOn() {
    const inputErrorPopup = document.createElement('i')

    inputErrorPopup.classList.add(this.domElements.header.inputErrorPopup)
    inputErrorPopup.textContent = this.domElements.header.inputErrorPopupText
    this.headerForm.appendChild(inputErrorPopup)
  }

  _emptyInputErrorOff() {
    if (this.headerForm.querySelector(`.${this.domElements.header.inputErrorPopup}`)) {
      this.headerForm.removeChild(this.headerForm.querySelector(`.${this.domElements.header.inputErrorPopup}`))
    }
  }

  _formatDate(IncomingDate) {
    const date = new Date(IncomingDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${day} ${MONTHS[month]}, ${year}`
  }


  _takeNews(event) {
    event.preventDefault()
    this._counter = 3
    this._news = []
    const request = document.querySelector(this.domElements.header.inputArea).value
    if (request.length === 0) {
      this._emptyInputErrorOn()
      return
    }
    this._disableForm()
    this._emptyInputErrorOff()
    this._preloader.circleOn()
    this._preloader.noNewsOff()
    this._preloader.errorOff()
    this._cleanResults()
    this._apiMethod(request).then((data) => {
      for (let i = 0; i < data.articles.length; i += 1) {
        this._news.push({
          source: data.articles[i].source.name,
          title: data.articles[i].title,
          date: this._formatDate(data.articles[i].publishedAt),
          text: data.articles[i].description,
          image: data.articles[i].urlToImage,
          link: data.articles[i].url,
          keyword: request,
        })
      }
      if (data.length === 0) {
        this._preloader.noNewsOn()
        this._noResults()
      } else {
        this._isResults()
        for (let i = 0; i < this._counter; i += 1) {
          this._cardList(this._news[i].source, this._news[i].title, this._news[i].date,
            this._news[i].text, this._news[i].image, this._news[i].link,
            this._news[i].keyword, this._options)
        }
        this._preloader.circleOff()
        this._enableForm()
      }
    })
      .catch((err) => {
        console.log(err.message)
      })
  }

  _takeMoreNews() {
    const delta = this._news.length - this._counter
    const volume = (delta) < this._showMoreNewsLimiter ? delta : this._showMoreNewsLimiter
    if (delta <= this._showMoreNewsLimiter) {
      document.querySelector(`.${this.domElements.results.button}`).classList.add(this.domElements.results.buttonHide)
    }
    for (let i = 0; i < volume; i += 1) {
      this._cardList(this._news[this._counter].source, this._news[this._counter].title,
        this._news[this._counter].date, this._news[this._counter].text,
        this._news[this._counter].image, this._news[this._counter].link,
        this._news[this._counter].keyword, this._options)
      this._counter += 1
    }
  }

  renderArticles() {
    this._apiMethod().then((data) => {
      if (data.data.length === 0) {
        this._noResults()
      } else {
        Array.prototype.slice.apply(data.data).forEach((item) => {
          this._cardList(item._id, item.source, item.title, item.date,
            item.text, item.image, item.link, item.keyword, this._options)
        })
      }
    })
      .catch((err) => {
        console.log(err.message)
      })
  }
}
