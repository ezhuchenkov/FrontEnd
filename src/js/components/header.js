export default class Header {
  constructor(options) {
    this.color = options.color
    this.pageName = options.pageName
    this.articlesLinkAdress = options.articlesLinkAdress
    this.authButton = document.querySelector('.menu__link_logged')
    this.header = document.querySelector('.header')
    this.menuItemsList = document.querySelector('.menu__items-list')
    this.logo = document.querySelector('.menu__logo')
    this.link = document.querySelectorAll('.menu__link')
    this.articlesButton = null
    this.articlesLink = null
    this.logoutIcon = null
  }

  render(props) {
    const { isLoggedIn } = props
    const { name } = props
    if (isLoggedIn) {
      this.renderUser(name)
      this.articlesLinkActivate()
    }
    if (this.color === 'black') {
      this.renderColor()
    }
  }

  renderUser(name) {
    this.authButton.textContent = name
    const logoutIcon = document.createElement('span')
    logoutIcon.classList.add('menu__logout')
    if (this.color === 'black') {
      logoutIcon.classList.add('menu__logout_black')
    }
    this.authButton.appendChild(logoutIcon)
    this.logoutIcon = logoutIcon
  }

  renderColor() {
    this.authButton.classList.add('menu__link_logged-black')
    this.header.classList.add('header_white')
    this.logo.classList.add('menu__logo_black')
    if (this.pageName === 'articles') {
      this.articlesButton.classList.add('menu__items-single-item_selected-black')
      this.articlesLink.classList.add('menu__link_selected-black')
    } else {
      this.articlesLink.classList.add('menu__link_black')
    }
  }

  articlesLinkActivate() {
    const articlesButton = document.createElement('li')
    articlesButton.classList.add('menu__items-single-item')
    const articlesLink = document.createElement('a')
    articlesLink.textContent = 'Сохраненные статьи'
    articlesLink.href = this.articlesLinkAdress
    articlesLink.classList.add('menu__link')
    articlesButton.appendChild(articlesLink)
    this.menuItemsList.insertBefore(articlesButton, this.authButton.parentElement)
    this.articlesButton = articlesButton
    this.articlesLink = articlesLink
  }
}
