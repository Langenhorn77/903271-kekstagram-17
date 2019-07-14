'use strict';
(function () {

  /* Загрузка изображения */
  var ESC_KEYCODE = 27;
  var upload = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');

  var bigPictureCancel = window.big.bigPicture.querySelector('.big-picture__cancel');
  var socialCommentCount = window.big.bigPicture.querySelector('.social__comment-count');
  var socialCommentLoader = window.big.bigPicture.querySelector('.social__comments-loader');

  window.dialog = {
    slider: document.querySelector('.effect-level'),
    clickPictureHandler: function () {
      [].forEach.call(window.filter.littlePicturesArray, function (el) {
        el.addEventListener('click', function (evt) {
          evt.preventDefault();
          var targetPhoto = evt.target.getAttribute('src');
          var indexPhoto;
          for (var j = 0; j < window.filter.pictures.length; j++) {
            if (window.filter.pictures[j].url === targetPhoto) {
              indexPhoto = j;
            }
          }
          openBigPicture(indexPhoto);
        });
      });
    },

  };
  // Открытие и закрытие окна редактирования
  var onUploadEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && !evt.target.classList.contains('text__description')) {
      closeUpload();
    }
  };

  var onPhotoEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && !evt.target.classList.contains('social__footer-text')) {
      closeBigPicture();
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

  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    openUpload();
  });

  uploadCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeUpload();
  });

  // Открытие и закрытие окна большой фотографии
  var openBigPicture = function (index) {
    window.big.showBigPicture(index);
    window.big.bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('visually-hidden');
    socialCommentLoader.classList.add('visually-hidden');
    document.addEventListener('keydown', onPhotoEscPress);
  };

  var closeBigPicture = function () {
    window.big.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPhotoEscPress);
  };

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeBigPicture();
  });
})();
