import './popup.css';

export default class Popup {
  constructor(popupID) {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.popupID = popupID;
    this.popupClose = this.popupID.querySelector('.auth-form__close');

    const popupName = this.popupID.id;
    this.popupNewForm = document.forms[popupName];
    this.firstInput = this.popupNewForm.elements[0];
    this.secondInput = this.popupNewForm.elements[1];
    this.thirdInput = this.popupNewForm.elements[2];
    this.submitButton = this.popupNewForm.querySelector('.auth-form__button');
  }
  open() {
    this.popupID.classList.remove('popup_hide');
    this.popupClose.addEventListener('click', this.close);
    this.submitButton.addEventListener('click', this.submit);
    this.popupID.addEventListener('input', this.handleValidate);
  }
  close() {
    this.popupID.classList.add('popup_hide');
    this.popupClose.removeEventListener('click', this.close);
  }
  submit(event) {

    if (this.popupID.id === 'registration' && this.firstInput.value !== 0 && this.secondInput.value !== 0 && this.thirdInput.value !== 0) {
      // api.postCard(this.firstInput.value, this.secondInput.value);
      console.log('works')

    }
  }
  handleValidate() {
    this.validate(this.firstInput);
    this.validate(this.secondInput)
    this.validate(this.thirdInput)
  };

  validate(element) {
    const errorElement = document.querySelector(`#error-${element.name}`);
    let message;
    if (element.validity.valueMissing || element.value.length === 0) {
      message = 'Это обязательное поле';
      errorElement.textContent = message;
    } else if (element.validity.tooShort && element.name == 'password') {
      message = 'Длина пароля должна быть 8 или более символов';
      errorElement.textContent = message;
    } else if (element.validity.tooShort && element.name == 'name') {
      message = 'Имя должно быть не менее 2 символов';
      errorElement.textContent = message;
    } else if (element.validity.typeMismatch && element.name == 'email') {
      message = 'Введите корректный адрес e-mail';
      errorElement.textContent = message;
    }

    if (message) {
      errorElement.textContent = message;
      this.submitButton.setAttribute('disabled', true);
    } else {
      errorElement.textContent = '';
      this.submitButton.removeAttribute('disabled');
    }
  }
}
