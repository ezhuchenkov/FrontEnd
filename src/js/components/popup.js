/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
import '../../blocks/popup/popup.css'
import Overlay from './overlay'
import { SIGNUP, SIGNIN, domElements } from '../constants/config'


export default class Popup {
  constructor(popupID, mainApi, header) {
    this.open = this.open.bind(this)
    this.generateError = this.generateError.bind(this)
    this.close = this.close.bind(this)
    this.submit = this.submit.bind(this)
    this.validate = this.validate.bind(this)
    this.popupID = popupID
    this.popupClose = this.popupID.querySelector(`.${domElements.authForm.close}`)
    this.overlay = new Overlay()
    this.mainApi = mainApi
    this.popupName = this.popupID.id
    this.header = header

    this.form = document.forms[this.popupName]
    this.inputs = []
    this.submitButton = this.form.querySelector(`.${domElements.button}`)
    Array.from(this.form.elements)
      .forEach((element) => {
        if (element.classList.contains(domElements.authForm.input)) {
          this.inputs.push(element)
        }
      })
  }

  open() {
    this.popupID.classList.remove(domElements.popups.popupHide)
    document.querySelector('#mobile-menu').style.display = 'none'
    this.overlay.on()
    this.popupClose.addEventListener('click', this.close)
    if (this.submitButton) {
      this.submitButton.addEventListener('click', (event) => this.submit(event))
    }
    this.popupID.addEventListener('input', this.validate)
  }

  close() {
    this.popupID.classList.add(domElements.popups.popupHide)
    document.querySelector('#mobile-menu').style.display = 'block'
    this.overlay.off()
    this.popupClose.removeEventListener('click', this.close)
  }

  submit(event) {
    event.preventDefault()
    if (this.popupName === SIGNUP) {
      this.singUpSubmit()
    }
    if (this.popupName === SIGNIN) {
      this.singInSubmit()
    }
  }

  singUpSubmit() {
    const data = {
      name: this.inputs[2].value,
      email: this.inputs[0].value,
      password: this.inputs[1].value,
    }
    this.mainApi(data)
  }

  singInSubmit() {
    const data = {
      email: this.inputs[0].value,
      password: this.inputs[1].value,
    }
    this.mainApi(data)
      .then((res) => {
        localStorage && localStorage.setItem('user', res.name)
        this.header({ isLoggedIn: true, name: res.name })
      })
    this.close()
  }

  submitButtonDisabler() {
    this.submitButton.setAttribute('disabled', true)
  }

  submitButtonEnabler() {
    this.submitButton.removeAttribute('disabled')
  }

  generateError(text) {
    const error = document.createElement('span')
    error.className = domElements.authForm.errorMessage
    error.innerHTML = text
    return error
  }

  removeValidation() {
    const errors = this.form.querySelectorAll(`.${domElements.authForm.errorMessage}`)
    for (let i = 0; i < errors.length; i += 1) {
      errors[i].remove()
    }
  }

  validate() {
    this.removeValidation()
    this.lengthChecker()
    this.passChecker()
    this.nameChecker()
    this.emailChecker()
    this.errorCheker()
  }

  lengthChecker() {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (!this.inputs[i].value || this.inputs[i].value.length === 0) {
        const error = this.generateError(domElements.popups.errors.requiredArea)
        this.errorInput(i, error)
      }
    }
  }

  passChecker() {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (this.inputs[i].validity.tooShort && this.inputs[i].name
        === domElements.authForm.inputs.password) {
        const error = this.generateError(domElements.popups.errors.passLength)
        this.errorInput(i, error)
      }
    }
  }

  nameChecker() {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (this.inputs[i].validity.tooShort && this.inputs[i].name
        === domElements.authForm.inputs.name) {
        const error = this.generateError(domElements.popups.errors.nameLength)
        this.errorInput(i, error)
      }
    }
  }

  emailChecker() {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (this.inputs[i].name === domElements.authForm.inputs.email) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(this.inputs[i].value) === false) {
          const error = this.generateError(domElements.popups.errors.emailValidation)
          this.errorInput(i, error)
        }
      }
    }
  }

  errorInput(i, error) {
    this.form[i].parentElement.insertBefore(error, this.inputs[i].nextSibling)
    this.submitButtonDisabler()
  }

  errorCheker() {
    const errors = this.form.querySelectorAll(`.${domElements.authForm.errorMessage}`)
    if (errors.length > 0) {
      this.submitButtonDisabler()
    } else {
      this.submitButtonEnabler()
    }
  }
}
