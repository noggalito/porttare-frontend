(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CustomerOrderController', CustomerOrderController);

  function CustomerOrderController(customerOrder, ProfileAddressesService, BillingAddressesService) {
    var customerOrderVm = this;
    customerOrderVm.customerOrder = customerOrder;
    customerOrderVm.customerAddress = null;
    customerOrderVm.customerBillingAdress = null;

    function init() {
      getAddress();
      getBillingAddress();
    }

    init();

    function getAddress(){
      var customerAddressId = customerOrderVm.customerOrder.customer_address_id; // jshint ignore:line

      if(customerAddressId){
        ProfileAddressesService
          .getAddress(customerAddressId)
            .then(
              function(res){
                customerOrderVm.customerAddress = res;
              }
            );
      }
    }

    function getBillingAddress(){
      var customerBillingAddressId = customerOrderVm.customerOrder.customer_billing_address_id; // jshint ignore:line

      if(customerBillingAddressId){
        BillingAddressesService
          .getBillingAddress(customerBillingAddressId)
            .then(
              function(res){
                customerOrderVm.customerBillingAddress = res;
              }
            );
      }
    }
  }
})();
