import {
  signUpUrl, signInUrl, getArticlesUrl, getUserInfoUrl,
} from '../constants/config'

export default class MainApi {
  constructor() {
    this.signUpUrl = signUpUrl
    this.signInUrl = signInUrl
    this.getArticlesUrl = getArticlesUrl
    this.getUserInfoUrl = getUserInfoUrl
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
    return fetch(this.getArticlesUrl,
      { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения карточек ${res.status}`)
        return res.json()
          .catch((err) => {
            throw new Error(err.message)
          })
      })
  }

  getUserInfo() {
    return fetch(this.getUserInfoUrl, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`)
        return res.json()
      })
      .then((userInfo) => userInfo.user)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  // saveArticle(data) {
  //   return fetch(this.articles,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       mode: 'cors',
  //       credentials: 'include',
  //       body: JSON.stringify(data),
  //     })
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`Ошибка сохранения карточки ${res.status}`)
  //       return res.json()
  //     })
  //     .then((res) => res._id)
  //     .catch((err) => {
  //       throw new Error(err.message)
  //     })
  // }

  // removeArticle(id) {
  //   return fetch(`${this.articles}/${id}`,
  //     {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       mode: 'cors',
  //       credentials: 'include',
  //     })
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`Ошибка удаления карточки ${res.status}`)
  //       return res.json()
  //     })
  //     .catch((err) => {
  //       throw new Error(err.message)
  //     })
  // }


  // logout() {
  //   return fetch(this.logout,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       mode: 'cors',
  //       credentials: 'include',
  //     })
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`Ошибка выхода: ${res.status}`)
  //       return res.json()
  //     })
  //     .catch((e) => {
  //       throw new Error(e.message)
  //     })
  // }
}
