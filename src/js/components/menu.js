
import '../../blocks/menu/menu.css'

import Overlay from './overlay'


export default class Menu {
  constructor({ control, items, menu }) {
    this.isOpened = false
    this.menuItems = document.querySelector(items)
    this.menuControl = document.querySelector(control)
    this.menu = document.querySelector(menu)
    this.isBlack = Array.from(this.menu.classList).includes('menu_black')
    this.overlay = new Overlay()
  }

  click() {
    if (this.isOpened) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.menuControl.classList.add('menu__mobile_close')
    if (this.isBlack) this.menuControl.classList.add('menu__mobile_close_black')
    this.overlay.on()
    this.menu.classList.add(!this.isBlack ? 'menu_on-top' : 'menu_on-top_black')
    this.menuItems.classList.add('menu__items-list_show')
    if (this.isBlack) this.menuItems.style.background = 'black'
    this.isOpened = true
  }

  close() {
    this.menuControl.classList.remove('menu__mobile_close')
    this.overlay.off()
    this.menu.classList.remove('menu_on-top')
    this.menu.classList.remove('menu_on-top_black')
    this.menuItems.classList.remove('menu__items-list_show')
    if (this.isBlack) this.menuItems.style.background = 'black'
    this.isOpened = false
  }
}
