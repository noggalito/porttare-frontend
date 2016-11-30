'use strict';

angular
  .module('porttare.services')
  .factory('ProductsService', ProductsService);

function ProductsService($http, ENV, $ionicPopup, $q) {
  var service = {
    getProducts: getProducts,
    getProduct: getProduct,
    getProviderProducts: getProviderProducts
  };

  return service;

  function getProducts(params) {
    return $http({
      method: 'GET',
      url: ENV.apiHost + '/api/products',
      params: params
    }).then(function(results){
      return results.data;
    });
  }

  function getProviderProducts(paramsData) {
    return $http({
      method: 'GET',
      url: ENV.apiHost + '/api/categories/' + paramsData.categoryId + '/providers/' + paramsData.providerId
    }).then(function success(res) {
      return res.data;
    }, function error(res) {
      return $q.reject(res.data);
    });
  }

  function getProduct(paramsData) {
    return $q(function (resolve, reject) {
      var params = {
        categoryId: paramsData.categoryId,
        providerId: paramsData.providerId
      };

      getProviderProducts(params).then(function success(res) {
        var selectedProduct = filterProducts(res, paramsData.id);
        resolve(selectedProduct);
      }, reject);
    });
  }

  function filterProducts(res, id) {
      var product = null;
      var parsedId = parseInt(id);
      if (res && res.provider_profile && res.provider_profile.provider_items) { //jshint ignore:line
        angular.forEach(res.provider_profile.provider_items, function (elem) { //jshint ignore:line
          if (elem.id === parsedId) {
            product = elem;
          }
        });
      }
      return product;
  }
}
