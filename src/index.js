/* eslint-disable no-unused-vars */
import './vendor/normalize.css'
import './index.css'
import Page from './js/components/page'

new Page(
  {
    pageName: 'about',
    color: 'white',
    articlesLinkAdress: '../articles/',
    popupRegistration: document.querySelector('#signUp'),
    popupSignUpSuccess: document.querySelector('#signUpSuccess'),
    popupSignIn: document.querySelector('#signIn'),

  },
).render()

// const menu = new Menu(
//   {
//     control: '.menu__mobile',
//     items: '.menu__items-list',
//     menu: '.menu',
//   },
// )
