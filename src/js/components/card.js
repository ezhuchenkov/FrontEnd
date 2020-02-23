/* eslint-disable class-methods-use-this */
import '../../blocks/card/card.css'
import { MAIN_PAGE, ARTICLES } from '../constants/config'
import MainApi from '../api/mainApi'
import BaseComponent from './baseComponent'

export default class Card extends BaseComponent {
  constructor(source, title, date, text, image, link, keyword, options) {
    super()
    this.source = source
    this.title = title
    this.date = date
    this.text = text
    this.image = image
    this.link = link
    this.keyword = keyword
    this.options = options
    this.container = document.querySelector(this.domElements.container)
  }

  create(id, titleRender) {
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
    cardItem.href = this.link
    this.container.appendChild(cardItem)
    cardImage.classList.add(this.domElements.card.cardImage)
    if (this.image) {
      cardImage.style = `background-image: url(${this.image})`
    } else {
      cardImage.style = `background-image: url(${noImage})`
    }
    cardItem.appendChild(cardImage)
    cardPopup.classList.add(this.domElements.card.cardPopup)
    cardIcon.classList.add(this.domElements.card.cardIcon)
    if (this.options.pageName === ARTICLES) {
      cardIcon.classList.add(this.domElements.card.cardIconDelete)
      cardPopup.textContent = this.domElements.card.cardPopupTextDelete
      this.addlistener(cardIcon, 'click', (e) => {
        this.remove(e, id)
        titleRender.render()
        cardIcon.removeEventListener('click', this.remove)
      })

      const cardKeyword = document.createElement('i')
      cardKeyword.classList.add(this.domElements.card.cardKeyword)
      cardKeyword.textContent = this.keyword
      cardImage.appendChild(cardKeyword)
    } else if (this.options.pageName === MAIN_PAGE && this.options.isLoggedIn) {
      cardPopup.textContent = this.domElements.card.cardPopupTextSave
      this.addlistener(cardIcon, 'click', (e) => this.iconListener(e, cardIcon))
    } else {
      cardPopup.textContent = this.domElements.card.cardPopupTextLogin
    }

    cardImage.appendChild(cardIcon)
    cardImage.appendChild(cardPopup)
    cardDescription.classList.add(this.domElements.card.cardDescription)
    cardItem.appendChild(cardDescription)
    cardDate.classList.add(this.domElements.card.cardDate)
    cardDate.textContent = this.date
    cardDescription.appendChild(cardDate)
    cardTitle.classList.add(this.domElements.card.cardTitle)
    cardTitle.textContent = this.title
    cardDescription.appendChild(cardTitle)
    cardText.classList.add(this.domElements.card.cardText)
    cardText.textContent = this.text
    cardDescription.appendChild(cardText)
    cardSource.classList.add(this.domElements.card.cardSource)
    cardSource.textContent = this.source
    cardItem.appendChild(cardSource)
  }

  iconListener(e, elem) {
    if (e.target.classList.value === `${this.domElements.card.cardIcon} ${this.domElements.card.cardIconAdd}`) {
      this.unSave(e)
      elem.classList.remove(this.domElements.card.cardIconAdd)
    } else {
      this.save(e)
      elem.classList.add(this.domElements.card.cardIconAdd)
    }
  }

  remove(e, id) {
    e.preventDefault()
    new MainApi().removeArticle(id)
      .then(() => {
        this.container.removeChild(e.target.closest(`.${this.domElements.card.card}`))
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  save(e) {
    e.preventDefault()
    const data = {
      keyword: this.keyword,
      title: this.title,
      text: this.text,
      date: this.date,
      source: this.source,
      link: this.link,
      image: this.image,
    }
    new MainApi().saveArticle(data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  unSave(event) {
    event.preventDefault()
    const arr = []
    new MainApi().getArticles()
      .then((res) => {
        [...res.data].forEach((item) => {
          arr.push(item)
        })
        arr.forEach((item) => {
          if (item.link === this.link) {
            new MainApi().removeArticle(item._id)
          }
        })
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
