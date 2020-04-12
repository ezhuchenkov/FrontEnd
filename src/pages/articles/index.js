/* eslint-disable no-unused-vars */
import '../../vendor/normalize.css'
import './index.css'
import Page from '../../js/components/page'
import Results from '../../js/components/results'
import MainApi from '../../js/api/mainApi'
import Title from '../../js/components/title'
import Header from '../../js/components/header'
import CardList from '../../js/components/cardList'
import Menu from '../../js/components/menu'
import Overlay from '../../js/components/overlay'

const isBlack = true
const mainApi = new MainApi()
const getArticles = mainApi.getArticles.bind(mainApi)
const title = new Title(localStorage.getItem('user'), getArticles)
title.render()
const header = new Header()
const overlay = new Overlay()
const menu = new Menu(overlay, isBlack)
const cardList = new CardList(title.render.bind(title))
const result = new Results(getArticles,
  {
    isLoggedIn: Boolean(localStorage.getItem('user')),
    cardList: cardList.addArticle.bind(cardList),
    removeArticle: mainApi.removeArticle.bind(mainApi),
    getArticles,
  },
  title.render.bind(title)).renderArticles()

new Page(
  {
    header: header.render.bind(header),
    logout: mainApi.logout.bind(mainApi),
    menu,
  },
).render()
