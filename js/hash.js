'use strict';

(function () {
  var HASHTAGS_NUMBER = 5;
  var HASHTAG_MAX_LENGTH = 19;
  var uploadForm = document.querySelector('.img-upload__form');
  var hashtagInput = uploadForm.querySelector('.text__hashtags');

  var hashtagsRules = {
    'startString': /^#/,
    'startLength': /^#?\w/,
    'space': /\w+#+/
  };

  var CustomValidation = function () {
  };

  CustomValidation.prototype = {
    invalidities: [],

    checkValidity: function () {
      var result = true;
      var hashtagArray = hashtagInput.value.toLowerCase().trim().split(/\s+/);
      if (!(hashtagArray[0] === '')) {
        if (!(hashtagArray.length <= HASHTAGS_NUMBER)) {
          var max = hashtagArray.length;
          this.addInvalidity('Нельзя указать больше 5 хэш-тегов, сейчас ' + max + '!');
          result = false;
        }

        if (window.utils.getUniqueElements(hashtagArray)) {
          this.addInvalidity('Хеш-теги не должны повторяться!');
          result = false;
        }

        for (var j = 0; j < hashtagArray.length; j++) {
          if (!hashtagArray[j].match(hashtagsRules.startString)) {
            this.addInvalidity('Хештег должен начинаться с символа решетки!');
            result = false;
          }

          if (!hashtagArray[j].match(hashtagsRules.startLength)) {
            this.addInvalidity('Хештег не может состоять только из одного символа!');
            result = false;
          }

          if (hashtagArray[j].length > HASHTAG_MAX_LENGTH) {
            this.addInvalidity('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
            result = false;
          }

          if (hashtagArray[j].match(hashtagsRules.space)) {
            this.addInvalidity('Хеш-теги разделяются пробелами!');
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
    return this.invalidities.join('<br>');
  };

  uploadForm.addEventListener('submit', function (evt) {
    var inputCustomValidation = new CustomValidation(); // Создадим объект CustomValidation
    var isIncorrect = !inputCustomValidation.checkValidity(hashtagInput);
    if (isIncorrect) {
      var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
      hashtagInput.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>');
      evt.preventDefault();
    }
  });
  hashtagInput.addEventListener('input', validation);

})();
