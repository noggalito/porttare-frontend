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
    customerOrderVm.addressLine1 = null;
    customerOrderVm.addressLine2 = null;

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

                customerOrderVm.addressLine1 = getAddressLine1();
                customerOrderVm.addressLine2 = getAddressLine2();
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

    function getAddressLine1(){
      var line1 = '';
      if(
          customerOrderVm.customerAddress &&
          ( customerOrderVm.customerAddress.parroquia || customerOrderVm.customerAddress.barrio )
        ){
        line1 += customerOrderVm.customerAddress.parroquia ? ( customerOrderVm.customerAddress.parroquia + ', ' ) :'';
        line1 += customerOrderVm.customerAddress.barrio ? customerOrderVm.customerAddress.barrio : '';
      }

      return line1;
    }

    function getAddressLine2(){
      var line2 = '';
      if(
          customerOrderVm.customerAddress &&
          ( customerOrderVm.customerAddress.ciudad || customerOrderVm.customerAddress.codigo_postal ) // jshint ignore:line
        ){
        line2 += customerOrderVm.customerAddress.ciudad ? ( customerOrderVm.customerAddress.ciudad + ', ' ) :'';
        line2 += customerOrderVm.customerAddress.codigo_postal ? customerOrderVm.customerAddress.codigo_postal : ''; // jshint ignore:line
      }

      return line2;
    }

  }
})();
