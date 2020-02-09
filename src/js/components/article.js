/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import '../../blocks/card/card.css'
import Card from './card'

export default class Article extends Card {
  constructor(source, title, date, text, image, link, keyword) {
    super(source, title, date, text, image, link)
    this.keyword = keyword
  }

  create() {
    super.create()
    const cardKeyword = document.createElement('i')
    cardKeyword.classList.add('card__key')
    cardKeyword.textContent = this.keyword
    super.create().cardImage.appendChild(cardKeyword)
  }

  render() {
    this.create()
    this.changeIcons()
    this.changePopups()
  }

  changeIcons() {
    const arr = document.querySelectorAll('.card__icon')
    arr.forEach((item) => {
      item.classList.add('card__icon_delete')
    })
  }

  changePopups() {
    const arr = document.querySelectorAll('.card__popup')
    arr.forEach((item) => {
      item.textContent = 'Убрать из сохраненных'
    })
  }
}
