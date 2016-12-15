(function () {
  'use strict';
  /* jshint validthis:true */
  angular
    .module('porttare.directives')
    .directive('slickProviderItem', slickProviderItem);

  function slickProviderItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/slick-provider-item/slick-provider-item.html',
      scope: {
        settings: '=',
        data: '='
      },
      controller: slickProviderItemController,
      controllerAs: 'sicVm',
      bindToController: true
    };

    return directive;

    function slickProviderItemController($filter) {
      var sicVm = this;
      sicVm.centsVal = 0.01;
      sicVm.customOptions = [];

      sicVm.data.customer_order_items.forEach(function (item) {//jshint ignore:line
        var options = {
          bodyText: item.provider_item.titulo, //jshint ignore:line
          footerText: getPrice(item),
          headerButton: {
            show: false //temporarily
          }
        };

        if (item.provider_item.imagenes && item.provider_item.imagenes[0]) {//jshint ignore:line
          options.headerImage = item.provider_item.imagenes[0];//jshint ignore:line
        }
        sicVm.customOptions.push(options);
      });

      function getPrice(item) {
        var parcial = item.provider_item_precio_cents * item.cantidad; //jshint ignore:line
        var totalCents = parcial * sicVm.centsVal;
        var formatted = $filter('currency')(totalCents);
        return formatted + ' / ' + item.cantidad;
      }
    }
  }
})();
