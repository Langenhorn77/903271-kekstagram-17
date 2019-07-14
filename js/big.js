'use strict';

(function () {
  window.big = {
    bigPicture: document.querySelector('.big-picture'),

    showBigPicture: function (j) {
      imageBigPicture[0].src = window.filter.pictures[j].url;
      likesCount.textContent = window.filter.pictures[j].likes;
      commentsCount.textContent = window.filter.pictures[j].comments.length;
      socialCaption.textContent = window.filter.pictures[j].description;
      socialCommentsList.innerHTML = '';
      renderComment(j);
    },
  };

  var imageBigPicture = window.big.bigPicture
    .querySelector('.big-picture__img')
    .getElementsByTagName('img');
  var likesCount = window.big.bigPicture.querySelector('.likes-count');
  var commentsCount = window.big.bigPicture.querySelector('.comments-count');
  var socialCaption = window.big.bigPicture.querySelector('.social__caption');
  var socialCommentsList = window.big.bigPicture.querySelector('.social__comments');
  var socialComment = window.big.bigPicture.querySelector('.social__comment');

  var renderComment = function (j) {
    for (var i = 0; i < window.filter.pictures[j].comments.length; i++) {
      var commentElement = socialComment.cloneNode(true);

      commentElement.querySelector('.social__picture').src = window.filter.pictures[j].comments[i].avatar;
      commentElement.querySelector('.social__text').textContent = window.filter.pictures[j].comments[i].message;
      socialCommentsList.appendChild(commentElement);
    }
  };
})();
