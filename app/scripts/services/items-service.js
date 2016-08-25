(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ItemsService', ItemsService);

  function ItemsService($http,
                        $ionicPopup,
                        $ionicLoading,
                        $timeout,
                        ENV) {

    var service = {
      newItem: newItem,
      items: items,
      editItem: editItem
    };

    return service;

    function newItem(data) {
      $timeout(function() {
        $ionicLoading.show({
          template: 'Guardando...'
        });
      });
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/items',
        data: data
      })
      .then(function () {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: 'El {{::("item.item"|translate)}} se creo Correctamente!'
        });
        return true;
      })
      .catch(function (resp) {
        if (resp.data.errors){
          $ionicPopup.alert({
            title: 'Datos Incompletos',
            template: 'Intentalo nuevamente.'
          });
          return resp.data.errors;
        } else {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data.error ? resp.data :
              'Hubo un error, intentalo nuevamente.'
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
            'Hubo un error, intentalo nuevamente.'
        });
      });
    }

    function editItem(id) {
      $timeout(function() {
        $ionicLoading.show({
          template: 'Actualizando...'
        });
      });
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/items/:id',
        data: id
      })
      .then(function success() {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: 'El {{::("item.item"|translate)}} se actualizó Correctamente!'
        });
        /*jshint camelcase:false */
        return true;
      })
      .catch(function (resp) {
        if (resp.data.errors){
          $ionicPopup.alert({
            title: 'Datos Incompletos',
            template: 'Intentalo nuevamente.'
          });
          return resp.data.errors;
        } else {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data.error ? resp.data :
              'Hubo un error, intentalo nuevamente.'
          });
        }
      })
      .finally(function () {
        $ionicLoading.hide();
      });
    }
  }
})();
