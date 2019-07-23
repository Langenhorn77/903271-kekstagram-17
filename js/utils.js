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

  shuffleArray: function shuffle(array) {
    var j;
    var x;
    var i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  },

  testUnique: function (array) {
    var l = array.length;
    for (var i = 0; i < l - 1; i++) {
      for (var j = i + 1; j < l; j++) {
        if (array[i] === array[j]) {
          return false;
        }
      }
    }
    return true;
  },
};
