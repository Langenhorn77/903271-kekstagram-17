'use strict';
(function () {

  /* Загрузка изображения */
  var ESC_KEYCODE = 27;
  var upload = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');


  var image = document.querySelector('.img-upload__preview');

  var effectList = document.querySelector('.effects__list');

  var slider = document.querySelector('.effect-level');
  var line = document.querySelector('.effect-level__line');
  var effectPin = document.querySelector('.effect-level__pin');
  var depth = document.querySelector('.effect-level__depth');

  var lastStyle = '';

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

  var openUpload = function () {
    uploadOverlay.classList.remove('hidden');
    slider.classList.add('hidden');
    document.addEventListener('keydown', onUploadEscPress);
  };

  var closeUpload = function () {
    uploadOverlay.classList.add('hidden');
    upload.value = '';
    document.removeEventListener('keydown', onUploadEscPress);
  };


  var PROP_NAME = 'filter';

  var FILTER_CLASSES = {
    classN: [
      'effects__preview--chrome',
      'effects__preview--sepia',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat',
    ],
    val: [
      'grayscale(',
      'sepia(',
      'invert(',
      'blur(',
      'brightness(',
    ],
    inc: [
      1,
      1,
      100,
      5,
      3,
    ],
    sum: [
      ')',
      ')',
      '%)',
      'px)',
      ')',
    ],
  };

  // Перемещение пина на 100%

  var movePinMax = function () {
    slider.classList.remove('hidden');
    effectPin.style.left = '100%';
    depth.style.width = '100%';
  };

  // Управление пином слайдера

  line.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var rect = line.getBoundingClientRect(); // узнаем размер элемента (длины слайдера)
    var a = evt.clientX - rect.left; // узнаем размер перемещения
    var x = (a / rect.width); // узнаем долю перемещения
    effectPin.style.left = x * 100 + '%';
    depth.style.width = x * 100 + '%';
    var effectLevel = x.toFixed(1);

    for (var i = 0; i < FILTER_CLASSES.classN.length; i++) {
      if (window.utils.findMatch(image, FILTER_CLASSES.classN[i])) {
        window.utils.changeStyle(image, PROP_NAME, FILTER_CLASSES.val[i] + effectLevel * FILTER_CLASSES.inc[i] + FILTER_CLASSES.sum[i]);
      }
    }
  });

  effectList.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (window.utils.findMatch(target, 'effects__preview--none')) {
      window.utils.removeStyle(image, lastStyle);
      lastStyle = '';
      slider.classList.add('hidden');
      image.style.removeProperty('filter');
    } else {
      for (var i = 0; i < FILTER_CLASSES.classN.length; i++) {
        if (window.utils.findMatch(target, FILTER_CLASSES.classN[i])) {
          window.utils.removeStyle(image, lastStyle);
          lastStyle = FILTER_CLASSES.classN[i];
          image.classList.add(lastStyle);
          window.utils.changeStyle(image, PROP_NAME, FILTER_CLASSES.val[i] + FILTER_CLASSES.inc[i] + FILTER_CLASSES.sum[i]);
          movePinMax();
        }
      }
    }
  });
})();

