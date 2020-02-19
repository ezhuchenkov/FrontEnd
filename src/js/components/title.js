/* eslint-disable no-restricted-syntax */
import '../../blocks/card/card.css'
import { domElements } from '../constants/config'

export default class Title {
  constructor(name, articles) {
    this.name = name
    this.title = document.querySelector(domElements.savedArticles.title)
    this.keywords = document.querySelector(domElements.savedArticles.keywords)
    this.firstKeyWord = document.querySelector(domElements.savedArticles.firstKeyWord)
    this.secondKeyWord = document.querySelector(domElements.savedArticles.secondKeyWord)
    this.countKeyWord = document.querySelector(domElements.savedArticles.countKeyWord)
    this.otherKeyWord = document.querySelector(domElements.savedArticles.otherKeyWord)
    this.articles = articles
  }

  render() {
    this.popularWordsCounter()
  }

  popularWordsCounter() {
    const arr = []
    this.articles().then((data) => {
      [...data.data].forEach((item) => {
        arr.push(item.keyword)
      })
      this.title.textContent = `${this.name}, у Вас ${data.data.length} сохраненных статей`
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
      this.statUpdate(mostPopular.words, keysLength)
    })
      .catch((err) => {
        console.log(err.message)
      })
  }

  statUpdate(mostPopular, keysLength) {
    switch (keysLength) {
      case 0:
        this.firstKeyWord.textContent = ''
        this.otherKeyWord.style.display = 'none'
        break
      case 1:
        this.firstKeyWord.textContent = mostPopular.shift()
        this.secondKeyWord.textContent = ''
        this.otherKeyWord.style.display = 'none'
        break
      case 2:
        this.firstKeyWord.textContent = `${mostPopular.shift()},`
        this.secondKeyWord.textContent = mostPopular.shift()
        this.otherKeyWord.style.display = 'none'
        break
      default:
        this.firstKeyWord.textContent = `${mostPopular.shift()},`
        this.secondKeyWord.textContent = mostPopular.shift()
        this.countKeyWord.textContent = `и ${keysLength - 2}`
        this.otherKeyWord.style.display = 'auto'
    }
  }
}
