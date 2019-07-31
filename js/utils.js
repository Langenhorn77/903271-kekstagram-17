'use strict';

(function () {

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

    // Устранение дребезга
    debounce: function (cb, timeout, interval) {
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(cb, interval);
    },

    shuffleArray: function (array) {
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

    getUniqueElements: function (array) {
      return array.some(function (value) {
        return array.indexOf(value) !== array.lastIndexOf(value);
      });
    },
  };
})();
