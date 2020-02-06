/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'

import Popup from './js/components/popup'
import Menu from './js/components/menu'
import NewsApi from './js/api/newsApi'
import Results from './js/components/results'
import MainApi from './js/api/mainApi'

const newsApi = new NewsApi()
const mainApi = new MainApi()
const results = new Results(newsApi.getNews.bind(newsApi))
const popupRegistration = new Popup(document.querySelector('#registration'), mainApi.signUp.bind(mainApi))
const popupSignIn = new Popup(document.querySelector('#signIn'), mainApi.signIn.bind(mainApi))
const popupSignUpSuccess = new Popup(document.querySelector('#signUpSuccess'))
const mobileMenu = new Menu(
  {
    control: '.menu__mobile',
    items: '.menu__items-list',
    menu: '.menu',
  },
)


document.querySelector('.menu__link_logged').addEventListener('click', (event) => {
  popupRegistration.open(event)
})
document.querySelector('#signIn-form').addEventListener('click', (event) => {
  popupRegistration.close()
  popupSignUpSuccess.close()
  popupSignIn.open(event)
})
document.querySelector('#registred-signIn-form').addEventListener('click', (event) => {
  popupSignUpSuccess.close()
  popupSignIn.open(event)
})
document.querySelector('#signUp-form').addEventListener('click', (event) => {
  popupSignIn.close()
  popupRegistration.open(event)
})
document.querySelector('#mobile-menu').addEventListener('click', (event) => {
  mobileMenu.click()
})
