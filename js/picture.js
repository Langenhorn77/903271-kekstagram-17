'use strict';
// Рендер фотографий
(function () {

  // Перемнные для маленьких фотографий
  var CONTENT_NUMBER = 25;
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var fragment = document.createDocumentFragment();


  // Переменные для увеличенных фотографий
  var ListItem = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var pictureItem = pictureTemplate.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = picture.url;
    pictureItem.querySelector('.picture__likes').textContent = picture.likes;
    pictureItem.querySelector('.picture__comments').textContent = picture.comments.length.toString();

    pictureItem.addEventListener('click', function () {
      window.big.open(picture);
    });

    return pictureItem;
  };

  var renderContent = function (array) {
    array.forEach(function (item) {
      fragment.appendChild(renderPicture(item));
    });

    ListItem.appendChild(fragment);
  };

  window.picture = {
    CONTENT_NUMBER: CONTENT_NUMBER,
    ListItem: ListItem,
    renderContent: renderContent
  };
})();
