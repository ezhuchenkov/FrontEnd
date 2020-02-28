/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
import Card from './card'
import Article from './article'

export default class CardList {
  constructor(title) {
    this.title = title
  }

  addCard(source, title, date, text, image, link, keyword, options) {
    new Card(source, title, date, text, image, link, keyword, options).create()
  }

  addArticle(id, source, title, date, text, image, link, keyword, options) {
    new Article(id, source, title, date, text,
      image, link, keyword, options, this.title).create()
  }
}
