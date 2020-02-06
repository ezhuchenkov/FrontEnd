/* eslint-disable class-methods-use-this */
import '../../blocks/card/card.css'

export default class Card {
  constructor(source, title, date, text, image, link, keyword) {
    this.cardItem = this.create(source, title, date, text, image, link, keyword)
  }

  create(source, title, date, text, image, link, keyword) {
    const container = document.querySelector('.results__news')
    const cardItem = document.createElement('a')
    const cardImage = document.createElement('div')
    const cardIcon = document.createElement('div')
    const cardPopup = document.createElement('i')
    // const deleteButton = document.createElement('button');
    const cardDescription = document.createElement('div')
    const cardDate = document.createElement('p')
    const cardTitle = document.createElement('h4')
    const cardText = document.createElement('p')
    const cardSource = document.createElement('p')
    const noImage = '../../../images/noImage.png'
    cardItem.classList.add('card')
    cardItem.href = link
    container.appendChild(cardItem)
    cardImage.classList.add('card__image')
    if (image) {
      cardImage.style = `background-image: url(${image})`
    } else {
      cardImage.style = `background-image: url(${noImage})`
    }
    cardItem.appendChild(cardImage)
    cardIcon.classList.add('card__icon')
    cardImage.appendChild(cardIcon)
    cardPopup.classList.add('card__popup')
    cardPopup.textContent = 'Войдите, чтобы сохранять статьи'
    cardImage.appendChild(cardPopup)
    // if (ownerId === 'd222ddcaf61e8c17e842a42c') {
    //     deleteButton.classList.add('place-card__delete-icon');
    //     cardImage.appendChild(deleteButton);
    // }
    cardDescription.classList.add('card__description')
    cardItem.appendChild(cardDescription)
    cardDate.classList.add('card__date')
    cardDate.textContent = date
    cardDescription.appendChild(cardDate)
    cardTitle.classList.add('card__title')
    cardTitle.textContent = title
    cardDescription.appendChild(cardTitle)
    cardText.classList.add('card__text')
    cardText.textContent = text
    cardDescription.appendChild(cardText)
    cardSource.classList.add('card__source')
    cardSource.textContent = source
    cardItem.appendChild(cardSource)

    return cardItem
  }
}
