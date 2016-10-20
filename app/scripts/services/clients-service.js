(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ClientsService', ClientsService);

  function ClientsService($http,
                          ENV,
                          CommonService) {

    var service = {
      getClients: getClients,
      newClient: newClient,
      editClient: editClient,
      deleteClient: deleteClient
    };

    return service;

    function getClients() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/provider/clients'
      })
        .then(function success(resp){
          return resp.data.provider_clients; //jshint ignore:line
        });
    }

    function newClient(data) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/clients',
        data: data
      })
        .then(function success(resp){
          return resp.data.provider_client; //jshint ignore:line
        });
    }

    function editClient(data) {
      return CommonService.editObject(data, '/api/provider/clients/')
        .then(function success(resp) {
          return resp.data.provider_client; //jshint ignore:line
        });
    }

    function deleteClient(clientId) {
      return $http({
        method: 'DELETE',
        url: ENV.apiHost + '/api/provider/clients/' + clientId,
      });
    }
  }
})();
