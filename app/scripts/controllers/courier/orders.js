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
      ]

    orVm.orders = [
      {
        provider_office: 'Noe Sushi Bar',
        location: {
          'lat': '-4.7921345',
          'lon': '73.4321424'
        },
        delivery_time: 60 //min
      },
      {
        provider_office: 'Pizzeria Italiana',
        location: {
          'lat': '-4.7921345',
          'lon': '72.4321424'
        },
        delivery_time: 120 //min
      },
      {
        provider_office: 'Licoreria Yoshitomo',
        location: {
          'lat': '-4.7921345',
          'lon': '71.4321424'
        },
        delivery_time: 150 //min
      }
    ];

    init();

    function init() {
      orVm.orders = orders.shipping_requests;
      orVm.totalOrders = orVm.orders.length;
    }

    $translate(transKeys).then(function (trans) {
      orVm.titleResultsFound = trans[transKeys[0]] + ' ' + orVm.totalOrders +  ' ' + trans[transKeys[1]];
    });

      orVm.totalOrders = orVm.orders.length;
    }

})();
