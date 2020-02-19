import Card from './card'
import Article from './article'

export default class CardList {
  constructor() {
    this.container = document.querySelector('.results__news')
    this.cards = []
    this.articles = []
  }

  addCard(source, title, date, text, image, link, keyword, options) {
    const cardElement = new Card(source, title, date, text, image, link, keyword, options).create()
    this.cards.push(cardElement)
  }

  addArticle(id, source, title, date, text, image, link, keyword, options, titleRender) {
    const articleElement = new Article(id, source, title, date, text,
      image, link, keyword, options, titleRender).create()
    this.articles.push(articleElement)
  }
}
