'use strict';
(function () {

  /* Загрузка изображения */
  var ESC_KEYCODE = 27;
  var upload = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  // Открытие и закрытие окна редактирования
  var onUploadEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && ((!evt.target.classList.contains('text__description')) && (!evt.target.classList.contains('text__hashtags')))) {
      window.dialog.closeUpload();
    }
  };

  var openUpload = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadEscPress);
    window.dialog.slider.classList.add('hidden');
  };

  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    openUpload();
  });

  uploadCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.dialog.closeUpload();
  });

  // Закрытие окна большой фотографии

  var closeBigPicture = function () {
    window.dialog.pictureDialog.classList.add('hidden');
    document.removeEventListener('keydown', window.dialog.onPhotoEscPress);
  };

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeBigPicture();
  });

  window.dialog = {
    slider: document.querySelector('.effect-level'),
    pictureDialog: document.querySelector('.big-picture'),

    closeUpload: function () {
      uploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onUploadEscPress);
      upload.value = '';
    },

    onPhotoEscPress: function (evt) {
      if ((evt.keyCode === ESC_KEYCODE) && !evt.target.classList.contains('social__footer-text')) {
        closeBigPicture();
      }
    },
  };
})();
