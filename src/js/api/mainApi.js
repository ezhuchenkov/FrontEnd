import { signUpUrl, signInUrl } from '../constants/config'

export default class MainApi {
  constructor() {
    this.signUpUrl = signUpUrl
    this.signInUrl = signInUrl
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

  // getArticles() {
  //   return fetch(this.articles,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       mode: 'cors',
  //       credentials: 'include',
  //     })
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`Ошибка чтения карточек ${res.status}`)
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


  // getUserData() {
  //   return fetch(this.getUser, { credentials: 'include' })
  //     .then((res) => {
  //       if (!res.ok) throw new Error(`Ошибка чтения ${res.status}`)
  //       return res.json()
  //     })
  //     .then((userInfo) => userInfo.user)
  //     .catch((err) => {
  //       throw new Error(err.message)
  //     })
  // }
}
