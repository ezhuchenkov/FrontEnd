
// DOM-elemets configuration
export const resultSection = document.querySelector('.results')
export const headerForm = document.querySelector('.header__form')
export const container = document.querySelector('.results__news')


// BackEnd configuration
export const mainApiUrls = {
  signUpUrl: 'http://localhost:3000/signup',
  signInUrl: 'http://localhost:3000/signin',
  articlesUrl: 'http://localhost:3000/articles',
  getUserInfoUrl: 'http://localhost:3000/users/me',
  logoutUrl: 'http://localhost:3000/logout',
}

// NewsApi configuration
export const newsApiConfig = {
  mainUrl: 'https://newsapi.org/v2/everything?',
  apiKey: 'apiKey=05ef796b6e4f4d7bb3e42754e27ddafe&',
  calculationDate: new Date(new Date() - (7 * 24 * 3600 * 1000)),
  pageSize: 'pageSize=100',
  langOption: 'lang=ru&',
}


// constants
export const MAIN_PAGE = 'mainPage'
export const ARTICLES = 'articles'
export const SIGNUP = 'signUp'
export const SIGNIN = 'signIn'

// DOM-elemets configuration
export const domElements = {
  card: {
    card: 'card',
    cardImage: 'card__image',
    cardPopup: 'card__popup',
    cardPopupTextLogin: 'Войдите, чтобы сохранять статьи',
    cardPopupTextDelete: 'Убрать из сохраненных',
    cardPopupTextSave: 'Сохранить',
    cardIcon: 'card__icon',
    cardIconDelete: 'card__icon_delete',
    cardIconAdd: 'card__icon_add',
    cardKeyword: 'card__keyword',
    cardDescription: 'card__description',
    cardDate: 'card__date',
    cardTitle: 'card__title',
    cardText: 'card__text',
    cardSource: 'card__source',
  },
  container: '.results__news',
  button: 'button',
  resultSection: '.results',

  popups: {
    popupRegistration: '#signUp',
    popupSignUpSuccess: '#signUpSuccess',
    popupSignIn: '#signIn',
    popupHide: 'popup_hide',
    errors: {
      requiredArea: 'Это обязательное поле',
      passLength: 'Длина пароля должна быть 8 или более символов',
      nameLength: 'Имя должно быть не менее 2 символов',
      emailValidation: 'Введите корректный адрес e-mail',
    },
  },
  authForm: {
    signin: '#signIn-form',
    registredSignin: '#registred-signIn-form',
    signup: '#signUp-form',
    close: 'auth-form__close',
    input: 'auth-form__input',
    errorMessage: 'auth-form__error-message',
    inputs: {
      email: 'email',
      name: 'name',
      password: 'password',
    },
  },
  savedArticles: {
    title: '.saved-articles__title',
    keywords: '.saved-articles__keyword',
    firstKeyWord: '.saved-articles__keyword_first',
    secondKeyWord: '.saved-articles__keyword_second',
    countKeyWord: '.saved-articles__keyword_count',
    otherKeyWord: '.saved-articles__keyword_other',
  },
  menu: {
    loggedLink: '.menu__link_logged',
  },
  header: {
    userNameButton: '#username',
    logoutIcon: '.menu__logout',
    articlesButton: '#articles',
    headerForm: '.header__form',
    inputArea: '.header__form-input',
    inputErrorPopup: 'header__form-input_error',
    inputErrorPopupText: 'Поле поиска не может быть пустым',
  },
  results: {
    button: 'results__button',
    buttonText: 'Показать еще',
    buttonHide: 'button_hide',
    news: 'results__news',
    hide: 'results_hide',
    title: 'title',
    titleText: 'Результаты поиска',
  },
  preloader: {
    preloaderSection: '.preloader',
    preloaderBox: 'preloader__box',
    preloaderBoxIdCircle: 'preloaderCircle',
    preloaderBoxIdNoNews: 'noNews',
    preloaderBoxIdError: 'error',
    preloaderCircle: 'preloader__circle',
    preloaderSubtitle: 'preloader__subtitle',
    preloaderSubtitleFindText: 'Идет поиск новостей...',
    preloaderSubtitleNotFoundText: 'К сожалению по вашему запросу ничего не найдено.',
    preloaderSubtitleErrorText: 'К сожалению по вашему запросу ничего не найдено.',
    preloaderIcon: 'preloader__icon',
    preloaderIconSrc: './images/not-found.svg',
    preloaderIconAlt: 'Ничего не найдено.',
    preloaderTitle: 'title',
    preloaderTitleText: 'Ошибка',
  },
  overlay: {
    overlay: '.overlay',
    overlayOn: 'overlay_on',
  },
}
