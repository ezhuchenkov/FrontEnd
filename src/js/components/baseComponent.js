/* eslint-disable class-methods-use-this */
import { domElements } from '../constants/config'

export default class BaseComponent {
  constructor() {
    this.domElements = domElements
  }

  /**
   * Добавление слушателя на элемент
   * @param  {node} el - элемент DOM
   * @param  {string} ev - браузерное событие
   * @param  {function} fn - исполняемая функция
   */
  addlistener(el, ev, fn) {
    el.addEventListener(ev, fn)
  }

  /**
   * Удаление слушателя с элемента
   * @param  {node} el - элемент DOM
   * @param  {string} ev - браузерное событие
   * @param  {function} fn - исполняемая функция
   */
  removelistener(el, ev, fn) {
    el.removeEventListener(ev, fn)
  }
}
