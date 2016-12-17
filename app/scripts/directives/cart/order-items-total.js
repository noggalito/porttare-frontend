(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('orderItemsTotal', orderItemsTotal);

  function orderItemsTotal() {
    var directive = {
      restrict: 'E',
      bindToController: true,
      controllerAs: 'orderItemsTotalVM',
      controller: orderItemsTotalController,
      template: '{{ orderItemsTotalVM.totalCents | priceCurrency | currency }}',
      scope: {
        orderItems: '='
      }
    };
    return directive;
  }

  function orderItemsTotalController() {
    // jshint validthis:true
    var totalCents,
        orderItemsTotalVM = this,
        orderItems = orderItemsTotalVM.orderItems;
    totalCents = orderItems.reduce(function(totalMemo, orderItem) {
      var subtotalCents = orderItem.provider_item_precio_cents * orderItem.cantidad; // jshint ignore:line
      return totalMemo + subtotalCents;
    }, 0);
    orderItemsTotalVM.totalCents = totalCents;
  }
})();
