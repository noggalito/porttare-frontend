(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ClientsService', ClientsService);

  function ClientsService($http,
                          ENV) {

    var service = {
      getClients: getClients,
      newClient: newClient,
      editClient: editClient
    };

    return service;

    function getClients() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/provider/clients'
      });
    }

    function newClient(data) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/clients',
        data: data
      });
    }

    function editClient(data) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/clients/' + data.id,
        data: data
      });
    }
  }
})();
