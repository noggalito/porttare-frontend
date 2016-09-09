(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProductController', ProductController);

  function ProductController() {
    var productVm = this;

    productVm.product = {
      id: 1,
      name: 'provider1',
      description: 'restaurant',
      image: '../images/bg.png',
      more: 'more information'
    };
  }
})();
