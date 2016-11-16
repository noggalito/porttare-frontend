(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileAddressesController', ProfileAddressesController);

  function ProfileAddressesController(data, $state) {
    var pfaVm = this;
    pfaVm.addresses = data.customer_addresses || []; //jshint ignore:line
    pfaVm.redirectToUpdateAddressView = redirectToUpdateAddressView;
    pfaVm.redirectToNewAddressView = redirectToNewAddressView;
    var addressStates = {
      new: 'app.profile.addresses.new',
      update: 'app.profile.addresses.update'
    };

    function redirectToUpdateAddressView(id) {
      if (id) {
        $state.go(addressStates.update, {
          id: id
        });
      }
    }

    function redirectToNewAddressView() {
      $state.go(addressStates.new);
    }
  }
})();
