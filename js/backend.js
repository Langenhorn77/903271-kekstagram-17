'use strict';

(function () {
  var TIMEOUT = 10000;
  var STATUS_CODE = 200;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var xhr;

  var useServer = function (onLoad, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка. Код: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT;
  };

  window.backend = {
    load: function (success, fail) {
      useServer(success, fail);
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '25px';
      node.style.color = 'black';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
  };
})();
