(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileAddressesController', ProfileAddressesController);

  function ProfileAddressesController(data, $state) {
    var pfaVm = this;
    pfaVm.addresses = data.customer_addresses || []; //jshint ignore:line

    pfaVm.processAddress = processAddress;

    function processAddress(id) {
      if (id) {
        $state.go('app.profile.addresses.update', {
          id: id
        });
      } else {
        $state.go('app.profile.addresses.new');
      }
    }
  }
})();
