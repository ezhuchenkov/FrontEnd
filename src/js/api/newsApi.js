import { newsApiConfig } from '../constants/config'


export default class NewsApi {
  constructor() {
    this._mainUrl = newsApiConfig.mainUrl
    this._apiKey = newsApiConfig.apiKey
    this._calculationDate = newsApiConfig.calculationDate
    this._pageSize = newsApiConfig.pageSize
    this._langOption = newsApiConfig.langOption
  }

  getNews(request) {
    const dateNow = new Date()
    const dateFrom = `from=${this._calculationDate.getFullYear()}-${this._calculationDate.getMonth() + 1}-${this._calculationDate.getDate()}&`
    const dateTo = `to=${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}&`
    const req = new Request(`${this._mainUrl}${this._apiKey}q=${request}&${dateFrom}${dateTo}${this._langOption}${this._pageSize}`)
    return fetch(req)
      .then((res) => {
        if (res.ok) {
          return res.clone().json()
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}
