/* eslint-disable no-extra-boolean-cast */
import { ARTICLES } from '../constants/config'

export default class Header {
  constructor(options) {
    this.options = options
    this.userNameButton = document.querySelector('#username')
    this.logoutIcon = document.querySelector('.menu__logout')
    this.articlesButton = document.querySelector('#articles')
  }

  render(props) {
    const { isLoggedIn } = props
    const { name } = props
    this.renderUser(name)
    if (isLoggedIn) {
      this.articlesLinkActivate()
    } else {
      this.articlesLinkDeactivate()
      if (this.options.pageName === ARTICLES) {
        window.location.replace('../')
      }
    }
  }

  renderUser(name) {
    if (name === null) {
      this.userNameButton.textContent = 'Авторизоваться'
    } else {
      this.userNameButton.textContent = name
    }
  }


  articlesLinkActivate() {
    this.articlesButton.style.display = 'flex'
    this.logoutIcon.style.display = 'flex'
  }

  articlesLinkDeactivate() {
    this.articlesButton.style.display = 'none'
    this.logoutIcon.style.display = 'none'
  }
}
