(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ItemService', ItemService);

  function ItemService($http, ENV) {

    var service = {
      newItem: newItem,
      items: items,
      editItem: editItem
    };

    return service;

    function newItem(data) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/items',
        data: data
      });
    }

    function items() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/provider/items'
      });
    }

    function editItem(id) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/items/:id',
        data: id
      })
    }

  }
})();