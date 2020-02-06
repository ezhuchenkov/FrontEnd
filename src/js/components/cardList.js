import Card from './card'

export default class CardList {
  constructor() {
    this.container = document.querySelector('.results__news')
    this.cards = []
  }

  addCard(source, title, date, text, image, link, keyword) {
    const { cardElement } = new Card(source, title, date, text, image, link, keyword)
    this.cards.push(cardElement)
  }
}
