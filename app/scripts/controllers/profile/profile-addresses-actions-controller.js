(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileAddressesActionsController', ProfileAddressesActionsController);

  function ProfileAddressesActionsController(data) {
    var pfaVm = this;
    pfaVm.addressFormData = data;
    pfaVm.messages = {};
  }
})();
