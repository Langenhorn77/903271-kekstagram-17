'use strict';
(function () {

  /* Загрузка изображения */
  var ESC_KEYCODE = 27;
  var upload = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var picturePopup = document.querySelector('.big-picture');
  var slider = document.querySelector('.effect-level');
  var imageName = 'img-upload__preview';
  var image = document.querySelector('.' + imageName);


  // Открытие и закрытие окна редактирования
  var uploadEscPressHandler = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && ((!evt.target.classList.contains('text__description')) && (!evt.target.classList.contains('text__hashtags')))) {
      window.dialog.closeUpload();
    }
  };

  var openUpload = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', uploadEscPressHandler);
    window.dialog.slider.classList.add('hidden');
  };

  var resetForm = function () {
    upload.value = '';
    image.className = '';
    image.classList.add(imageName);
    image.style.removeProperty(window.form.propertyNames[0]);
    image.style.removeProperty(window.form.propertyNames[1]);
    window.hash.userInput.value = '';
    window.hash.commentsInput.value = '';
    window.form.scaleControlInput.value = window.form.MAX_SIZE + '%';
  };

  var closeUpload = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', uploadEscPressHandler);
    resetForm();
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
  var photoEscPressHandler = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && !evt.target.classList.contains('social__footer-text')) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    window.dialog.picturePopup.classList.add('hidden');
    window.bigPicture.socialCommentLoader.removeEventListener('click', window.bigPicture.showCommentsHandler);
    window.bigPicture.socialCommentLoader.classList.remove('visually-hidden');
    document.removeEventListener('keydown', window.dialog.photoEscPressHandler);
  };

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeBigPicture();
  });

  window.dialog = {
    ESC_KEYCODE: ESC_KEYCODE,
    slider: slider,
    image: image,
    picturePopup: picturePopup,
    uploadOverlay: uploadOverlay,
    upload: upload,

    closeUpload: closeUpload,
    photoEscPressHandler: photoEscPressHandler,
  };
})();
