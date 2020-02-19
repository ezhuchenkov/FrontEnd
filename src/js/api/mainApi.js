import { mainApiUrls } from '../constants/config'

export default class MainApi {
  constructor() {
    this.signUpUrl = mainApiUrls.signUpUrl
    this.signInUrl = mainApiUrls.signInUrl
    this.articlesUrl = mainApiUrls.articlesUrl
    this.getUserInfoUrl = mainApiUrls.getUserInfoUrl
    this.logoutUrl = mainApiUrls.logoutUrl
  }

  signUp(data) {
    return fetch(this.signUpUrl,
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
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  signIn(data) {
    return fetch(this.signInUrl,
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
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  getArticles() {
    return fetch(this.articlesUrl,
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
    return fetch(this.getUserInfoUrl, { credentials: 'include' })
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
    return fetch(this.logoutUrl,
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
    return fetch(this.articlesUrl,
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
    return fetch(`${this.articlesUrl}/${id}`,
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
