(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ItemsService', ItemsService);

  function ItemsService($http,
                        $ionicPopup,
                        $ionicLoading,
                        ENV) {

    var service = {
      newItem: newItem,
      items: items,
      editItem: editItem
    };

    return service;

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
        })
        .catch(function (resp) {
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

    function items() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/provider/items'
      })
        .then(function (resp) {
          /*jshint camelcase:false */
          return resp.data.provider_items;
        })
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data.error ? resp.data :
              '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }

    function editItem(id) {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/items/:id',
        data: id
      })
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("globals.successUpdateItem"|translate)}}'
          });
          return resp.data;
        })
        .catch(function (resp) {
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
