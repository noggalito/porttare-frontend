(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('MenuController', MenuController);

  function MenuController(categories, $scope, CategoriesService, ErrorHandlerService) {
    var vmMenu = this;
    vmMenu.categories = categories.provider_categories;//jshint ignore:line

    $scope.$on('update-categories', function() {
      CategoriesService.getCategories()
        .then(function success(res) {
          vmMenu.categories = res.data.provider_categories; //jshint ignore:line
        }, ErrorHandlerService.handleCommonErrorGET);
    });
  }
})();
