/* eslint-disable no-new */
import './vendor/normalize.css'
import './index.css'
import Page from './js/components/page'
import Preloader from './js/components/preloader'
import NewsApi from './js/api/newsApi'
import Results from './js/components/results'
import MainApi from './js/api/mainApi'
import Header from './js/components/header'
import Popup from './js/components/popup'
import CardList from './js/components/cardList'
import Overlay from './js/components/overlay'
import { domElements } from './js/constants/config'

const newsApi = new NewsApi()
const mainApi = new MainApi()
const preloader = new Preloader()
const header = new Header()
const cardList = new CardList()
const overlay = new Overlay()
new Results(newsApi.getNews.bind(newsApi), {
  isLoggedIn: Boolean(localStorage.getItem('user')),
  preloader,
  cardList: cardList.addCard.bind(cardList),
})
const popupSignUpSuccess = new Popup(document
  .querySelector(domElements.popups.popupSignUpSuccess), null, null, overlay, null)

const popupRegistration = new Popup(
  document.querySelector(domElements.popups.popupRegistration),
  mainApi.signUp.bind(mainApi),
  header.render.bind(header),
  overlay,
  popupSignUpSuccess,
)
const popupSignIn = new Popup(
  document.querySelector(domElements.popups.popupSignIn),
  mainApi.signIn.bind(mainApi),
  header.render.bind(header),
  overlay,
  null,
)

new Page(
  {
    pageName: 'mainPage',
    preloader,
    popupRegistration,
    popupSignIn,
    popupSignUpSuccess,
    header: header.render.bind(header),
    logout: mainApi.logout.bind(mainApi),
  },
).render()
// const menu = new Menu(
//   {
//     control: '.menu__mobile',
//     items: '.menu__items-list',
//     menu: '.menu',
//   },
// )
