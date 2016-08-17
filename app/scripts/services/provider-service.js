(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProviderService', ProviderService);

  function ProviderService($http, ENV) {

    var service = {
      createNewProvider: createNewProvider
    };

    return service;

    function createNewProvider(data) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/user/provider_profile',
        data: data
      });
    }

  }
})();
