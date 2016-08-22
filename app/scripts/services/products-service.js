'use strict';

angular
  .module('porttare.services')
  .factory('ProductsService', ProductsService);

function ProductsService($http, ENV, $ionicPopup) {
  var service = {
    getProducts: getProducts
  };

  return service;

  function getProducts(page) {
    return $http({
      method: 'GET',
      url: ENV.apiHost + '/api/products',
      params: {page: page}
    }).then(function(results){
      return results.data;
    }, function(){
      $ionicPopup.alert({
        title: 'Error',
        template: 'Hubo un error, intentalo nuevamente.'
      });
    });
  }
}
