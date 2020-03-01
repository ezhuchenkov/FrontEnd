
import BaseComponent from './baseComponent'

export default class Results extends BaseComponent {
  constructor(apiMethod, options, title) {
    super()
    this.options = options
    this.title = title
    this.preloader = this.options.preloader
    if (this.headerForm) {
      this.inputArea = this.headerForm.querySelector(this.domElements.header.inputArea)
      this.findButton = this.headerForm.querySelector(`.${this.domElements.button}`)
      this.addlistener(this.headerForm, 'submit', (event) => this.takeNews(event))
    }
    this.isResults = this.isResults.bind(this)
    this.noResults = this.noResults.bind(this)
    this.cardList = options.cardList
    this.news = []
    this.apiMethod = apiMethod
    this.counter = 3
    this.showMoreNewsLimiter = 3
  }

  isResults() {
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
    this.resultSection.classList.add(this.domElements.results.hide)
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

    inputErrorPopup.classList.add(this.domElements.header.inputErrorPopup)
    inputErrorPopup.textContent = this.domElements.header.inputErrorPopupText
    this.headerForm.appendChild(inputErrorPopup)
  }

  emptyInputErrorOff() {
    if (this.headerForm.querySelector(`.${this.domElements.header.inputErrorPopup}`)) {
      this.headerForm.removeChild(this.headerForm.querySelector(`.${this.domElements.header.inputErrorPopup}`))
    }
  }


  takeNews(event) {
    event.preventDefault()
    this.counter = 3
    this.news = []
    const request = document.querySelector(this.domElements.header.inputArea).value
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
          this.cardList(this.news[i].source, this.news[i].title, this.news[i].date,
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
      document.querySelector(`.${this.domElements.results.button}`).classList.add(this.domElements.results.buttonHide)
    }
    for (let i = 0; i < volume; i += 1) {
      this.cardList(this.news[this.counter].source, this.news[this.counter].title,
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
          this.cardList(item._id, item.source, item.title, item.date,
            item.text, item.image, item.link, item.keyword, this.options)
        })
      }
    })
      .catch((err) => {
        console.log(err.message)
      })
  }
}
