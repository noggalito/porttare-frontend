(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('CartController', CartController);

  function CartController($auth) {
    var cartVm = this;
    cartVm.hola = 1;

    init();

    function init(){
      cartVm.cart = $auth.user.customer_order; //jshint ignore:line
    }
  }
})();
