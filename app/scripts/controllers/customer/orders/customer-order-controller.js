(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CustomerOrderController', CustomerOrderController);

  function CustomerOrderController($scope,
                                   customerOrder,
                                   ProfileAddressesService,
                                   BillingAddressesService,
                                   PusherService,
                                   CustomerOrdersService,
                                   $ionicPopup,
                                   $ionicLoading) {
    var customerOrderVm = this;
    customerOrderVm.customerOrder = customerOrder;
    customerOrderVm.cancelOrder = cancelOrder;
    init();

    function init() {
      customerOrderVm.customerBillingAddress = getBillingAddress();
      getSumaryProvider();

      $scope.$on('$ionicView.enter', wsSubscribe);
      $scope.$on('$ionicView.leave', wsUnsubscribe);
    }

    function wsSubscribe() {
      PusherService.load().then(function () {
        var orderId = customerOrderVm.customerOrder.id;
        PusherService.listen(
          'private-customer_order.' + orderId,
          'update',
          customerOrderUpdated
        );
      });
    }

    function wsUnsubscribe() {
      var orderId = customerOrderVm.customerOrder.id;
      PusherService.unlisten('private-customer_order.' + orderId);
    }

    function customerOrderUpdated(response) {
      $scope.$apply(function(){
        customerOrderVm.customerOrder = response.customer_order; // jshint ignore:line
        getSumaryProvider();
      });
    }

    function getBillingAddress(){
      return customerOrderVm.customerOrder.customer_billing_address; // jshint ignore:line
    }

    function getSumaryProvider(){
      angular.forEach(customerOrderVm.customerOrder.provider_profiles, function (provider) {// jshint ignore:line
        provider.subTotalCentsOrderProvider = getSubTotalCentsProviderItems(provider);
        provider.totalCentsOrderProvider = provider.subTotalCentsOrderProvider+ provider.customer_order_delivery.shipping_fare_price_cents;// jshint ignore:line
      });
    }

    function getSubTotalCentsProviderItems(provider) {
      return provider.customer_order_items.reduce(function (total, item) { // jshint ignore:line
        total += (item.provider_item_precio_cents * item.cantidad); // jshint ignore:line
        return total;
      }, 0);
    }

    function cancelOrder(){
      var customerOrderId=customerOrderVm.customerOrder.id;
      var customerOrderProviderProfiles=customerOrderVm.customerOrder.provider_profiles; // jshint ignore:line
      var cont=0;
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      angular.forEach(customerOrderProviderProfiles,function(provider){
        CustomerOrdersService.cancelCustomerOrder(customerOrderId,provider.customer_order_delivery.id).then(function (resp){ // jshint ignore:line
          cont++;
          if (cont === customerOrderProviderProfiles.length){
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Éxito',
              template: '{{::("order.cancel.success"|translate)}}'
            });
          }
        });
      });
    }

  }
})();
