'use strict';

(function () {
  var COMMENTS_QUANTITY = 5;
  var END_OF_STRING = ' из ';
  var picturePopup = document.querySelector('.big-picture');
  var imageBigPicture = picturePopup.querySelector('.big-picture__img > img');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var likesCount = picturePopup.querySelector('.likes-count');
  var commentsCount = picturePopup.querySelector('.comments-count');
  var socialCaption = picturePopup.querySelector('.social__caption');
  var socialCommentsList = picturePopup.querySelector('.social__comments');
  var socialComment = picturePopup.querySelector('.social__comment');
  var socialCommentCount = picturePopup.querySelector('.social__comment-count');
  var socialCommentLoader = picturePopup.querySelector('.social__comments-loader');
  var count = 0;

  var renderComment = function (data) {
    for (var i = 0; i < data.comments.length; i++) {
      var comment = socialComment.cloneNode(true);

      comment.querySelector('.social__picture').src = data.comments[i].avatar;
      comment.querySelector('.social__picture').alt = data.comments[i].name;
      comment.querySelector('.social__text').textContent = data.comments[i].message;
      socialCommentsList.appendChild(comment);
    }
  };

  var renderBigPicture = function (data) {
    imageBigPicture.src = data.url;
    likesCount.textContent = data.likes;
    if (data.comments.length < COMMENTS_QUANTITY) {
      socialCommentCount.childNodes[0].textContent = data.comments.length + END_OF_STRING;
    } else {
      socialCommentCount.childNodes[0].textContent = COMMENTS_QUANTITY + END_OF_STRING;
    }
    commentsCount.textContent = data.comments.length;
    socialCaption.textContent = data.description;
    socialCommentsList.innerHTML = '';
    renderComment(data);
  };

  var showCommentsHandler = function () {
    var socialCommentsHidden = picturePopup.querySelectorAll('.social__comment.visually-hidden');
    if (socialCommentsHidden.length > COMMENTS_QUANTITY) {
      count++;
      for (var j = 0; j < COMMENTS_QUANTITY; j++) {
        socialCommentsHidden[j].classList.remove('visually-hidden');
      }
      socialCommentCount.childNodes[0].textContent = (COMMENTS_QUANTITY + COMMENTS_QUANTITY * count) + END_OF_STRING;
    } else {
      for (var n = 0; n < socialCommentsHidden.length; n++) {
        socialCommentsHidden[n].classList.remove('visually-hidden');
        socialCommentLoader.classList.add('visually-hidden');
      }
      socialCommentCount.childNodes[0].textContent = commentsCount.textContent + END_OF_STRING;
    }
  };

  // Открытие окна большой фотографии

  var openBigPicture = function (data) {
    renderBigPicture(data);
    var socialComments = picturePopup.querySelectorAll('.social__comment');
    if (socialComments.length < COMMENTS_QUANTITY) {
      socialCommentLoader.classList.add('visually-hidden');
    }
    for (var i = COMMENTS_QUANTITY; i < socialComments.length; i++) {
      socialComments[i].classList.add('visually-hidden');
    }
    picturePopup.classList.remove('hidden');
    document.addEventListener('keydown', photoEscPressHandler);

    socialCommentLoader.addEventListener('click', showCommentsHandler);
  };

  // Закрытие окна большой фотографии
  var photoEscPressHandler = function (evt) {
    if ((evt.keyCode === window.dialog.ESC_KEYCODE) && !evt.target.classList.contains('social__footer-text')) {
      closeBigPicture();
    }
  };

  var closeBigPicture = function () {
    picturePopup.classList.add('hidden');
    socialCommentLoader.removeEventListener('click', showCommentsHandler);
    socialCommentLoader.classList.remove('visually-hidden');
    document.removeEventListener('keydown', photoEscPressHandler);
    count = 0;
  };

  bigPictureCancel.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeBigPicture();
  });


  window.big = {
    open: openBigPicture,
    picturePopup: picturePopup,
  };
})();
