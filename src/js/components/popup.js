/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
import '../../blocks/popup/popup.css'
import { SIGNUP, SIGNIN, domElements } from '../constants/config'
import BaseComponent from './baseComponent'


export default class Popup extends BaseComponent {
  constructor(popupID, mainApi, header, overlay, nextPopup) {
    super()
    this.open = this.open.bind(this)
    this._generateError = this._generateError.bind(this)
    this.close = this.close.bind(this)
    this._submit = this._submit.bind(this)
    this._validate = this._validate.bind(this)
    this._popupID = popupID
    this._popupClose = this._popupID.querySelector(`.${domElements.authForm.close}`)
    this._overlay = overlay
    this._mainApi = mainApi
    this._popupName = this._popupID.id
    this._header = header
    this._nextPopup = nextPopup

    this._form = document.forms[this._popupName]
    this._inputs = []
    this._submitButton = this._form.querySelector(`.${domElements.button}`)
    Array.from(this._form.elements)
      .forEach((element) => {
        if (element.classList.contains(domElements.authForm.input)) {
          this._inputs.push(element)
        }
      })
  }

  open() {
    this._popupID.classList.remove(domElements.popups.popupHide)
    this._overlay.on()
    this.addlistener(document.querySelector(this.domElements.popups.popup), 'click', (event) => {
      const { target } = event
      if (target === document.querySelector(this.domElements.authForm.authForm)
        || target.closest('form')) {
        return
      }
      this.close()
    })
    window.addEventListener('keydown', (e) => {
      const { keyCode } = e
      if (keyCode === 27) {
        this.close()
      }
    })
    this.addlistener(this._popupClose, 'click', this.close)
    if (this._submitButton) {
      this.addlistener(this._submitButton, 'click', (e) => {
        e.preventDefault()
        this._submit()
      })
    }
    this.addlistener(this._popupID, 'input', this._validate)
  }

  close() {
    this._popupID.classList.add(domElements.popups.popupHide)
    this._overlay.off()
    this._popupClose.removeEventListener('click', this.close)
  }

  _submit() {
    this._removeValidation()
    if (this._popupName === SIGNUP) {
      this._singUpSubmit()
        .then((res) => {
          if (!res.ok) {
            const error = this._generateError(domElements.popups.serverErrors.checked)
            this._serverErrorInput(error)
          } else {
            this.close()
            this._nextPopup.open()
          }
        })
        .catch((err) => {
          const error = this._generateError(domElements.popups.serverErrors.unchecked)
          this._serverErrorInput(error)
          throw new Error(err.message)
        })
    }
    if (this._popupName === SIGNIN) {
      this._singInSubmit()
        .then((res) => {
          if (!res.ok) {
            if (res.status == '401') {
              const error = this._generateError(domElements.popups.serverErrors.unauthorized)
              this._serverErrorInput(error)
            } else {
              const error = this._generateError(domElements.popups.serverErrors.unchecked)
              this._serverErrorInput(error)
            }
          }
          return res.json()
        })
        .then((res) => {
          localStorage.setItem('user', res.name)
          this._header({ isLoggedIn: true, name: res.name })
          this.close()
        })
        .catch((err) => {
          const error = this._generateError(domElements.popups.serverErrors.unchecked)
          this._serverErrorInput(error)
          throw new Error(err.message)
        })
    }
  }


  _singUpSubmit() {
    const data = {
      name: this._inputs[2].value,
      email: this._inputs[0].value,
      password: this._inputs[1].value,
    }
    return this._mainApi(data)
  }

  _singInSubmit() {
    const data = {
      email: this._inputs[0].value,
      password: this._inputs[1].value,
    }
    return this._mainApi(data)
  }

  _submitButtonDisabler() {
    this._submitButton.setAttribute('disabled', true)
  }

  _submitButtonEnabler() {
    this._submitButton.removeAttribute('disabled')
  }

  _generateError(text) {
    const error = document.createElement('span')
    error.className = domElements.authForm.errorMessage
    error.innerHTML = text
    return error
  }

  _removeValidation() {
    const errors = this._form.querySelectorAll(`.${domElements.authForm.errorMessage}`)
    for (let i = 0; i < errors.length; i += 1) {
      errors[i].remove()
    }
  }

  _validate() {
    this._removeValidation()
    this._lengthChecker()
    this._passChecker()
    this._nameChecker()
    this._emailChecker()
    this._errorCheker()
  }

  _lengthChecker() {
    for (let i = 0; i < this._inputs.length; i += 1) {
      if (!this._inputs[i].value || this._inputs[i].value.length === 0) {
        const error = this._generateError(domElements.popups.errors.requiredArea)
        this._errorInput(i, error)
      }
    }
  }

  _passChecker() {
    for (let i = 0; i < this._inputs.length; i += 1) {
      if (this._inputs[i].validity.tooShort && this._inputs[i].name
        === domElements.authForm.inputs.password) {
        const error = this._generateError(domElements.popups.errors.passLength)
        this._errorInput(i, error)
      }
    }
  }

  _nameChecker() {
    for (let i = 0; i < this._inputs.length; i += 1) {
      if (this._inputs[i].validity.tooShort && this._inputs[i].name
        === domElements.authForm.inputs.name) {
        const error = this._generateError(domElements.popups.errors.nameLength)
        this._errorInput(i, error)
      }
    }
  }

  _emailChecker() {
    for (let i = 0; i < this._inputs.length; i += 1) {
      if (this._inputs[i].name === domElements.authForm.inputs.email) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(this._inputs[i].value) === false) {
          const error = this._generateError(domElements.popups.errors.emailValidation)
          this._errorInput(i, error)
        }
      }
    }
  }

  _errorInput(i, error) {
    this._form[i].parentElement.insertBefore(error, this._inputs[i].nextSibling)
    this._submitButtonDisabler()
  }

  _serverErrorInput(error) {
    this._form.insertBefore(error, this._submitButton)
  }

  _errorCheker() {
    const errors = this._form.querySelectorAll(`.${domElements.authForm.errorMessage}`)
    if (errors.length > 0) {
      this._submitButtonDisabler()
    } else {
      this._submitButtonEnabler()
    }
  }
}
