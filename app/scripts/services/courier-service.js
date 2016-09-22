(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('CourierService', CourierService);

  function CourierService($http, $q, ENV) {

    var service = {
      createNewCourier: createNewCourier
    };

    return service;

    function createNewCourier(data) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: ENV.apiHost + '/api/courier/profile',
        data: data
      }).then(function success(res){
        defer.resolve(res.data);
      }, function error(res) {
        defer.reject(res.data);
      });
      return defer.promise;
    }

  }
})();
