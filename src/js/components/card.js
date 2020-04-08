/* eslint-disable class-methods-use-this */
import '../../blocks/card/card.css'
import BaseComponent from './baseComponent'
import { ARTICLES } from '../constants/config'

export default class Card extends BaseComponent {
  constructor(source, title, date, text, image, link, keyword, options) {
    super()
    this._source = source
    this._title = title
    this._date = date
    this._text = text
    this._image = image
    this._link = link
    this._keyword = keyword
    this._options = options
  }


  create(id, renderTitle) {
    const cardItem = document.createElement('a')
    const cardImage = document.createElement('div')
    const cardIcon = document.createElement('div')
    const cardPopup = document.createElement('i')
    const cardDescription = document.createElement('div')
    const cardDate = document.createElement('p')
    const cardTitle = document.createElement('h4')
    const cardText = document.createElement('p')
    const cardSource = document.createElement('p')
    const noImage = '../../../images/noImage.png'

    cardItem.classList.add(this.domElements.card.card)
    cardItem.href = this._link
    this.container.appendChild(cardItem)
    cardImage.classList.add(this.domElements.card.cardImage)
    if (this._image) {
      cardImage.style = `background-image: url(${this._image})`
    } else {
      cardImage.style = `background-image: url(${noImage})`
    }
    cardItem.appendChild(cardImage)
    cardPopup.classList.add(this.domElements.card.cardPopup)
    cardIcon.classList.add(this.domElements.card.cardIcon)
    if (document.location.pathname === ARTICLES) {
      cardIcon.classList.add(this.domElements.card.cardIconDelete)
      cardPopup.textContent = this.domElements.card.cardPopupTextDelete
      this.addlistener(cardIcon, 'click', (e) => {
        this._remove(e, id, renderTitle)

        cardIcon.removeEventListener('click', this._remove)
        const cardKeyword = document.createElement('i')
        cardKeyword.classList.add(this.domElements.card.cardKeyword)
        cardKeyword.textContent = this._keyword
        cardImage.appendChild(cardKeyword)
      })
    } else if (this.isLogged()) {
      cardPopup.textContent = this.domElements.card.cardPopupTextSave
      this.addlistener(cardIcon, 'click', (e) => this._iconListener(e, cardIcon))
    } else {
      cardPopup.textContent = this.domElements.card.cardPopupTextLogin
    }

    cardImage.appendChild(cardIcon)
    cardImage.appendChild(cardPopup)
    cardDescription.classList.add(this.domElements.card.cardDescription)
    cardItem.appendChild(cardDescription)
    cardDate.classList.add(this.domElements.card.cardDate)
    cardDate.textContent = this._date
    cardDescription.appendChild(cardDate)
    cardTitle.classList.add(this.domElements.card.cardTitle)
    cardTitle.textContent = this._title
    cardDescription.appendChild(cardTitle)
    cardText.classList.add(this.domElements.card.cardText)
    cardText.textContent = this._text
    cardDescription.appendChild(cardText)
    cardSource.classList.add(this.domElements.card.cardSource)
    cardSource.textContent = this._source
    cardItem.appendChild(cardSource)
  }

  _iconListener(e, elem) {
    if (e.target.classList.value === `${this.domElements.card.cardIcon} ${this.domElements.card.cardIconAdd}`) {
      this._unSave(e)
      elem.classList.remove(this.domElements.card.cardIconAdd)
    } else {
      this._save(e)
      elem.classList.add(this.domElements.card.cardIconAdd)
    }
  }

  _remove(e, id, renderTitle) {
    e.preventDefault()
    this._options.removeArticle(id)
      .then(() => {
        renderTitle()
        this.container.removeChild(e.target.closest(`.${this.domElements.card.card}`))
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  _save(e) {
    e.preventDefault()
    const data = {
      keyword: this._keyword,
      title: this._title,
      text: this._text,
      date: this._date,
      source: this._source,
      link: this._link,
      image: this._image,
    }
    this._options.saveArticle(data)
      .then((res) => {
        this.id = res
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  _unSave(event) {
    event.preventDefault()
    const arr = []
    this._options.getArticles()
      .then((res) => {
        [...res.data].forEach((item) => {
          arr.push(item)
        })
        arr.forEach((item) => {
          if (item.link === this._link) {
            this._options.removeArticle(item._id)
          }
        })
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
