'use strict';

window.utils = {

  // Функция случайного значения
  getRandomIndex: function (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  },

  // Проверка наличия
  findMatch: function (el, classN) {
    return (el.classList.contains(classN));
  },

  // Изменение стиля
  changeStyle: function (el, styleN, val) {
    return el.style.setProperty(styleN, val);
  },

  // Удаление класса
  removeStyle: function (el, styleN) {
    if (!(styleN === '')) {
      el.classList.remove(styleN);
    }
  },

  // Получение координат элемента
  getCoords: function (el) {
    return el.getBoundingClientRect();
  },

  // Функия создания нового элемента
  newElement: function (el, arg) {
    return el.appendChild(arg);
  },

  // Устранение дребезга
  debounce: function (cb, timeout, interval) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(cb, interval);
  },
};
