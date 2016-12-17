(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('BillingAddressesService', BillingAddressesService);

  function BillingAddressesService(CommonService) {

    var service = {
      getBillingAddresses: getBillingAddresses,
      createBillingAddress: createBillingAddress,
      updateBillingAddress:updateBillingAddress
    };

    return service;

    function getBillingAddresses() {
      return CommonService
               .getObjects('/api/customer/billing_addresses')
               .then(function (resp){
                 return resp.customer_billing_addresses; //jshint ignore:line
               });
    }

    function createBillingAddress(billingAddress) {
      return CommonService.newObject(billingAddress, '/api/customer/billing_addresses');
    }

    function updateBillingAddress(billingAddress) {
      return CommonService.editObject(billingAddress, '/api/customer/billing_addresses/');
    }

  }
})();
