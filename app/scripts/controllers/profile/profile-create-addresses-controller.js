(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileCreateAddressesController', ProfileCreateAddressesController);

  function ProfileCreateAddressesController(ProfileAddressesService) {
    var pfaVm = this;
    pfaVm.addressFormData = {};
    pfaVm.messages = {};
    pfaVm.processAddress = processAddress;

    function processAddress() {
      var options = {
        acionName: 'create',
        data: pfaVm.addressFormData
      };
      ProfileAddressesService.runAction(options);
    }
  }
})();
