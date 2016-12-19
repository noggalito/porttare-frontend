(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('CartController', CartController);

  function CartController($auth,
                          $scope,
                          $state,
                          $translate,
                          $ionicPopup,
                          $ionicLoading,
                          APP,
                          billingAddresses,
                          deliveryAddresses,
                          ModalService,
                          CartService) {
    var cartVm = this;
    cartVm.total = 0;
    cartVm.showCheckoutModal = showCheckoutModal;
    cartVm.closeModal = closeModal;
    cartVm.runCheckout = runCheckout;
    cartVm.paymentMethods = APP.paymentMethods;
    cartVm.assignBillingAddress = assignBillingAddress;
    cartVm.assignAddress = assignAddress;
    cartVm.messages = {};
    cartVm.clearDeliveryTime = clearDeliveryTime;
    cartVm.updateOrderItem = updateOrderItem;
    cartVm.checkoutForm = {
      forma_de_pago: 'efectivo' // only method supported ATM
    };
    cartVm.openEditModal = openEditModal;
    cartVm.slickSettings = {
      infinite: false,
      lazyLoad: 'progressive',
      responsive: [
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 6
          }
        }
      ]
    };

    init();

    function init() {
      cartVm.cart = $auth.user.customer_order;
      cartVm.total = calculateTotal();
      cartVm.billingAddresses = billingAddresses;
      cartVm.addresses = deliveryAddresses;
      getDeliveryMethods();
    }

    function showCheckoutModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/cart/checkout.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      clearData();
    }

    function clearData() {
      cartVm.checkoutForm = {};
      cartVm.messages = {};
      cartVm.updateErrors = {};
      cartVm.currentItem = null;
    }

    function runCheckout() {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      CartService.checkout(cartVm.checkoutForm)
        .then(function success() {
          var categoryRoute = 'app.categories.index';
          $state.go(categoryRoute)
            .then(function () {
              $auth.user.customer_order = null;
              $ionicPopup.alert({
                title: 'Alerta',
                template: '{{::("cart.successfullyOrder"|translate)}}'
              }).then(closeModal);
              $scope.$emit('order-finished');
            });
        }, function error(res) {
          $ionicLoading.hide();
          if (res && res.errors) {
            cartVm.messages = res.errors;
          } else {
            var message = '{{::("globals.pleaseTryAgain"|translate)}}';
            $ionicPopup.alert({
              title: 'Error',
              template: message
            });
          }
        });
    }

    function assignBillingAddress(billingAddress) {
      cartVm.checkoutForm.customer_billing_address_id = billingAddress.id;
      selectItem(billingAddress, cartVm.billingAddresses);
    }

    function assignAddress(address) {
      cartVm.checkoutForm.customer_address_id = address.id;
      selectItem(address, cartVm.addresses);
    }

    function selectItem(item, items) {
      angular.forEach(items, function (elem) {
        elem.selected = false;
      });
      item.selected = true;
    }

    function calculateTotal() {
      var totalCents = 0,
        centValue = 0.01;

      if (cartVm.cart && cartVm.cart.provider_profiles) {
        angular.forEach(cartVm.cart.provider_profiles, function (provider) {
          totalCents = totalCents + getTotalValueItems(provider);
        });
      }
      return totalCents * centValue;
    }

    function getTotalValueItems(provider) {
      var total = 0;
      if(provider.customer_order_items) {
        angular.forEach(provider.customer_order_items, function (item) {
          total = total + (item.provider_item_precio_cents * item.cantidad);
        });
      }
      return total;
    }

    function clearDeliveryTime(){
      cartVm.checkoutForm.deliver_at = null;
    }

    function getDeliveryMethods(){
      var methodsKeys, translationMapping, translationKeys;
      methodsKeys = APP.deliveryMethods;
      translationMapping = methodsKeys.reduce(function (memo, method) {
        memo['cart.deliveryMethods.' + method] = method;
        return memo;
      }, {});
      translationKeys = Object.keys(translationMapping);
      $translate(translationKeys).then(function (translations) {
        var formattedMethods = translationKeys.map(function (translationKey) {
          return {
            value: translationMapping[translationKey],
            label: translations[translationKey]
          };
        });
        cartVm.formattedDeliveryMethods = formattedMethods;
      });
    }

    function openEditModal(item){
      cartVm.currentItem = angular.copy(item);
      cartVm.counterOptions = {
        limit: 1,
        cantidad: cartVm.currentItem.cantidad,
        priceCents: cartVm.currentItem.provider_item_precio_cents, // jshint ignore:line
        onChangeValue: function (data) {
          cartVm.currentItem.cantidad = data.itemsCount;
        }
      };
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/cart/order-item.html'
      });
    }

    function updateOrderItem(){
      CartService.updateItem(cartVm.currentItem).then(function(response){
        cartVm.cart = response.customer_order; //jshint ignore:line
        cartVm.total = calculateTotal();
        getDeliveryMethods();
        closeModal();
      }, function(errorResponse){
        cartVm.updateErrors = errorResponse.errors;
      });
    }
  }
})();
