import Popup from './popup'
// import Menu from './menu'
import NewsApi from '../api/newsApi'
import Results from './results'
import MainApi from '../api/mainApi'
import Header from './header'
import { MAIN_PAGE, ARTICLES } from '../constants/config'

export default class Page {
  constructor(options) {
    this.options = options
    this.header = new Header(this.options)
    this.newsApi = new NewsApi()
    this.mainApi = new MainApi()
    if (this.options.pageName === MAIN_PAGE) {
      this.results = new Results(this.newsApi.getNews.bind(this.newsApi))
    }
    if (this.options.pageName === ARTICLES) {
      this.results = new Results(this.mainApi.getArticles.bind(this.mainApi)).renderArticles()
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
    this.authChecker()
    this.addLiteners()
  }

  // добавить функцию addlistener
  addLiteners() {
    document.querySelector('.menu__link_logged').addEventListener('click', (event) => {
      this.popupRegistration.open(event)
    })
    document.querySelector('#signIn-form').addEventListener('click', (event) => {
      this.popupRegistration.close()
      this.popupSignUpSuccess.close()
      this.popupSignIn.open(event)
    })
    document.querySelector('#registred-signIn-form').addEventListener('click', (event) => {
      this.popupSignUpSuccess.close()
      this.popupSignIn.open(event)
    })
    document.querySelector('#signUp-form').addEventListener('click', (event) => {
      this.popupSignIn.close()
      this.popupRegistration.open(event)
    })
  }

  headerRender(props) {
    this.header.render(props)
  }

  authChecker() {
    this.mainApi.getUserInfo()
      .then((data) => {
        if (data) {
          this.header.render({
            isLoggedIn: true,
            name: data,
          })
        }
      })
  }
}
