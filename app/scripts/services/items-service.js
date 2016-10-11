(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ItemsService', ItemsService);

  function ItemsService($http,
                        $ionicPopup,
                        $ionicLoading,
                        $auth,
                        Upload,
                        ENV) {

    var service = {
      newItem: newItem,
      getItems: getItems,
      editItem: editItem,
      deleteItem: deleteItem
    };

    return service;

    function newItem(data) {
      var promise;

      if (data.imagen) {
        //adding nested attributes
        data.imagenes_attributes = []; //jshint ignore:line
        data.imagenes_attributes.push({imagen: data.imagen}); //jshint ignore:line
        // create Upload library promise
        promise = Upload.upload({
          url: ENV.apiHost + '/api/provider/items',
          data: data
        });
      } else {
        // default angular $http request
        promise = $http({
          method: 'POST',
          url: ENV.apiHost + '/api/provider/items',
          data: data
        });
      }

      return promise.then(function (resp) {
        return resp.data;
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
            template: resp.data ? resp.data.error :
              '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }

    function editItem(data) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/items/' + data.id,
        data: data
      })
        .then(function success(resp) {
          return resp.data.provider_item; //jshint ignore:line
        });
    }

    function deleteItem(data) {
      return $http({
        method: 'DELETE',
        url: ENV.apiHost + '/api/provider/items/' + data
      });
    }
  }
})();
