'use strict';

(function () {

  window.utils = {

    // Проверка наличия
    findMatch: function (el, item) {
      return (el.classList.contains(item));
    },

    // Изменение стиля
    changeStyle: function (el, style, val) {
      return el.style.setProperty(style, val);
    },

    // Удаление класса
    removeStyle: function (el, style) {
      if (!(style === '')) {
        el.classList.remove(style);
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
