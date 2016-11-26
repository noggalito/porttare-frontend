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

    function newItem(item) {
      var promise;
      if (item && item.imagenes) {
        promise = saveWithNestedImages({
          method: 'POST',
          resourceUri: '/api/provider/items',
          item: item
        });
      } else {
        promise = CommonService.newObject(item, '/api/provider/items');
      }
      return promise.then(function (resp) {
        return resp;
      });
    }

    function getItems() {
      return CommonService.getObjects('/api/provider/items/');
    }

    function editItem(item) {
      var promise;
      if (item && item.imagenes) {
        promise = saveWithNestedImages({
          method: 'PUT',
          resourceUri: '/api/provider/items/' + item.id,
          item: item
        });
      } else {
        promise = CommonService.editObject(item, '/api/provider/items');
      }
      return promise.then(function (resp) {
        return resp.data;
      });
    }

    function deleteItem(item) {
      return $http({
        method: 'DELETE',
        url: ENV.apiHost + '/api/provider/items/' + item
      });
    }

    function saveWithNestedImages(options){
      options.item.imagenes_attributes = []; //jshint ignore:line
      angular.forEach(options.item.imagenes, function(value) {
        options.item.imagenes_attributes.push({imagen: value}); //jshint ignore:line
      });
      return Upload.upload({
        method: options.method,
        url: ENV.apiHost + options.resourceUri,
        data: options.item
      });
    }
  }
})();
