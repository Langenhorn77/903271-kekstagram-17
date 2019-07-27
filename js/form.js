'use strict';
(function () {
  var MIN_SIZE = 25;
  var MAX_SIZE = 100;

  var PROP_NAMES = [
    'filter',
    'transform',
  ];

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
  var effectList = document.querySelector('.effects__list');
  var line = document.querySelector('.effect-level__line');
  var pin = document.querySelector('.effect-level__pin');
  var depth = document.querySelector('.effect-level__depth');
  var lastStyle = '';

  var scale = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = scale.querySelector('.scale__control--smaller');
  var scaleControlBigger = scale.querySelector('.scale__control--bigger');
  var scaleControlInput = scale.querySelector('.scale__control--value');
  var newSize;
  var currentImageSize;

  // Увеличение и уменьшение изображения

  var setStyleProperty = function (arg) {
    currentImageSize = 'scale(' + (arg / MAX_SIZE) + ',' + (arg / MAX_SIZE) + ')';
    scaleControlInput.value = arg + '%';
    window.utils.changeStyle(window.dialog.image, PROP_NAMES[1], currentImageSize);
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
      for (var i = 0; i < FILTER_CLASSES.classN.length; i++) {
        if (window.utils.findMatch(window.dialog.image, FILTER_CLASSES.classN[i])) {
          window.utils.changeStyle(window.dialog.image, PROP_NAMES[0], FILTER_CLASSES.val[i] + effectLevel * FILTER_CLASSES.inc[i] + FILTER_CLASSES.sum[i]);
        }
      }
    };

    window.dialog.slider.addEventListener('mousemove', movePin);
    window.dialog.slider.addEventListener('mouseup', function (ev) {
      movePin(ev);
      window.dialog.slider.removeEventListener('mousemove', movePin);
    });
  });

  var onFilterPreviewChange = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (window.utils.findMatch(target, 'effects__preview--none')) {
      window.utils.removeStyle(window.dialog.image, lastStyle);
      lastStyle = '';
      window.dialog.slider.classList.add('hidden');
      window.dialog.image.style.removeProperty('filter');
    } else {
      for (var i = 0; i < FILTER_CLASSES.classN.length; i++) {
        if (window.utils.findMatch(target, FILTER_CLASSES.classN[i])) {
          window.utils.removeStyle(window.dialog.image, lastStyle);
          lastStyle = FILTER_CLASSES.classN[i];
          window.dialog.image.classList.add(lastStyle);
          window.utils.changeStyle(window.dialog.image, PROP_NAMES[0], FILTER_CLASSES.val[i] + FILTER_CLASSES.inc[i] + FILTER_CLASSES.sum[i]);
          movePinMax();
        }
      }
    }
  };
  effectList.addEventListener('click', onFilterPreviewChange);

  window.form = {
    scaleControlInput: scaleControlInput,
    PROP_NAMES: PROP_NAMES,
    MAX_SIZE: MAX_SIZE,
  };
})();
