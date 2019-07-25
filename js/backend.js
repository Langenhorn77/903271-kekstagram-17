'use strict';

(function () {
  var TIMEOUT = 20000;
  var STATUS_CODE = 200;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
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

    save: function (success, fail, formData) {
      useServer(success, fail);
      xhr.open('POST', URL_SAVE);
      xhr.send(formData);
    }
  };
})();
