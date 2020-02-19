/* eslint-disable class-methods-use-this */
import '../../blocks/card/card.css'
import { MAIN_PAGE, ARTICLES } from '../constants/config'
import MainApi from '../api/mainApi'

export default class Card {
  constructor(source, title, date, text, image, link, keyword, options) {
    this.source = source
    this.title = title
    this.date = date
    this.text = text
    this.image = image
    this.link = link
    this.keyword = keyword
    this.options = options
    this.container = document.querySelector('.results__news')
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

    cardItem.classList.add('card')
    cardItem.href = this.link
    this.container.appendChild(cardItem)
    cardImage.classList.add('card__image')
    if (this.image) {
      cardImage.style = `background-image: url(${this.image})`
    } else {
      cardImage.style = `background-image: url(${noImage})`
    }
    cardItem.appendChild(cardImage)
    cardPopup.classList.add('card__popup')
    cardIcon.classList.add('card__icon')
    if (this.options.pageName === ARTICLES) {
      cardIcon.classList.add('card__icon_delete')
      cardPopup.textContent = 'Убрать из сохраненных'
      cardIcon.addEventListener('click', (e) => {
        this.remove(e, id)
        titleRender.render()
        cardIcon.removeEventListener('click', this.remove)
      })
      const cardKeyword = document.createElement('i')
      cardKeyword.classList.add('card__key')
      cardKeyword.textContent = this.keyword
      cardImage.appendChild(cardKeyword)
    } else if (this.options.pageName === MAIN_PAGE && this.options.isLoggedIn) {
      cardPopup.textContent = 'Сохранить'
      cardIcon.addEventListener('click', (e) => this.iconListener(e, cardIcon), false)
    } else {
      cardPopup.textContent = 'Войдите, чтобы сохранять статьи'
    }

    cardImage.appendChild(cardIcon)
    cardImage.appendChild(cardPopup)
    cardDescription.classList.add('card__description')
    cardItem.appendChild(cardDescription)
    cardDate.classList.add('card__date')
    cardDate.textContent = this.date
    cardDescription.appendChild(cardDate)
    cardTitle.classList.add('card__title')
    cardTitle.textContent = this.title
    cardDescription.appendChild(cardTitle)
    cardText.classList.add('card__text')
    cardText.textContent = this.text
    cardDescription.appendChild(cardText)
    cardSource.classList.add('card__source')
    cardSource.textContent = this.source
    cardItem.appendChild(cardSource)
  }

  iconListener(e, elem) {
    if (e.target.classList.value === 'card__icon card__icon_add') {
      this.unSave(e)
      elem.classList.remove('card__icon_add')
    } else {
      this.save(e)
      elem.classList.add('card__icon_add')
    }
  }

  remove(e, id) {
    e.preventDefault()
    new MainApi().removeArticle(id)
      .then(() => {
        this.container.removeChild(e.target.closest('.card'))
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
