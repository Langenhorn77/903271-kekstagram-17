'use strict';
(function () {

  /* Загрузка изображения */
  var ESC_KEYCODE = 27;
  var upload = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  window.dialog = {
    slider: document.querySelector('.effect-level'),
  };

  // Открытие и закрытие диалогового окна
  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    openUpload();
  });

  uploadCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeUpload();
  });

  var onUploadEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && !evt.target.classList.contains('text__description')) {
      closeUpload();
    }
  };
  var closeUpload = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadEscPress);
    upload.value = '';
  };
  var openUpload = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
    window.dialog.slider.classList.add('hidden');
  };
})();
