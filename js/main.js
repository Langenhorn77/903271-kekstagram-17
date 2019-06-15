'use strict';

var MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
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
  'Юрий'
];

var PHOTO_NUMBER = 25;
var AVATAR_NUMBER = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 20;

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
      name: NAMES[getRandomIndex(0, NAMES.length - 1)]
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
      comments: []
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
