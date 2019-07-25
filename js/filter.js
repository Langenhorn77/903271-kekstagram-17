'use strict';

(function () {
  var NEW_PHOTOS = 10;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = '';
  var filtersForm = document.querySelector('.img-filters__form');
  var activeButtonClass = 'img-filters__button--active';

  var photoArray = [];

  var filterRules = {
    'filter-popular': function () {
      window.picture.renderUserPhotos(photoArray.slice(0, window.picture.PHOTO_NUMBER));
    },
    'filter-new': function () {
      var newPhotos = photoArray.slice();
      window.picture.renderUserPhotos(window.utils.shuffleArray(newPhotos).slice(0, NEW_PHOTOS));
    },
    'filter-discussed': function () {
      var discussedPhotos = photoArray.slice();
      discussedPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.picture.renderUserPhotos(discussedPhotos, window.picture.PHOTO_NUMBER);
    },
  };

  var removePictures = function () {
    var elements = window.picture.photoListElement.querySelectorAll('.picture');
    elements.forEach(function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var toggleButtons = function (evt) {
    var lastButton = filtersForm.querySelector('.img-filters__button--active');
    lastButton.classList.remove(activeButtonClass);
    evt.target.classList.add(activeButtonClass);
  };

  var onFilterFormChange = function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      toggleButtons(evt);
      removePictures();
      window.utils.debounce(filterRules[evt.target.id], lastTimeout, DEBOUNCE_INTERVAL);
    }
  };

  var successHandler = function (array) {
    photoArray = array.slice();
    window.picture.renderUserPhotos(photoArray.slice(0, window.picture.PHOTO_NUMBER));
    window.picture.filterImage.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: yellow;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '25px';
    node.style.color = 'black';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
  filtersForm.addEventListener('click', onFilterFormChange);
})();
