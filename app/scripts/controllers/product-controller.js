(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProductController', ProductController);

  function ProductController() {
    var productVm = this;
    productVm.more = false;

    productVm.product = {
      id: 1,
      name: 'provider1',
      description: 'restaurant',
      image: '../images/bg.png',
      more: 'more information',
      amount: 0,
      unit_price: 2.5,
      total_price: 0
    };

    productVm.show_more = function () {
      if(productVm.more){
        productVm.more = false;
      }else{
        productVm.more = true;
      }
    };

    productVm.updatePrice = function (opt) {
      if(opt === 'add'){
        productVm.product.amount ++;
      }else if(opt === 'remove'){
        productVm.product.amount --;
      }
      productVm.product.total_price = (productVm.product.amount * productVm.product.unit_price);
    };
  }
})();
