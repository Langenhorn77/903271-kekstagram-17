'use strict';

(function () {
  var HASHTAGS_NUMBER = 5;
  var HASHTAG_MAX_LENGTH = 19;
  var uploadForm = document.querySelector('.img-upload__form');
  var userInput = uploadForm.querySelector('.text__hashtags');
  var commentsInput = uploadForm.querySelector('.text__description');

  var hashtagsRules = {
    'startString': /^#/,
    'startLength': /^#?[\wа-я]/,
    'space': /[\wа-яё]+#+/
  };

  var CustomValidation = function () {
  };

  CustomValidation.prototype = {
    invalidities: [],

    checkValidity: function () {
      var result = true;
      var hashtags = userInput.value.toLowerCase().trim().split(/\s+/);
      if (!(hashtags[0] === '')) {
        if (!(hashtags.length <= HASHTAGS_NUMBER)) {
          var max = hashtags.length;
          this.addInvalidity('Нельзя указать больше 5 хэш-тегов, сейчас ' + max + '!');
          result = false;
        }

        if (window.utils.getUniqueElements(hashtags)) {
          this.addInvalidity('Хеш-теги не должны повторяться!');
          result = false;
        }

        for (var j = 0; j < hashtags.length; j++) {
          if (!hashtags[j].match(hashtagsRules.startString)) {
            this.addInvalidity('Хештег должен начинаться с символа решетки!');
            result = false;
          }

          if (!hashtags[j].match(hashtagsRules.startLength)) {
            this.addInvalidity('Хештег не может состоять только из одного символа!');
            result = false;
          }

          if (hashtags[j].length > HASHTAG_MAX_LENGTH) {
            this.addInvalidity('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
            result = false;
          }

          if (hashtags[j].match(hashtagsRules.space)) {
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

  var validationInputHandler = function (evt) {
    if (!(evt.target.value === '')) {
      evt.target.setCustomValidity('');
      var errorElement = uploadForm.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
      CustomValidation.prototype.invalidities = [];
    }
  };

  CustomValidation.prototype.getInvaliditiesForHTML = function () {
    return this.invalidities.join('<br>');
  };
  userInput.addEventListener('input', validationInputHandler);

  window.hash = {
    uploadForm: uploadForm,
    userInput: userInput,
    commentsInput: commentsInput,
    CustomValidation: CustomValidation,
  };

})();
