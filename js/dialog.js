'use strict';
(function () {

  /* Загрузка изображения */
  var ESC_KEYCODE = 27;
  var upload = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  window.dialog = {
    slider: document.querySelector('.effect-level'),
    bigPicture: document.querySelector('.big-picture')
  };
  // Открытие и закрытие окна редактирования
  var onDialogEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && !evt.target.classList.contains('text__description')) {
      closeUpload();
    } else if ((evt.keyCode === ESC_KEYCODE) && !evt.target.classList.contains('social__footer-text')) {
      closeBigPicture();
    }
  };
  var closeUpload = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
    upload.value = '';
  };
  var openUpload = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
    window.dialog.slider.classList.add('hidden');
  };

  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    openUpload();
  });

  uploadCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeUpload();
  });

  // Открытие и закрытие окна большой фотографии
  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
  };

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeBigPicture();
  });
})();
