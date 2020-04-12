/* eslint-disable class-methods-use-this */
import { domElements } from '../constants/config'

export default class BaseComponent {
  constructor() {
    this.domElements = domElements
    this.userNameButton = document.querySelector(domElements.header.userNameButton)
    this.logoutIcon = document.querySelector(domElements.header.logoutIcon)
    this.articlesButton = document.querySelector(domElements.header.articlesButton)
    this.resultSection = document.querySelector(domElements.resultSection)
    this.headerForm = document.querySelector(domElements.header.headerForm)
    this.container = document.querySelector(this.domElements.container)
    this.preloaderSection = document.querySelector(domElements.preloader.preloaderSection)
    this.menuItems = document.querySelector(this.domElements.menu.mobileMenuItem)
    this.menuControl = document.querySelector(this.domElements.menu.mobileMenu)
    this.menu = document.querySelector(this.domElements.menu.menu)
  }

  // Добавление слушателя на элемент
  addlistener(el, ev, fn) {
    el.addEventListener(ev, fn)
  }

  // Удаление слушателя с элемента
  removelistener(el, ev, fn) {
    el.removeEventListener(ev, fn)
  }

  // Проверка того, залогинен ли пользователь
  isLogged() {
    return Boolean(localStorage.getItem('user'))
  }
}
