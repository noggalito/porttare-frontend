(function () {
  'use strict';
  /* jshint validthis:true */
  angular
    .module('porttare.directives')
    .directive('slickProvider', slickProvider);

  function slickProvider() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/slick-provider/slick-provider.html',
      scope: {
        options: '='
      },
      controller: slickProviderController,
      controllerAs: 'spcVm',
      bindToController: true
    };

    return directive;

    function slickProviderController($state) {
      var spcVm = this;
      var itemsRoute = 'app.categories.provider';
      var data = spcVm.options.data;
      spcVm.goToProducts = goToProducts;
      spcVm.providers = data.providers;
      spcVm.category = data.category;

      function goToProducts(provider) {
        $state.go(itemsRoute, {
          categoryId: spcVm.category.id,
          providerId: provider.id
        });
      }
    }

  }
})();
