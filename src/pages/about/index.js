import '../../vendor/normalize.css'
import './index.css'
import Page from '../../js/components/page'

new Page(
  {
    pageName: 'about',
    color: 'black',
    articlesLinkAdress: '../articles/',
    popupRegistration: document.querySelector('#signUp'),
    popupSignUpSuccess: document.querySelector('#signUpSuccess'),
    popupSignIn: document.querySelector('#signIn'),

  },
).render()
