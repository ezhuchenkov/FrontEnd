import '../../vendor/normalize.css'
import './index.css'
import Page from '../../js/components/page'
import { domElements } from '../../js/constants/config'

new Page(
  {
    pageName: 'articles',
    popupRegistration: document.querySelector(domElements.popups.popupRegistration),
    popupSignUpSuccess: document.querySelector(domElements.popups.popupSignUpSuccess),
    popupSignIn: document.querySelector(domElements.popups.popupSignIn),

  },
).render()
