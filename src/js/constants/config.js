// NewsApi configuration
export const mainUrl = 'https://newsapi.org/v2/everything?'
export const apiKey = 'apiKey=05ef796b6e4f4d7bb3e42754e27ddafe&'
export const calculationDate = new Date(new Date() - (7 * 24 * 3600 * 1000))
export const pageSize = 'pageSize=100'
export const langOption = 'lang=ru&'

// DOM-elemets configuration
export const resultSection = document.querySelector('.results')
export const headerForm = document.querySelector('.header__form')
export const container = document.querySelector('.results__news')

// BackEnd configuration
export const signUpUrl = 'http://localhost:3000/signup'
export const signInUrl = 'http://localhost:3000/signin'
export const articlesUrl = 'http://localhost:3000/articles'
export const getUserInfoUrl = 'http://localhost:3000/users/me'
export const logoutUrl = 'http://localhost:3000/logout'

// constants
export const MAIN_PAGE = 'mainPage'
export const ARTICLES = 'articles'
export const SIGNUP = 'signUp'
export const SIGNIN = 'signIn'
