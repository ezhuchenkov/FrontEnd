import {
  mainUrl, apiKey, calculationDate, pageSize, langOption,
} from '../constants/config'


export default class NewsApi {
  constructor() {
    this.mainUrl = mainUrl
    this.apiKey = apiKey
    this.calculationDate = calculationDate
    this.pageSize = pageSize
    this.langOption = langOption
  }

  getNews(request) {
    const dateNow = new Date()
    const dateFrom = `from=${this.calculationDate.getFullYear()}-${this.calculationDate.getMonth() + 1}-${this.calculationDate.getDate()}&`
    const dateTo = `to=${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}&`
    const req = new Request(`${this.mainUrl}${this.apiKey}q=${request}&${dateFrom}${dateTo}${this.langOption}${this.pageSize}`)
    return fetch(req)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`))
      })
      .catch((err) => {
        throw new Error(`Ошибка: ${err.message}`)
      })
  }
}
