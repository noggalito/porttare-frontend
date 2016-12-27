(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CustomerOrderController', CustomerOrderController);

  function CustomerOrderController(customerOrder, ProfileAddressesService, BillingAddressesService) {
    var customerOrderVm = this;
    customerOrderVm.VAT = 0.12;

    customerOrderVm.customerOrder = customerOrder;
    customerOrderVm.customerAddress = null;
    customerOrderVm.customerBillingAdress = null;

    function init() {
      getAddress();
      getBillingAddress();
      getSummary();
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

    function getSummary(){
      if(customerOrderVm.customerOrder){
        customerOrderVm.customerOrder.subtotalVATCents = Math.round( customerOrderVm.customerOrder.subtotal_items_cents*customerOrderVm.VAT ); // jshint ignore:line
        customerOrderVm.customerOrder.totalCents = customerOrderVm.customerOrder.subtotal_items_cents + customerOrderVm.customerOrder.subtotalVATCents; // jshint ignore:line
      }
    }
  }
})();
