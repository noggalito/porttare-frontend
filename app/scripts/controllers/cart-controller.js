(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('CartController', CartController);

  function CartController($auth, ModalService, $scope) {
    var cartVm = this;
    cartVm.total = 0;
    cartVm.showCheckoutModal = showCheckoutModal;
    cartVm.closeModal = closeModal;
    cartVm.checkoutForm = {};

    init();

    function init(){
      cartVm.cart = $auth.user.customer_order; //jshint ignore:line
      cartVm.total = calculateTotal();
    }

    function showCheckoutModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/cart/checkout.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      cartVm.checkoutForm.deliver_at = null;//jshint ignore:line
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
