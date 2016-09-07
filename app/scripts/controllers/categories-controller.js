(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CategoriesController', CategoriesController);

  function CategoriesController(data) {

    var categoryVm = this;
    categoryVm.categories = data.categories;
  }
})();
