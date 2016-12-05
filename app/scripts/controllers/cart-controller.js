(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('CartController', CartController);

  function CartController($auth) {
    var cartVm = this;
    cartVm.total = 0;

    init();

    function init(){
      cartVm.cart = $auth.user.customer_order; //jshint ignore:line
      cartVm.total = calculateTotal();
    }

    function calculateTotal() {
      //jshint ignore:start
      var totalCents = 0,
          totalItems = cartVm.cart.customer_order_items.length,
          centValue = 0.01;

      angular.forEach(cartVm.cart.customer_order_items, function(item){
        totalCents = totalCents + item.provider_item_precio_cents
      });

      return totalCents * centValue;
      //jshint ignore:end
    }

  }
})();
