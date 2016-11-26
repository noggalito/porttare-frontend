(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('OrdersController', OrdersController);

  function OrdersController(orders, $translate) {
    var orVm = this;
    orVm.totalOrders = 0;

    var transKeys = [
      'courier.labels.found',
      'courier.labels.closeToYou'
    ];

    init();

    function init() {
      orVm.orders = orders.shipping_requests;
      orVm.totalOrders = orVm.orders.length;
    }

    $translate(transKeys).then(function (trans) {
      orVm.titleResultsFound = trans[transKeys[0]] + ' ' + orVm.totalOrders +  ' ' + trans[transKeys[1]]
    });

  }
})();
