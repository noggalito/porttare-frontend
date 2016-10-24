(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ItemsService', ItemsService);

  function ItemsService($http,
                        Upload,
                        ENV,
                        CommonService) {

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
      return CommonService.getObjects('/api/provider/items/');
    }

    function editItem(data) {
      return CommonService.editObject(data, '/api/provider/items/');
    }

    function deleteItem(data) {
      return $http({
        method: 'DELETE',
        url: ENV.apiHost + '/api/provider/items/' + data
      });
    }
  }
})();
