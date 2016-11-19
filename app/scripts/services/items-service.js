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
      if (data && data.imagenes) {
        promise = saveWithNestedImages({
          method: 'POST',
          resourceUri: '/api/provider/items',
          data: data
        });
      } else {
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
      var promise;
      if (data && data.imagenes) {
        promise = saveWithNestedImages({
          method: 'PUT',
          resourceUri: '/api/provider/items/' + data.id,
          data: data
        });
      } else {
        CommonService.editObject(data, '/api/provider/items');
      }
      return promise.then(function (resp) {
        return resp.data;
      });
    }

    function deleteItem(data) {
      return $http({
        method: 'DELETE',
        url: ENV.apiHost + '/api/provider/items/' + data
      });
    }

    function saveWithNestedImages(options){
      options.data.imagenes_attributes = []; //jshint ignore:line
      angular.forEach(options.data.imagenes, function(value) {
        options.data.imagenes_attributes.push({imagen: value}); //jshint ignore:line
      });
      var promise = Upload.upload({
        method: options.method,
        url: ENV.apiHost + options.resourceUri,
        data: options.data
      });

      return promise;
    }
  }
})();
