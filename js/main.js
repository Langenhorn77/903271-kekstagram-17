'use strict';

var MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var NAMES = [
  'Артем',
  'Екатерина',
  'Алексей',
  'Василий',
  'Игорь',
  'Анна',
  'Светлана',
  'Анастасия',
  'Наталья',
  'Сергей',
  'Владимир',
  'Елена',
  'Юрий',
];

var PHOTO_NUMBER = 25;
var AVATAR_NUMBER = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 20;

/* Рендер фотографий пользователей */

var pictures = [];

var pictureTemplate = document.getElementById('picture')
  .content
  .querySelector('.picture');

var picturesListElement = document.querySelector('.pictures');

var fragment = document.createDocumentFragment();

var getRandomIndex = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};


var fillCommentArray = function () {
  var comments = [];
  for (var i = 1; i < getRandomIndex(1, AVATAR_NUMBER); i++) {
    var comment = {
      avatar: 'img/avatar-' + i + '.svg',
      message: MESSAGE[getRandomIndex(0, MESSAGE.length - 1)],
      name: NAMES[getRandomIndex(0, NAMES.length - 1)],
    };
    comments.push(comment);
  }
  return comments;
};

var addComments = function (index) {
  for (var j = 0; j < getRandomIndex(MIN_COMMENTS, MAX_COMMENTS); j++) {
    pictures[index].comments = fillCommentArray();
  }
};

var fillArray = function () {
  for (var i = 0; i < PHOTO_NUMBER; i++) {
    pictures.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomIndex(MIN_LIKES, MAX_LIKES),
      comments: [],
    });
    addComments(i);
  }
};

fillArray();

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();

  return pictureElement;
};

var addPicture = function () {
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }

  picturesListElement.appendChild(fragment);
};

addPicture();

/* Загрузка изображения */

var upload = document.getElementById('upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('.img-upload__cancel');


var image = document.querySelector('.img-upload__preview');

var noeffect = document.getElementById('effect-none');
var chrome = document.getElementById('effect-chrome');
var sepia = document.getElementById('effect-sepia');
var marvin = document.getElementById('effect-marvin');
var phobos = document.getElementById('effect-phobos');
var heat = document.getElementById('effect-heat');

var slider = document.querySelector('.effect-level');
var line = document.querySelector('.effect-level__line');
var effectPin = document.querySelector('.effect-level__pin');
var depth = document.querySelector('.effect-level__depth');

var lastStyle = '';

upload.addEventListener('change', function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
  slider.classList.add('hidden');
  effectPin.style.left = '100%';
  depth.style.width = '100%';
});

uploadCancel.addEventListener('click', function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.add('hidden');
  upload.value = '';
});


line.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  var rect = line.getBoundingClientRect();
  var a = evt.clientX - rect.left;
  var x = (a / rect.width);
  effectPin.style.left = x * 100 + '%';
  depth.style.width = x * 100 + '%';
  var effectLevel = x.toFixed(1);
  if (image.classList.contains('effects__preview--chrome')) {
    image.style.setProperty('filter', 'grayscale(' + effectLevel + ')');
  } else if (image.classList.contains('effects__preview--sepia')) {
    image.style.setProperty('filter', 'sepia(' + effectLevel + ')');
  } else if (image.classList.contains('effects__preview--marvin')) {
    image.style.setProperty('filter', 'invert(' + effectLevel * 100 + '%)');
  } else if (image.classList.contains('effects__preview--phobos')) {
    image.style.setProperty('filter', 'blur(' + effectLevel * 5 + 'px)');
  } else if (image.classList.contains('effects__preview--heat')) {
    image.style.setProperty('filter', 'brightness(' + effectLevel * 3 + ')');
  }
});

noeffect.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!(lastStyle === '')) {
    image.classList.remove(lastStyle);
  }
  lastStyle = '';
  if (!(slider.classList.contains('hidden'))) {
    slider.classList.add('hidden');
  }
  image.style.setProperty('filter', '1');
});

chrome.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!(lastStyle === '')) {
    image.classList.remove(lastStyle);
  }
  lastStyle = 'effects__preview--chrome';
  image.classList.add(lastStyle);
  slider.classList.remove('hidden');
  /* image.style.setProperty('filter', 'grayscale(' + 1 + ')');*/
  effectPin.style.left = '100%';
  depth.style.width = '100%';
});

sepia.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!(lastStyle === '')) {
    image.classList.remove(lastStyle);
  }
  lastStyle = 'effects__preview--sepia';
  image.classList.add(lastStyle);
  slider.classList.remove('hidden');
  /* image.style.setProperty('filter', 'sepia(' + 1 + ')');*/
  effectPin.style.left = '100%';
  depth.style.width = '100%';
});

marvin.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!(lastStyle === '')) {
    image.classList.remove(lastStyle);
  }
  lastStyle = 'effects__preview--marvin';
  image.classList.add(lastStyle);
  slider.classList.remove('hidden');
  /* image.style.setProperty('filter', 'invert(100%)');*/
  effectPin.style.left = '100%';
  depth.style.width = '100%';
});

phobos.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!(lastStyle === '')) {
    image.classList.remove(lastStyle);
  }
  lastStyle = 'effects__preview--phobos';
  image.classList.add(lastStyle);
  slider.classList.remove('hidden');
  /* image.style.setProperty('filter', 'blur(5px)');*/
  effectPin.style.left = '100%';
  depth.style.width = '100%';
});

heat.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (!(lastStyle === '')) {
    image.classList.remove(lastStyle);
  }
  lastStyle = 'effects__preview--heat';
  image.classList.add(lastStyle);
  slider.classList.remove('hidden');
  /* image.style.setProperty('filter', 'brightness(3)');*/
  effectPin.style.left = '100%';
  depth.style.width = '100%';
});
