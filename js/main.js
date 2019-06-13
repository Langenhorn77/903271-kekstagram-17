'use strict';

var pictureTemplate = document.getElementById('picture')
  .content
  .querySelector('.picture');

var picturesListElement = document.querySelector('.pictures');

var fragment = document.createDocumentFragment();

var PHOTO_NUMBER = 25;
var AVATAR_NUMBER = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 20;

var PICTURES = [];
var PHOTOS = [];
var AVATARS = [];
var COMMENTS = [];

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

var getRandomIndex = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

var fillPhotoArray = function (number, array, path, type) {
  for (var j = 1; j <= number; j++) {
    var url = {
      url: path + j + '.' + type
    };
    array.push(url);
  }
};

var fillCommentArray = function (number, array) {
  for (var i = 0; i < number; i++) {
    var comment = {
      avatar: AVATARS[getRandomIndex(0, AVATARS.length - 1)].url,
      message: MESSAGE[getRandomIndex(0, MESSAGE.length - 1)],
      name: NAMES[getRandomIndex(0, NAMES.length - 1)]
    };
    array.push(comment);
  }
};

var fillArray = function (number, array, jmin, jmax) {
  for (var i = 0; i < number; i++) {
    var photo = {
      url: PHOTOS[getRandomIndex(0, PHOTOS.length - 1)].url,
      likes: getRandomIndex(MIN_LIKES, MAX_LIKES),
      comments: []
    };
    var count = getRandomIndex(jmin, jmax);
    for (var j = 0; j < count; j++) {
      photo.comments[j] = COMMENTS[getRandomIndex(0, COMMENTS.length - 1)];
    }
    array.push(photo);
  }
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
  return pictureElement;
};

var addPicture = function () {
  for (var i = 0; i < PICTURES.length; i++) {
    fragment.appendChild(renderPicture(PICTURES[i]));
  }
};


var newElement = function () {
  picturesListElement.appendChild(fragment);
};

fillPhotoArray(PHOTO_NUMBER, PHOTOS, 'photos/', 'jpg');
fillPhotoArray(AVATAR_NUMBER, AVATARS, 'img/avatar-', 'svg');
fillCommentArray(PHOTO_NUMBER, COMMENTS);
fillArray(PHOTO_NUMBER, PICTURES, MIN_COMMENTS, MAX_COMMENTS);
addPicture();
newElement();
