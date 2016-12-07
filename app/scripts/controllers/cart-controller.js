(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('CartController', CartController);

  function CartController($auth, ModalService, $scope, APP, $ionicLoading,
    BillingAddressesService, ErrorHandlerService, ProfileAddressesService,
    $q, CartService, $ionicPopup, $state) {
    var cartVm = this;
    cartVm.total = 0;
    cartVm.showCheckoutModal = showCheckoutModal;
    cartVm.closeModal = closeModal;
    cartVm.checkoutForm = {};
    cartVm.runCheckout = runCheckout;
    cartVm.paymentMethods = APP.paymentMethods;
    cartVm.deliveryMethods = APP.deliveryMethods;
    cartVm.billingAddresses = [];
    cartVm.addresses = [];
    cartVm.assignBillingAddress = assignBillingAddress;
    cartVm.assignAddress = assignAddress;
    cartVm.messages = {};
    cartVm.slickSettings = {
      responsive: [
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    };

    init();

    function init() {
      cartVm.cart = $auth.user.customer_order;
      cartVm.total = calculateTotal();
    }

    function showCheckoutModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/cart/checkout.html'
      });
      getAddresses();
    }

    function closeModal() {
      ModalService.closeModal();
      clearData();
    }

    function clearData() {
      cartVm.billingAddresses = [];
      cartVm.addresses = [];
      cartVm.checkoutForm = {};
      cartVm.messages = {};
    }

    function runCheckout() {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      CartService.checkout(cartVm.checkoutForm)
        .then(function success() {
          closeModal();
          var categoryRoute = 'app.categories.index';
          $state.go(categoryRoute)
            .then(function () {
              $auth.user.customer_order = null;
              $ionicPopup.alert({
                title: 'Alerta',
                template: '{{::("cart.successfullyOrder"|translate)}}'
              });
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

    function getAddresses() {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      var promises = [
        BillingAddressesService.getBillingAddresses(),
        ProfileAddressesService.getAddresses()
      ];
      $q.all(promises)
        .then(function success(res) {
          cartVm.billingAddresses = res[0].customer_billing_addresses;
          cartVm.addresses = res[1].customer_addresses;
          $ionicLoading.hide();
        }, ErrorHandlerService.handleCommonErrorGET);
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

  }
})();
