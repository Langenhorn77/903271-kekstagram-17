'use strict';

(function () {
  // Создание окна результата загрузки фотографии
  var createResultPopup = function (result) {
    var fragment = document.createDocumentFragment();
    var resultTemplate = document.querySelector('#' + result)
      .content
      .querySelector('.' + result);
    var resultItem = resultTemplate.cloneNode(true);
    fragment.appendChild(resultItem);

    window.dialog.closeUpload();
    window.big.picturePopup.parentNode.insertBefore(fragment, window.big.picturePopup);
  };


  // Успех загрузки
  var sendFormSuccessHandler = function () {
    createResultPopup('success');

    var successWindow = document.querySelector('.success');
    var successButton = successWindow.querySelector('.success__button');
    var closeSuccessWindow = function () {
      successWindow.remove();
    };
    document.addEventListener('click', closeSuccessWindow);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.dialog.ESC_KEYCODE) {
        closeSuccessWindow();
      }
    });
    successButton.addEventListener('click', closeSuccessWindow);
  };


  // Ошибка загрузки
  var sendFormErrorHandler = function () {
    createResultPopup('error');

    var errorWindow = document.querySelector('.error');
    var errorButton = errorWindow.querySelector('.error__button');
    var closeErrorWindow = function () {
      errorWindow.remove();
    };
    document.addEventListener('click', closeErrorWindow);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.dialog.ESC_KEYCODE) {
        closeErrorWindow();
      }
    });
    errorButton.addEventListener('click', closeErrorWindow);
  };

  window.hash.uploadForm.addEventListener('submit', function (evt) {
    var inputCustomValidation = new window.hash.CustomValidation(); // Создадим объект CustomValidation
    var isIncorrect = !inputCustomValidation.checkValidity(window.hash.userInput);
    if (isIncorrect) {
      var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
      window.hash.userInput.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>');
      evt.preventDefault();
    } else {
      evt.preventDefault();
      window.backend.save(sendFormSuccessHandler, sendFormErrorHandler, new FormData(window.hash.uploadForm));
    }
  });

})();
