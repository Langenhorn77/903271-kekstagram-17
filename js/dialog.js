'use strict';
(function () {

  var ESC_KEYCODE = 27;
  var upload = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var slider = document.querySelector('.effect-level');
  var imageName = 'img-upload__preview';
  var image = document.querySelector('.' + imageName);
  var fileEnding = /\.(jpe?g|png|gif)$/i;


  // Открытие окна редактирования
  var uploadEscPressHandler = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && ((!evt.target.classList.contains('text__description')) && (!evt.target.classList.contains('text__hashtags')))) {
      window.dialog.closeUpload();
    }
  };

  var openUpload = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', uploadEscPressHandler);
    slider.classList.add('hidden');
  };

  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    var file = upload.files[0];
    var fileName = file.name.toLowerCase();

    if (fileEnding.test(fileName)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        image.children[0].src = reader.result;
      });
    }
    reader.readAsDataURL(file);
    openUpload();
  });

  // Закрытие окна редактирования

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

  uploadCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeUpload();
  });

  window.dialog = {
    ESC_KEYCODE: ESC_KEYCODE,
    slider: slider,
    image: image,
    uploadOverlay: uploadOverlay,

    closeUpload: closeUpload,
  };
})();
