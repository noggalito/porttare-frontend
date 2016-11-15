(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileAddressesController', ProfileAddressesController);

  function ProfileAddressesController(data) {
    var pfaVm = this;
    pfaVm.addresses = data.customer_addresses || []; //jshint ignore:line
  }
})();
