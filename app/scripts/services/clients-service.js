(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ClientsService', ClientsService);

  function ClientsService($http,
                        $ionicPopup,
                        $ionicLoading,
                        $ionicModal,
                        $q,
                        ENV) {

    var service = {
      getClients: getClients,
      newClient: newClient,
      editClient: editClient,
      modalInstance: modalInstance
    };

    return service;

    function modalInstance($scope){
      return $ionicModal.fromTemplateUrl('templates/client/new-edit.html', {
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: false,
        hardwareBackButtonClose: false
      })
        .then(function(modal){
          return modal;
        },
        function error(){
          $ionicPopup.alert({
            title: 'Error',
            template: '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }

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
      var deferred = $q.defer();
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/clients',
        data: data
      })
        .then(function (resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successClientSave"|translate)}}'
          });
          deferred.resolve(resp);
        },
        function error(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.status===401 ? resp.data.error:
              '{{::("globals.pleaseTryAgain"|translate)}}'
          });
          $ionicLoading.hide();
          deferred.reject(resp);
        });
      return deferred.promise;
    }

    function editClient(data) {
      var deferred = $q.defer();
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      $http({
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
          deferred.resolve(resp);
        },
        function error(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.status===401 ? resp.data.error:
                    '{{::("globals.pleaseTryAgain"|translate)}}'
          });
          $ionicLoading.hide();
          deferred.reject(resp);
        });
      return deferred.promise;
    }
  }
})();
