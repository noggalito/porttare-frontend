(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('CourierService', CourierService);

  function CourierService($http, $q, ENV) {

    var service = {
      createNewCourier: createNewCourier,
      shippingRequests: shippingRequests
    };

    return service;

    function createNewCourier(data) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/courier/profile',
        data: data
      }).then(function success(res){
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function shippingRequests() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/courier/shipping_requests'
      }).then(function success(res){
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

  }
})();
