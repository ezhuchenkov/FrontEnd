/* eslint-disable no-restricted-syntax */
import '../../blocks/card/card.css'
import { domElements } from '../constants/config'

export default class Title {
  constructor(name, articles) {
    this._name = name
    this._title = document.querySelector(domElements.savedArticles.title)
    this._keywords = document.querySelector(domElements.savedArticles.keywords)
    this._firstKeyWord = document.querySelector(domElements.savedArticles.firstKeyWord)
    this._secondKeyWord = document.querySelector(domElements.savedArticles.secondKeyWord)
    this._countKeyWord = document.querySelector(domElements.savedArticles.countKeyWord)
    this._otherKeyWord = document.querySelector(domElements.savedArticles.otherKeyWord)
    this._articles = articles
  }

  render() {
    this._popularWordsCounter()
  }

  _popularWordsCounter() {
    const arr = []
    this._articles().then((data) => {
      [...data.data].forEach((item) => {
        arr.push(item.keyword)
      })
      this._title.textContent = `${this._name}, у Вас ${data.data.length} сохраненных статей`
      const arr2 = []
      for (const i in arr) {
        if (arr2[arr[i]] !== undefined) {
          (arr2[arr[i]] += 1)
        } else {
          (arr2[arr[i]] = 1)
        }
      }
      const mostPopular = { words: [], key: '', max: 0 }
      const keysLength = Array.from(Object.keys(arr2)).length
      const attempts = keysLength >= 3 ? 3 : keysLength
      for (let i = 0; i < attempts; i += 1) {
        Array.from(Object.keys(arr2)).forEach((item) => {
          if (mostPopular.max < arr2[item]) {
            mostPopular.max = arr2[item]
            mostPopular.key = item
          }
        })
        delete arr2[mostPopular.key]
        mostPopular.words.push(mostPopular.key)
        mostPopular.max = 0
        mostPopular.key = ''
      }
      this._statUpdate(mostPopular.words, keysLength)
    })
      .catch((err) => {
        console.log(err.message)
      })
  }

  _statUpdate(mostPopular, keysLength) {
    switch (keysLength) {
      case 0:
        this._firstKeyWord.textContent = ''
        this._otherKeyWord.style.display = 'none'
        break
      case 1:
        this._firstKeyWord.textContent = mostPopular.shift()
        this._secondKeyWord.textContent = ''
        this._otherKeyWord.style.display = 'none'
        break
      case 2:
        this._firstKeyWord.textContent = `${mostPopular.shift()},`
        this._secondKeyWord.textContent = mostPopular.shift()
        this._otherKeyWord.style.display = 'none'
        break
      default:
        this._firstKeyWord.textContent = `${mostPopular.shift()},`
        this._secondKeyWord.textContent = mostPopular.shift()
        this._countKeyWord.textContent = `и ${keysLength - 2}`
        this._otherKeyWord.style.display = 'auto'
    }
  }
}
