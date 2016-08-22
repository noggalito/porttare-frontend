(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProductsController', ProductsController);

  function ProductsController(ProductsService) {
    var productsVm = this;
    productsVm.query = '';
    init();

    function init(){
      ProductsService.getProducts(0).then(function(results){
        productsVm.products = results.products;
      });
    }
  }
})();
