(function () {
  'use strict';
  /* jshint validthis:true */
  angular
    .module('porttare.directives')
    .directive('slickProviderProfile', slickProviderProfile);

  function slickProviderProfile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/slick-provider-profile/slick-provider-profile.html',
      scope: {
        options: '='
      },
      controller: slickProviderProfileController,
      controllerAs: 'spcVm',
      bindToController: true
    };

    return directive;

    function slickProviderProfileController() {
      var spcVm = this;
      var data = spcVm.options.model.data;
      var actions = spcVm.options.model.actions;
      spcVm.customOptions = [];
      data.providers.forEach(function (provider) {
        var options = {
          bodyText: provider.nombre_establecimiento, //jshint ignore:line
          footerText: provider.horario,
          onCardClick: function () {
            if (actions && actions.onCardClick) {
              var cardData = {
                provider: provider,
                category: data.category
              };
              actions.onCardClick(cardData);
            }
          }
        };
        if (provider.imagen) {
          options.headerImage = provider.imagen;
        }
        spcVm.customOptions.push(options);
      });
    }
  }
})();
