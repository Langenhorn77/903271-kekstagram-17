'use strict';

// Рендер фотографий
(function () {
  var pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

  var picturesListElement = document.querySelector('.pictures');

  var fragment = document.createDocumentFragment();

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();

    return pictureElement;
  };

  var addPicture = function () {
    for (var i = 0; i < window.data.pictures.length; i++) {
      fragment.appendChild(renderPicture(window.data.pictures[i]));
    }

    picturesListElement.appendChild(fragment);
  };

  addPicture();
})();
