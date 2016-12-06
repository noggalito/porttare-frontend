(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('MenuController', MenuController);

  function MenuController(categories, $scope, CategoriesService, ErrorHandlerService, $auth) {
    var vmMenu = this;
    vmMenu.categories = categories.provider_categories;
    vmMenu.existCartActive = false;

    if ($auth.user.customer_order) {
      vmMenu.existCartActive = true;
    }

    $scope.$on('order-created', function(event, order) {
      $auth.user.customer_order = order;
      vmMenu.existCartActive = true;
    });

    $scope.$on('order-finished', function() {
      vmMenu.existCartActive = false;
    });

    $scope.$on('update-categories', function() {
      CategoriesService.getCategories()
        .then(function success(res) {
          vmMenu.categories = res.data.provider_categories;
        }, ErrorHandlerService.handleCommonErrorGET);
    });
  }
})();
