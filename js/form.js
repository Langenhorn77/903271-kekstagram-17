'use strict';
(function () {
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;

  var propertyNames = [
    'filter',
    'transform',
  ];

  var FilterProperty = {
    EFFECT_NAMES: [
      'effects__preview--chrome',
      'effects__preview--sepia',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat',
    ],
    VALUES: [
      'grayscale(',
      'sepia(',
      'invert(',
      'blur(',
      'brightness(',
    ],
    NUMBERS: [
      1,
      1,
      100,
      5,
      3,
    ],
    SUMS: [
      ')',
      ')',
      '%)',
      'px)',
      ')',
    ],
  };
  var effectList = window.dialog.uploadOverlay.querySelector('.effects__list');
  var effect = window.dialog.uploadOverlay.querySelector('.effect-level');
  var line = effect.querySelector('.effect-level__line');
  var pin = effect.querySelector('.effect-level__pin');
  var depth = effect.querySelector('.effect-level__depth');

  var scale = window.dialog.uploadOverlay.querySelector('.img-upload__scale');
  var scaleControlSmaller = scale.querySelector('.scale__control--smaller');
  var scaleControlBigger = scale.querySelector('.scale__control--bigger');
  var scaleControlInput = scale.querySelector('.scale__control--value');

  var lastStyle = '';
  var newSize;
  var currentImageSize;

  // Увеличение и уменьшение изображения

  var setStyleProperty = function (arg) {
    currentImageSize = 'scale(' + (arg / MAX_SIZE) + ',' + (arg / MAX_SIZE) + ')';
    scaleControlInput.value = arg + '%';
    window.utils.changeStyle(window.dialog.image, propertyNames[1], currentImageSize);
  };

  var setCurrentSize = function (evt) {
    var lastSize = parseInt(scaleControlInput.value, 10);

    if (evt.target === scaleControlSmaller) {
      newSize = lastSize - MIN_SIZE;
      if (newSize >= MIN_SIZE) {
        setStyleProperty(newSize);
      }
    }
    if (evt.target === scaleControlBigger) {
      newSize = lastSize + MIN_SIZE;
      if (newSize <= MAX_SIZE) {
        setStyleProperty(newSize);
      }
    }
  };

  scaleControlSmaller.addEventListener('click', setCurrentSize);
  scaleControlBigger.addEventListener('click', setCurrentSize);


  // Перемещение пина на 100%

  var movePinMax = function () {
    window.dialog.slider.classList.remove('hidden');
    pin.style.left = '100%';
    depth.style.width = '100%';
  };

  pin.addEventListener('mousedown', function (evt) {
    var pinCoords = window.utils.getCoords(pin);
    var shiftX = evt.pageX - pinCoords.left;
    var sliderCoords = window.utils.getCoords(line);
    var movePin = function (ev) {
      var newLeft = ev.pageX - shiftX - sliderCoords.left;
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = line.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }
      var x = newLeft / sliderCoords.width;
      pin.style.left = depth.style.width = x * 100 + '%';

      var effectLevel = x.toFixed(2);
      for (var i = 0; i < FilterProperty.EFFECT_NAMES.length; i++) {
        if (window.utils.findMatch(window.dialog.image, FilterProperty.EFFECT_NAMES[i])) {
          window.utils.changeStyle(window.dialog.image, propertyNames[0], FilterProperty.VALUES[i] + effectLevel * FilterProperty.NUMBERS[i] + FilterProperty.SUMS[i]);
        }
      }
    };

    window.dialog.slider.addEventListener('mousemove', movePin);
    window.dialog.slider.addEventListener('mouseup', function (ev) {
      movePin(ev);
      window.dialog.slider.removeEventListener('mousemove', movePin);
    });
  });

  var filterPreviewChangeHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (window.utils.findMatch(target, 'effects__preview--none')) {
      window.utils.removeStyle(window.dialog.image, lastStyle);
      lastStyle = '';
      window.dialog.slider.classList.add('hidden');
      window.dialog.image.style.removeProperty('filter');
    } else {
      for (var i = 0; i < FilterProperty.EFFECT_NAMES.length; i++) {
        if (window.utils.findMatch(target, FilterProperty.EFFECT_NAMES[i])) {
          window.utils.removeStyle(window.dialog.image, lastStyle);
          lastStyle = FilterProperty.EFFECT_NAMES[i];
          window.dialog.image.classList.add(lastStyle);
          window.utils.changeStyle(window.dialog.image, propertyNames[0], FilterProperty.VALUES[i] + FilterProperty.NUMBERS[i] + FilterProperty.SUMS[i]);
          movePinMax();
        }
      }
    }
  };
  effectList.addEventListener('click', filterPreviewChangeHandler);

  window.form = {
    scaleControlInput: scaleControlInput,
    propertyNames: propertyNames,
    MAX_SIZE: MAX_SIZE,
  };
})();
