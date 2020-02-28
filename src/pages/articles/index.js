/* eslint-disable no-unused-vars */
import '../../vendor/normalize.css'
import './index.css'
import Page from '../../js/components/page'
import { domElements } from '../../js/constants/config'
import Results from '../../js/components/results'
import MainApi from '../../js/api/mainApi'
import Title from '../../js/components/title'
import Header from '../../js/components/header'
import CardList from '../../js/components/cardList'

const mainApi = new MainApi()
const title = new Title(localStorage.getItem('user'), mainApi.getArticles.bind(mainApi))
title.render()
const header = new Header()
const cardList = new CardList(title.render.bind(title))
const result = new Results(mainApi.getArticles.bind(mainApi),
  {
    isLoggedIn: Boolean(localStorage.getItem('user')),
    cardList: cardList.addArticle.bind(cardList),
  },
  title.render.bind(title)).renderArticles()

new Page(
  {
    pageName: 'articles',
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
