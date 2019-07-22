'use strict';
// Рендер фотографий
(function () {

  // Перемнные для маленьких фотографий
  var PHOTO_NUMBER = 25;
  var pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');
  var fragment = document.createDocumentFragment();


  // Переменные для увеличенных фотографий
  var filterImage = document.querySelector('.img-filters');
  var picturesListElement = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();

    pictureElement.addEventListener('click', function () {
      window.bigPicture.open(picture);
    });

    return pictureElement;
  };

  var renderUserPhotos = function (array) {
    array.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });

    picturesListElement.appendChild(fragment);
  };

  window.picture = {
    PHOTO_NUMBER: PHOTO_NUMBER,
    filterImage: filterImage,
    photoListElement: picturesListElement,
    renderUserPhotos: renderUserPhotos
  };
})();
