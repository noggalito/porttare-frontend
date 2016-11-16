(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileAddressesActionsController', ProfileAddressesActionsController);

  function ProfileAddressesActionsController(data, $ionicLoading, ProfileAddressesService, $ionicPopup, $state) {
    var pfaVm = this;
    pfaVm.addressFormData = {};
    pfaVm.messages = {};
    pfaVm.inUpdateMode = false;
    pfaVm.processAddress = processAddress;
    var addressListState = 'app.profile.addresses.index';

    init(data);

    function init(address) {
      if (address && address.id) {
        pfaVm.addressFormData = address;
        pfaVm.inUpdateMode = true;
      }
    }

    function processAddress() {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      if (pfaVm.inUpdateMode) {
        update();
      } else {
        create();
      }
    }

    function update() {
      ProfileAddressesService.updateAddresses(pfaVm.addressFormData)
        .then(onSuccess, onError);
    }

    function create() {
      ProfileAddressesService.createAddresses(pfaVm.addressFormData)
        .then(onSuccess, onError);
    }

    function onSuccess() {
      $state.go(addressListState).then(function() {
        $ionicLoading.hide();
      });
    }

    function onError(res) {
      $ionicLoading.hide();
      var message = res.error ? res.error : '{{::("globals.pleaseTryAgain"|translate)}}';
      $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    }
  }
})();
