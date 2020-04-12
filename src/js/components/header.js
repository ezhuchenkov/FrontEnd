/* eslint-disable no-useless-constructor */
import BaseComponent from './baseComponent'

export default class Header extends BaseComponent {
  constructor() {
    super()
  }

  render(props) {
    const { isLoggedIn } = props
    const { name } = props
    this._renderUser(name)
    if (isLoggedIn) {
      this._articlesLinkActivate()
    } else {
      this._articlesLinkDeactivate()
    }
  }

  _renderUser(name) {
    if (name === null) {
      this.userNameButton.textContent = 'Авторизоваться'
    } else {
      this.userNameButton.textContent = name
    }
  }


  _articlesLinkActivate() {
    this.articlesButton.style.display = 'flex'
    this.logoutIcon.style.display = 'flex'
  }

  _articlesLinkDeactivate() {
    this.articlesButton.style.display = 'none'
    this.logoutIcon.style.display = 'none'
    if (document.location.pathname === '/articles/') {
      window.location.replace('../')
    }
  }
}