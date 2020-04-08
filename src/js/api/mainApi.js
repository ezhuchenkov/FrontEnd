import { mainApiUrls } from '../constants/config'

export default class MainApi {
  constructor() {
    this._signUpUrl = mainApiUrls.signUpUrl
    this._signInUrl = mainApiUrls.signInUrl
    this._articlesUrl = mainApiUrls.articlesUrl
    this._getUserInfoUrl = mainApiUrls.getUserInfoUrl
    this._logoutUrl = mainApiUrls.logoutUrl
  }

  signUp(data) {
    return fetch(this._signUpUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
  }

  signIn(data) {
    return fetch(this._signInUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
  }

  getArticles() {
    return fetch(this._articlesUrl,
      { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
        return res.json()
          .catch((err) => {
            throw new Error(err.message)
          })
      })
  }

  getUserInfo() {
    return fetch(this._getUserInfoUrl, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
        return res.json()
      })
      .then((userInfo) => userInfo.user)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  logout() {
    return fetch(this._logoutUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
        return res.json()
      })
      .catch((e) => {
        throw new Error(e.message)
      })
  }

  saveArticle(data) {
    return fetch(this._articlesUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка сохранения карточки ${res.status}`)
        return res.json()
      })
      .then((res) => res._id)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  removeArticle(id) {
    return fetch(`${this._articlesUrl}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}`)
        return res.json()
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}
