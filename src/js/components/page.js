/* eslint-disable class-methods-use-this */
import Popup from './popup'
// import Menu from './menu'
import NewsApi from '../api/newsApi'
import Results from './results'
import MainApi from '../api/mainApi'
import Header from './header'
import { MAIN_PAGE, ARTICLES, domElements } from '../constants/config'
import Title from './title'

export default class Page {
  constructor(options) {
    this.options = options
    this.header = new Header(this.options)
    this.newsApi = new NewsApi()
    this.mainApi = new MainApi()
    if (this.options.pageName === MAIN_PAGE) {
      this.results = new Results(this.newsApi.getNews.bind(this.newsApi), {
        isLoggedIn: this.isLogged(),
        pageName: this.options.pageName,
      })
    }
    if (this.options.pageName === ARTICLES) {
      this.title = new Title(localStorage.getItem('user'), this.mainApi.getArticles.bind(this.mainApi))
      this.title.render()
      this.results = new Results(this.mainApi.getArticles.bind(this.mainApi),
        {
          isLoggedIn: this.isLogged(),
          pageName: this.options.pageName,
        },
        this.title.render.bind(this.title))
        .renderArticles()
    }
    this.popupRegistration = new Popup(
      options.popupRegistration,
      this.mainApi.signUp.bind(this.mainApi),
      this.header.render.bind(this.header),
    )
    this.popupSignIn = new Popup(
      options.popupSignIn,
      this.mainApi.signIn.bind(this.mainApi),
      this.header.render.bind(this.header),
    )
    this.popupSignUpSuccess = new Popup(options.popupSignUpSuccess)
  }

  render() {
    this.headerRender({ isLoggedIn: this.isLogged(), name: localStorage.getItem('user') })
    this.addLiteners()
  }

  // добавить функцию addlistener
  addLiteners() {
    this.addlistener(document.querySelector(domElements.menu.loggedLink), 'click', () => { this.logging() })
    this.addlistener(document.querySelector(domElements.authForm.signin), 'click', (event) => {
      this.popupRegistration.close()
      this.popupSignUpSuccess.close()
      this.popupSignIn.open(event)
    })
    this.addlistener(document.querySelector(domElements.authForm.registredSignin), 'click', (event) => {
      this.popupSignUpSuccess.close()
      this.popupSignIn.open(event)
    })
    this.addlistener(document.querySelector(domElements.authForm.signup), 'click', (event) => {
      this.popupSignIn.close()
      this.popupRegistration.open(event)
    })
  }

  addlistener(el, ev, fn) {
    el.addEventListener(ev, fn)
  }

  logging() {
    if (this.isLogged()) {
      this.mainApi.logout()
      localStorage.clear()
      this.headerRender({ isLoggedIn: false, name: null })
    } else {
      this.popupRegistration.open()
    }
  }

  isLogged() {
    return Boolean(localStorage.getItem('user'))
  }

  headerRender(props) {
    this.header.render(props)
  }
}
