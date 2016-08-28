(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ItemsService', ItemsService);

  function ItemsService($http,
                        $ionicPopup,
                        $ionicLoading,
                        $ionicModal,
                        ENV) {

    var service = {
      newItem: newItem,
      getItems: getItems,
      editItem: editItem,
      modalInstance: modalInstance
    };

    return service;

    function modalInstance($scope){
      return $ionicModal.fromTemplateUrl('my-modal-item.html', {
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

    function newItem(data) {
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/items',
        data: data
      })
        .then(function (resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("item.successItemSave"|translate)}}'
          });
          return resp.data;
        },
        function error(resp) {
          if (resp.data.errors){
            $ionicPopup.alert({
              title: 'Faltan datos',
              template: '{{::("globals.pleaseTryAgain"|translate)}}'
            });
            return resp.data;
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resp.data.error ? resp.data :
                '{{::("globals.pleaseTryAgain"|translate)}}'
            });
          }
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    }

    function getItems() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/provider/items'
      })
        .then(function success(resp) {
          /*jshint camelcase:false */
          return resp.data.provider_items;
        },
        function error(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data.error ? resp.data :
              '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }

    function editItem(data) {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/items/' + data.id,
        data: data
      })
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("item.successUpdateItem"|translate)}}'
          });
          return resp.data;
        },
        function error(resp) {
          if (resp.data.errors){
            $ionicPopup.alert({
              title: 'Faltan datos',
              template: '{{::("globals.pleaseTryAgain"|translate)}}'
            });
            return resp.data;
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resp.data.error ? resp.data :
                '{{::("globals.pleaseTryAgain"|translate)}}'
            });
          }
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    }
  }
})();
