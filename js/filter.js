'use strict';

(function () {
  var filterButtons = document.querySelectorAll('.img-filters__button');
  var popularButton = document.getElementById('filter-popular');
  var newButton = document.getElementById('filter-new');
  var discussedButton = document.getElementById('filter-discussed');
  var filterImage = document.querySelector('.img-filters');
  var activeButtonClass = 'img-filters__button--active';

  var lastTimeout = '';
  var NEW_PHOTOS = 10;
  var DEBOUNCE_INTERVAL = 500;

  window.filter = {
    pictures: [],
    littlePicturesArray: [],
    status: false,
  };
  var removePictures = function () {
    var element = window.picture.picturesListElement.querySelectorAll('.picture');
    Array.prototype.forEach.call(element, function (node) {
      node.parentNode.removeChild(node);
    });
  };

  var makePictureClickable = function () {
    var elems = window.picture.picturesListElement.querySelectorAll('.picture');
    window.filter.littlePicturesArray = Array.prototype.slice.call(elems);
    window.dialog.clickPictureHandler();
  };

  var toggleButtons = function (evt) {
    if (!evt.target.classList.contains(activeButtonClass)) {
      [].forEach.call(filterButtons, function (el) {
        el.classList.remove(activeButtonClass);
      });
      evt.target.classList.add(activeButtonClass);
    }
  };

  popularButton.addEventListener('click', function (evt) {
    toggleButtons(evt);
    removePictures();
    window.utils.debounce(showPopularPhotos, lastTimeout, DEBOUNCE_INTERVAL);
  });

  newButton.addEventListener('click', function (evt) {
    toggleButtons(evt);
    removePictures();
    window.utils.debounce(showNewPhotos, lastTimeout, DEBOUNCE_INTERVAL);
  });

  discussedButton.addEventListener('click', function (evt) {
    toggleButtons(evt);
    removePictures();
    window.utils.debounce(showDiscussedPhotos, lastTimeout, DEBOUNCE_INTERVAL);
  });

  var showPopularPhotos = function () {
    window.picture.renderUserPictures(window.filter.pictures, window.data.PHOTO_NUMBER);
    makePictureClickable();
  };

  var showNewPhotos = function () {
    var newPhotos = window.filter.pictures.slice();
    var randomPhotos = [];
    for (var j = 0; j < window.data.PHOTO_NUMBER; j++) {
      randomPhotos[j] = newPhotos[window.utils.getRandomIndex(0, window.data.PHOTO_NUMBER - 1)];
    }
    var uniquePhotos =
      randomPhotos.filter(function (it, i) {
        return randomPhotos.indexOf(it) === i;
      });
    window.picture.renderUserPictures(uniquePhotos, NEW_PHOTOS);
    makePictureClickable();
  };

  var showDiscussedPhotos = function () {
    var discussedPhotos = window.filter.pictures.slice();
    discussedPhotos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.picture.renderUserPictures(discussedPhotos, window.data.PHOTO_NUMBER);
    makePictureClickable();
  };

  var successHandler = function (array) {
    window.filter.pictures = array.slice();
    window.picture.renderUserPictures(array, window.data.PHOTO_NUMBER);
    filterImage.classList.remove('img-filters--inactive');
    makePictureClickable();
  };
  window.backend.load(successHandler, window.backend.errorHandler);
})();

