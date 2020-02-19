
import Preloader from './preloader'
import CardList from './cardList'
import { resultSection, headerForm } from '../constants/config'

export default class Results {
  constructor(apiMethod, options, title) {
    this.resultSection = resultSection
    this.headerForm = headerForm
    this.options = options
    this.title = title
    if (this.headerForm) {
      this.inputArea = this.headerForm.querySelector('.header__form-input')
      this.findButton = this.headerForm.querySelector('.button')
      this.headerForm.addEventListener('submit', (event) => this.takeNews(event))
    }
    this.isResults = this.isResults.bind(this)
    this.noResults = this.noResults.bind(this)
    this.preloader = new Preloader()
    this.cardList = new CardList()
    this.news = []
    this.apiMethod = apiMethod
    this.counter = 3
    this.showMoreNewsLimiter = 3
  }

  isResults() {
    const resultsTitle = document.createElement('h3')
    const resultsNews = document.createElement('div')
    const resultsButton = document.createElement('button')

    this.resultSection.classList.remove('results_hide')
    resultsTitle.classList.add('title')
    resultsTitle.textContent = 'Результаты поиска'
    this.resultSection.appendChild(resultsTitle)
    resultsNews.classList.add('results__news')
    this.resultSection.appendChild(resultsNews)
    resultsButton.classList.add('button')
    resultsButton.classList.add('results__button')
    resultsButton.textContent = 'Показать еще'
    this.resultSection.appendChild(resultsButton)

    resultsButton.addEventListener('click', () => this.takeMoreNews())
  }

  disableForm() {
    this.inputArea.setAttribute('disabled', true)
    this.findButton.setAttribute('disabled', true)
  }

  enableForm() {
    this.inputArea.removeAttribute('disabled')
    this.findButton.removeAttribute('disabled')
  }

  noResults() {
    this.resultSection.classList.add('results_hide')
    this.cleanResults()
  }

  cleanResults() {
    this.counter = 3
    while (this.resultSection.firstChild) {
      this.resultSection.removeChild(this.resultSection.firstChild)
    }
  }

  emptyInputErrorOn() {
    const inputErrorPopup = document.createElement('i')

    inputErrorPopup.classList.add('header__form-input_error')
    inputErrorPopup.textContent = 'Поле поиска не может быть пустым'
    this.headerForm.appendChild(inputErrorPopup)
  }

  emptyInputErrorOff() {
    if (this.headerForm.querySelector('.header__form-input_error')) {
      this.headerForm.removeChild(this.headerForm.querySelector('.header__form-input_error'))
    }
  }


  takeNews(event) {
    event.preventDefault()
    this.counter = 3
    const request = document.querySelector('.header__form-input').value
    if (request.length === 0) {
      this.emptyInputErrorOn()
      return
    }
    this.disableForm()
    this.emptyInputErrorOff()
    this.preloader.circleOn()
    this.preloader.noNewsOff()
    this.preloader.errorOff()
    this.cleanResults()
    this.apiMethod(request).then((data) => {
      for (let i = 0; i < data.articles.length; i += 1) {
        this.news.push({
          source: data.articles[i].source.name,
          title: data.articles[i].title,
          date: new Date(Date.parse(data.articles[i].publishedAt)),
          text: data.articles[i].description,
          image: data.articles[i].urlToImage,
          link: data.articles[i].url,
          keyword: request,
        })
      }
      if (data.length === 0) {
        this.preloader.noNewsOn()
        this.noResults()
      } else {
        this.isResults()
        for (let i = 0; i < this.counter; i += 1) {
          this.cardList.addCard(this.news[i].source, this.news[i].title, this.news[i].date,
            this.news[i].text, this.news[i].image, this.news[i].link,
            this.news[i].keyword, this.options)
        }
        this.preloader.circleOff()
        this.enableForm()
      }
    })
      .catch((err) => {
        console.log(err.message)
      })
  }

  takeMoreNews() {
    const delta = this.news.length - this.counter
    const volume = (delta) < this.showMoreNewsLimiter ? delta : this.showMoreNewsLimiter
    if (delta <= this.showMoreNewsLimiter) {
      document.querySelector('.results__button').classList.add('button_hide')
    }
    for (let i = 0; i < volume; i += 1) {
      this.cardList.addCard(this.news[this.counter].source, this.news[this.counter].title,
        this.news[this.counter].date, this.news[this.counter].text,
        this.news[this.counter].image, this.news[this.counter].link,
        this.news[this.counter].keyword, this.options)
      this.counter += 1
    }
  }

  renderArticles() {
    this.apiMethod().then((data) => {
      if (data.data.length === 0) {
        this.noResults()
      } else {
        Array.prototype.slice.apply(data.data).forEach((item) => {
          this.cardList.addArticle(item._id, item.source, item.title, item.date,
            item.text, item.image, item.link, item.keyword, this.options, this.title)
        })
      }
    })
      .catch((err) => {
        console.log(err.message)
      })
  }
}
