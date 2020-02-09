/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
import '../../blocks/popup/popup.css'
import Overlay from './overlay'
import { SIGNUP, SIGNIN } from '../constants/config'


export default class Popup {
  constructor(popupID, mainApi, header) {
    this.open = this.open.bind(this)
    this.generateError = this.generateError.bind(this)
    this.close = this.close.bind(this)
    this.submit = this.submit.bind(this)
    this.validate = this.validate.bind(this)
    this.popupID = popupID
    this.popupClose = this.popupID.querySelector('.auth-form__close')
    this.overlay = new Overlay()
    this.mainApi = mainApi
    this.popupName = this.popupID.id
    this.header = header

    this.form = document.forms[this.popupName]
    this.inputs = []
    this.submitButton = this.form.querySelector('.button')
    Array.from(this.form.elements)
      .forEach((element) => {
        if (element.classList.contains('auth-form__input')) {
          this.inputs.push(element)
        }
      })
  }

  open() {
    this.popupID.classList.remove('popup_hide')
    document.querySelector('#mobile-menu').style.display = 'none'
    this.overlay.on()
    this.popupClose.addEventListener('click', this.close)
    if (this.submitButton) {
      this.submitButton.addEventListener('click', (event) => this.submit(event))
    }
    this.popupID.addEventListener('input', this.validate)
  }

  close() {
    this.popupID.classList.add('popup_hide')
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
    error.className = 'auth-form__error-message'
    error.innerHTML = text
    return error
  }

  removeValidation() {
    const errors = this.form.querySelectorAll('.auth-form__error-message')
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
        const error = this.generateError('Это обязательное поле')
        this.form[i].parentElement.insertBefore(error, this.inputs[i].nextSibling)
      }
    }
  }

  passChecker() {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (this.inputs[i].validity.tooShort && this.inputs[i].name === 'password') {
        const error = this.generateError('Длина пароля должна быть 8 или более символов')
        this.form[i].parentElement.insertBefore(error, this.inputs[i].nextSibling)
        this.submitButtonDisabler()
      }
    }
  }

  nameChecker() {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (this.inputs[i].validity.tooShort && this.inputs[i].name === 'name') {
        const error = this.generateError('Имя должно быть не менее 2 символов')
        this.form[i].parentElement.insertBefore(error, this.inputs[i].nextSibling)
        this.submitButtonDisabler()
      }
    }
  }

  emailChecker() {
    for (let i = 0; i < this.inputs.length; i += 1) {
      if (this.inputs[i].name === 'email') {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(this.inputs[i].value) === false) {
          const error = this.generateError('Введите корректный адрес e-mail')
          this.form[i].parentElement.insertBefore(error, this.inputs[i].nextSibling)
          this.submitButtonDisabler()
        }
      }
    }
  }


  errorCheker() {
    const errors = this.form.querySelectorAll('.auth-form__error-message')
    if (errors.length > 0) {
      this.submitButtonDisabler()
    } else {
      this.submitButtonEnabler()
    }
  }
}
