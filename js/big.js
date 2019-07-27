'use strict';

(function () {
  var COMMENTS_QUANTITY = 5;
  var imageBigPicture = window.dialog.picturePopup.querySelector('.big-picture__img > img');
  var likesCount = window.dialog.picturePopup.querySelector('.likes-count');
  var commentsCount = window.dialog.picturePopup.querySelector('.comments-count');
  var socialCaption = window.dialog.picturePopup.querySelector('.social__caption');
  var socialCommentsList = window.dialog.picturePopup.querySelector('.social__comments');
  var socialComment = window.dialog.picturePopup.querySelector('.social__comment');
  var socialCommentCount = window.dialog.picturePopup.querySelector('.social__comment-count');
  var socialCommentLoader = window.dialog.picturePopup.querySelector('.social__comments-loader');

  var renderComment = function (data) {
    for (var i = 0; i < data.comments.length; i++) {
      var commentElement = socialComment.cloneNode(true);

      commentElement.querySelector('.social__picture').src = data.comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = data.comments[i].name;
      commentElement.querySelector('.social__text').textContent = data.comments[i].message;
      socialCommentsList.appendChild(commentElement);
    }
  };

  var renderBigPicture = function (data) {
    imageBigPicture.src = data.url;
    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    socialCaption.textContent = data.description;
    socialCommentsList.innerHTML = '';
    renderComment(data);
  };

  var showCommentsHandler = function () {
    var socialCommentsHidden = window.dialog.picturePopup.querySelectorAll('.social__comment.visually-hidden');
    if (socialCommentsHidden.length > COMMENTS_QUANTITY) {
      for (var j = 0; j < COMMENTS_QUANTITY; j++) {
        socialCommentsHidden[j].classList.remove('visually-hidden');
      }
    } else {
      for (var n = 0; n < socialCommentsHidden.length; n++) {
        socialCommentsHidden[n].classList.remove('visually-hidden');
        socialCommentLoader.classList.add('visually-hidden');
      }
    }
  };

  var openBigPicture = function (data) {
    renderBigPicture(data);
    var socialComments = window.dialog.picturePopup.querySelectorAll('.social__comment');
    if (socialComments.length < COMMENTS_QUANTITY) {
      socialCommentLoader.classList.add('visually-hidden');
    }
    for (var i = COMMENTS_QUANTITY; i < socialComments.length; i++) {
      socialComments[i].classList.add('visually-hidden');
    }
    window.dialog.picturePopup.classList.remove('hidden');
    socialCommentCount.classList.add('visually-hidden');
    document.addEventListener('keydown', window.dialog.onPhotoEscPress);

    socialCommentLoader.addEventListener('click', showCommentsHandler);
  };


  window.bigPicture = {
    open: openBigPicture,
    showCommentsHandler: showCommentsHandler,
    socialCommentLoader: socialCommentLoader,
  };
})();
