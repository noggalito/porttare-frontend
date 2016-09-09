(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ClientsService', ClientsService);

  function ClientsService($http,
                          $ionicPopup,
                          $ionicLoading,
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
      })
        .then(function success(resp) {
          /*jshint camelcase:false */
          return resp.data.provider_clients;
        },
        function error(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data ? resp.data.error :
              '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }

    function newClient(data) {
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/clients',
        data: data
      })
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successClientSave"|translate)}}'
          });
          return resp;
        },
        function error(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.status===401 ? resp.data.error:
              '{{::("globals.pleaseTryAgain"|translate)}}'
          });
          $ionicLoading.hide();
          return resp;
        });
    }

    function editClient(data) {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/clients/' + data.id,
        data: data
      })
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successUpdateClient"|translate)}}'
          });
          return resp;
        },
        function error(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.status==401 ? resp.data.error:
                    '{{::("globals.pleaseTryAgain"|translate)}}'
          });
          $ionicLoading.hide();
          return resp;
        });
    }
  }
})();
