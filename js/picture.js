'use strict';
// Рендер фотографий
(function () {

  // Перемнные для маленьких фотографий
  var pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');
  var fragment = document.createDocumentFragment();

  // Переменные для увеличенных фотографий
  var imageBigPicture = window.dialog.pictureDialog
    .querySelector('.big-picture__img')
    .getElementsByTagName('img');
  var likesCount = window.dialog.pictureDialog.querySelector('.likes-count');
  var commentsCount = window.dialog.pictureDialog.querySelector('.comments-count');
  var socialCaption = window.dialog.pictureDialog.querySelector('.social__caption');
  var socialCommentsList = window.dialog.pictureDialog.querySelector('.social__comments');
  var socialComment = window.dialog.pictureDialog.querySelector('.social__comment');
  var socialCommentCount = window.dialog.pictureDialog.querySelector('.social__comment-count');
  var socialCommentLoader = window.dialog.pictureDialog.querySelector('.social__comments-loader');


  var renderComment = function (j) {
    for (var i = 0; i < window.picture.photoArray[j].comments.length; i++) {
      var commentElement = socialComment.cloneNode(true);

      commentElement.querySelector('.social__picture').src = window.picture.photoArray[j].comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = window.picture.photoArray[j].comments[i].name;
      commentElement.querySelector('.social__text').textContent = window.picture.photoArray[j].comments[i].message;
      socialCommentsList.appendChild(commentElement);
    }
  };

  var renderBigPicture = function (j) {
    imageBigPicture[0].src = window.picture.photoArray[j].url;
    likesCount.textContent = window.picture.photoArray[j].likes;
    commentsCount.textContent = window.picture.photoArray[j].comments.length;
    socialCaption.textContent = window.picture.photoArray[j].description;
    socialCommentsList.innerHTML = '';
    renderComment(j);
  };


  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();

    return pictureElement;
  };

  var openBigPicture = function (e) {
    var targetPhoto = e.target.getAttribute('src');
    var indexPhoto;
    for (var j = 0; j < window.picture.photoArray.length; j++) {
      if (window.picture.photoArray[j].url === targetPhoto) {
        indexPhoto = j;
      }
    }
    renderBigPicture(indexPhoto);
    window.dialog.pictureDialog.classList.remove('hidden');
    socialCommentCount.classList.add('visually-hidden');
    socialCommentLoader.classList.add('visually-hidden');
    document.addEventListener('keydown', window.dialog.onPhotoEscPress);
  };


  var addPicture = function (array, length) {
    for (var i = 0; i < length; i++) {
      var elem = fragment.appendChild(renderPicture(array[i]));
      elem.addEventListener('click', openBigPicture);
    }
  };

  var successHandler = function (array) {
    window.picture.photoArray = array.slice();
    window.picture.renderUserPictures(array, window.data.PHOTO_NUMBER);
    window.picture.filterImage.classList.remove('img-filters--inactive');
  };
  window.backend.load(successHandler, window.backend.errorHandler);

  window.picture = {
    filterImage: document.querySelector('.img-filters'),
    photoArray: [],
    picturesListElement: document.querySelector('.pictures'),

    renderUserPictures: function (array, length) {
      addPicture(array, length);
      window.utils.newElement(window.picture.picturesListElement, fragment);
    },
  };
})();
