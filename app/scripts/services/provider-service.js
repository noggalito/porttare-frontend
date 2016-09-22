(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProviderService', ProviderService);

  function ProviderService($http, $q, ENV) {

    var service = {
      createNewProvider: createNewProvider
    };

    return service;

    function createNewProvider(data) {
      var defer = $q.defer();
      $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/profile',
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
