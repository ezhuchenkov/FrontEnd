
import BaseComponent from './baseComponent'
import { MAIN_PAGE, MOBILE_VIEW_SIZE } from '../constants/config'

export default class Page extends BaseComponent {
  constructor(options) {
    super()
    this._header = options.header
    this._popupRegistration = options.popupRegistration
    this._popupSignIn = options.popupSignIn
    this._popupSignUpSuccess = options.popupSignUpSuccess
    this._logout = options.logout
    this._menu = options.menu
  }

  render() {
    this._header({ isLoggedIn: this.isLogged(), name: localStorage.getItem('user') })
    this._addLiteners()
  }

  _addLiteners() {
    this.addlistener(document.querySelector(this.domElements.menu.loggedLink), 'click', () => { this.logging() })
    this.addlistener(document.querySelector(this.domElements.menu.mobileMenu), 'click', () => { this._menu.click() })
    window.addEventListener('resize', () => {
      if (window.innerWidth > MOBILE_VIEW_SIZE) this._menu.close()
    })
    if (document.location.pathname === MAIN_PAGE) {
      this.addlistener(document.querySelector(this.domElements.authForm.signin), 'click', (event) => {
        this._popupRegistration.close()
        this._popupSignUpSuccess.close()
        this._popupSignIn.open(event)
      })
      this.addlistener(document.querySelector(this.domElements.authForm.registredSignin), 'click', (event) => {
        this._popupSignUpSuccess.close()
        this._popupSignIn.open(event)
      })
      this.addlistener(document.querySelector(this.domElements.authForm.signup), 'click', (event) => {
        this._popupSignIn.close()
        this._popupRegistration.open(event)
      })
    }
  }

  logging() {
    if (this.isLogged()) {
      this._logout()
      localStorage.clear()
      this._header({ isLoggedIn: false, name: null })
    } else {
      this._popupRegistration.open()
    }
  }
}
