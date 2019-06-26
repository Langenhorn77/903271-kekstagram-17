'use strict';

(function () {

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

  window.data = {
    pictures: [],

    fillCommentArray: function () {
      var comments = [];
      for (var i = 1; i < window.utils.getRandomIndex(1, AVATAR_NUMBER); i++) {
        var comment = {
          avatar: 'img/avatar-' + i + '.svg',
          message: MESSAGE[window.utils.getRandomIndex(0, MESSAGE.length - 1)],
          name: NAMES[window.utils.getRandomIndex(0, NAMES.length - 1)],
        };
        comments.push(comment);
      }
      return comments;
    },

    addComments: function (index) {
      for (var j = 0; j < window.utils.getRandomIndex(MIN_COMMENTS, MAX_COMMENTS); j++) {
        window.data.pictures[index].comments = window.data.fillCommentArray();
      }
    },

    fillArray: function () {
      for (var i = 0; i < PHOTO_NUMBER; i++) {
        window.data.pictures.push({
          url: 'photos/' + (i + 1) + '.jpg',
          likes: window.utils.getRandomIndex(MIN_LIKES, MAX_LIKES),
          comments: [],
        });
        window.data.addComments(i);
      }
    },
  };
  window.data.fillArray();
})();
