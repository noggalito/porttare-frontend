(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProfileAddressesService', ProfileAddressesService);

  function ProfileAddressesService(ENV, $http, $q) {

    var service = {
      getAddresses: getAddresses,
      getAddress: getAddress,
      updateAddresses: updateAddresses,
      createAddresses: createAddresses
    };

    return service;

    function getAddresses() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/customer/addresses'
      }).then(function success(res) {
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function updateAddresses(addressUpdated) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/customer/addresses/' + addressUpdated.id,
        data: addressUpdated
      }).then(function success(res) {
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function createAddresses(newAddress) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/customer/addresses',
        data: newAddress
      }).then(function success(res) {
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function getAddress(id) {
      return $q(function (resolve, reject) {
        getAddresses().then(function success(res) {
          var selectedAddress = filterAddresses(res, id);
          resolve(selectedAddress);
        }, reject);
      });
    }

    function filterAddresses(res, id) {
      var address = null;
      var parsedId = parseInt(id);
      if (res && res.customer_addresses) { //jshint ignore:line
        angular.forEach(res.customer_addresses, function (elem) { //jshint ignore:line
          if (elem.id === parsedId) {
            address = elem;
          }
        });
      }
      return address;
    }
  }
})();
