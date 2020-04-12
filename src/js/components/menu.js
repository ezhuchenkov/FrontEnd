
import '../../blocks/menu/menu.css'

import BaseComponent from './baseComponent'


export default class Menu extends BaseComponent {
  constructor(overlay, isBlack) {
    super()
    this._isOpened = false
    this._overlay = overlay
    this._isBlack = isBlack
  }

  click() {
    if (this._isOpened) {
      this._close()
    } else {
      this._open()
    }
  }

  _open() {
    this.menuControl.classList.add(this.domElements.menu.mobileMenuClose)
    if (this._isBlack) this.menuControl.classList.add(this.domElements.menu.mobileMenuCloseblack)
    this._overlay.on()
    this.menu.classList.add(!this._isBlack ? 'menu_on-top' : 'menu_on-top_black')
    this.menuItems.classList.add('menu__items-list_show')
    if (this._isBlack) this.menuItems.style.background = 'white'
    this._isOpened = true
  }

  close() {
    this.menuControl.classList.remove(this.domElements.menu.mobileMenuClose)
    if (this._isBlack) this.menuControl.classList.remove(this.domElements.menu.mobileMenuCloseblack)
    this._overlay.off()
    this.menu.classList.remove('menu_on-top')
    this.menu.classList.remove('menu_on-top_black')
    this.menuItems.classList.remove('menu__items-list_show')
    this._isOpened = false
  }
}
