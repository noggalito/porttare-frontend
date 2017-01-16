(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileAddressesController', ProfileAddressesController);

  function ProfileAddressesController(customerAddresses, $state, $location) {
    var pfaVm = this,
      currentTab = $location.path().split('/')[3];
    pfaVm.tab = currentTab;
    pfaVm.addresses = customerAddresses || [];
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
