(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('BillingAddressesService', BillingAddressesService);

  function BillingAddressesService(CommonService, $http, $q, ENV) {

    var service = {
      getBillingAddresses: getBillingAddresses,
      createBillingAddress: createBillingAddress,
      updateBillingAddress:updateBillingAddress
    };

    return service;

    function getBillingAddresses() {
      return CommonService.getObjects('/api/customer/billing_addresses');
    }

    function createBillingAddress(billingAddress) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/customer/billing_addresses',
        data:billingAddress
      }).then(function success(res){
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function updateBillingAddress(billingAddress) {
      return CommonService.editObject(billingAddress, '/api/customer/billing_addresses/');
    }

  }
})();
