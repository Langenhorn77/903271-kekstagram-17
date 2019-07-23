'use strict';

(function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagInput = uploadForm.querySelector('.text__hashtags');

  var reg = /^#[a-zа-яё]{1,19}$/i;

  var CustomValidation = function () {

  };

  CustomValidation.prototype = {
    invalidities: [],

    checkValidity: function () {
      var result = true;
      var hashtagArray = hashtagInput.value.trim().split(/\s+/);
      if (!(hashtagArray[0] === '')) {
        if (!(hashtagArray.length <= 5)) {
          var max = hashtagArray.length;
          this.addInvalidity('Количество хеш-тегов должно быть меньше 6, сейчас ' + max + '!');
          result = false;
        }

        if (!window.utils.testUnique(hashtagArray)) {
          this.addInvalidity('Хеш-теги не должны повторяться!');
          result = false;
        }

        for (var j = 0; j < hashtagArray.length; j++) {
          if (!hashtagArray[j].match(reg)) {
            this.addInvalidity('Один из хештегов введен неправильно!');
            result = false;
          }
        }
      }
      return result;
    },

    // Добавляем сообщение об ошибке в массив ошибок
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },

    // Получаем общий текст сообщений об ошибках
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };

  var validation = function (evt) {
    if (!(evt.target.value === '')) {
      evt.target.setCustomValidity('');
      var errorElement = uploadForm.querySelector('.error-message');
      errorElement.innerHTML = '';
      CustomValidation.prototype.invalidities = [];
    }
  };

  CustomValidation.prototype.getInvaliditiesForHTML = function () {
    return this.invalidities.join('. <br>');
  };

  uploadForm.addEventListener('submit', function (evt) {
    var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
    var isIncorrect = !inputCustomValidation.checkValidity(hashtagInput);
    if (isIncorrect) {
      var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
      hashtagInput.setCustomValidity(customValidityMessage); // Установим специальное сообщение об ошибке
      var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
      hashtagInput.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>');
      evt.preventDefault();
    }
  });
  hashtagInput.addEventListener('input', validation);

})();
