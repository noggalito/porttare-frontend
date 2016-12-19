(function(){
  'use strict';

  angular
    .module('porttare.services')
    .factory('CartService', CartService);

  function CartService($http, ENV, $q, ErrorHandlerService) {
    var service = {
      addItem: addItem,
      getCart: getCart,
      checkout : checkout,
      updateItem: updateItem
    };

    return service;

    function addItem(item) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/customer/cart/items',
        data: item
      })
        .then(function success(response){
          return response.data;
        }, function error(response){
          return $q.reject(response.data);
        });
    }

    function getCart() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/customer/cart'
      })
        .then(function success(response){
          return response.data;
        }, ErrorHandlerService.handleCommonErrorGET);
    }

    function checkout(cartData) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/customer/cart/checkout',
        data: cartData
      })
        .then(function success(response) {
          return response.data;
        }, function error(response) {
          return $q.reject(response.data);
        });
    }

    function updateItem(cartItem){
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/customer/cart/items/' + cartItem.id,
        data: cartItem
      })
        .then(function success(response) {
          return response.data;
        }, function error(response) {
          return $q.reject(response.data);
        });
    }
  }
})();
