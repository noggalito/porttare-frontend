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
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/profile',
        data: data
      }).then(function success(res){
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

  }
})();
