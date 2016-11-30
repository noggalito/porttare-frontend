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

    function slickProviderController() {
      var spcVm = this;
      var data = spcVm.options.model.data;
      var actions = spcVm.options.model.actions;
      spcVm.cardClick = cardClick;
      spcVm.providers = data.providers;

      function cardClick(provider) {
        if (actions && actions.onCardClick) {
          var cardData = {
            provider: provider,
            category: data.category
          };
          actions.onCardClick(cardData);
        }
      }
    }

  }
})();
