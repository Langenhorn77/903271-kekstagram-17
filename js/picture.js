'use strict';
// Рендер фотографий
(function () {
  var pictureTemplate = document.getElementById('picture')
    .content
    .querySelector('.picture');

  var fragment = document.createDocumentFragment();

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();

    return pictureElement;
  };

  var addPicture = function (array, length) {
    for (var i = 0; i < length; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }
  };

  window.picture = {
    picturesListElement: document.querySelector('.pictures'),

    renderUserPictures: function (array, length) {
      addPicture(array, length);
      window.utils.newElement(window.picture.picturesListElement, fragment);
    },
  };
})();
