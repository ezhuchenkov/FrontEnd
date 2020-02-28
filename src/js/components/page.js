
import BaseComponent from './baseComponent'

export default class Page extends BaseComponent {
  constructor(options) {
    super()
    this.options = options
    this.header = options.header
    this.popupRegistration = options.popupRegistration
    this.popupSignIn = options.popupSignIn
    this.popupSignUpSuccess = options.popupSignUpSuccess
    this.logout = options.logout
  }

  render() {
    this.header({ isLoggedIn: this.isLogged(), name: localStorage.getItem('user') })
    this.addLiteners()
  }

  addLiteners() {
    this.addlistener(document.querySelector(this.domElements.menu.loggedLink), 'click', () => { this.logging() })
    this.addlistener(document.querySelector(this.domElements.authForm.signin), 'click', (event) => {
      this.popupRegistration.close()
      this.popupSignUpSuccess.close()
      this.popupSignIn.open(event)
    })
    this.addlistener(document.querySelector(this.domElements.authForm.registredSignin), 'click', (event) => {
      this.popupSignUpSuccess.close()
      this.popupSignIn.open(event)
    })
    this.addlistener(document.querySelector(this.domElements.authForm.signup), 'click', (event) => {
      this.popupSignIn.close()
      this.popupRegistration.open(event)
    })
  }

  logging() {
    if (this.isLogged()) {
      this.logout()
      localStorage.clear()
      this.header({ isLoggedIn: false, name: null })
    } else {
      this.popupRegistration.open()
    }
  }
}
