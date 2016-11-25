(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('BillingAddressesService', BillingAddressesService);

  function BillingAddressesService(CommonService) {

    var service = {
      getBillingAddresses: getBillingAddresses
    };

    return service;

    function getBillingAddresses() {
      return CommonService.getObjects('/api/customer/billing_addresses');
    }
  }
})();
