import '../../blocks/card/card.css'
import Card from './card'

export default class Article extends Card {
  constructor(id, source, title, date, text, image, link, keyword, options, titleRender) {
    super(source, title, date, text, image, link, keyword, options)
    this._id = id
    this._titleRender = titleRender
  }

  create() {
    super.create(this._id, this._titleRender)
  }
}
