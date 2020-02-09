import Card from './card'
import Article from './article'

export default class CardList {
  constructor() {
    this.container = document.querySelector('.results__news')
    this.cards = []
  }

  addCard(source, title, date, text, image, link) {
    const { cardElement } = new Card(source, title, date, text, image, link).create()
    this.cards.push(cardElement)
  }

  addArticle(source, title, date, text, image, link, keyword) {
    const { cardElement } = new Article(source, title, date, text, image, link, keyword).render()
    this.cards.push(cardElement)
  }
}
