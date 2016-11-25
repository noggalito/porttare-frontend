(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('BillingAddressesController', BillingAddressesController);

  function BillingAddressesController(BillingAddressesService,
                                      $ionicPopup,
                                      $ionicLoading) {
    var billingAddressesVm= this;
    getBillingAddresses();

    function getBillingAddresses() {
      BillingAddressesService.getBillingAddresses().then(function(results){
        billingAddressesVm.billingAddresses = results.customer_billing_addresses; //jshint ignore:line
      }, function error(resp) {
        var msg= resp.data.error ? resp.data.error : '{{::("globals.pleaseTryAgain"|translate)}}';
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Error',
          template: msg
        });
      });
    }
  }
})();
