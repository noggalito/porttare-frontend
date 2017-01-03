(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProviderOrderShowController', ProviderOrderShowController);

  function ProviderOrderShowController($ionicPopup,
                                       customerOrder,
                                       ProviderCustomerOrdersService) {
    var providerOrderShowVM = this;
    providerOrderShowVM.customerOrder = customerOrder;
    providerOrderShowVM.acceptOrder = acceptOrder;
    providerOrderShowVM.rejectOrder = rejectOrder;

    init();

    function init(){
      providerOrderShowVM.errors = {};
      providerOrderShowVM.providerProfile = getProviderProfile();
      providerOrderShowVM.customerOrderDelivery = getCustomerOrderDelivery();
      providerOrderShowVM.customerBillingAddress = getCustomerBillingAddress();
      providerOrderShowVM.dateDelivery = getDateDelivery();
      providerOrderShowVM.shouldDisplayProviderAnswerForm = getShouldDisplayProviderAnswerForm();
    }

    function getCustomerBillingAddress(){
      return providerOrderShowVM.customerOrder.customer_billing_address; // jshint ignore:line
    }

    function getProviderProfile(){
      return providerOrderShowVM.customerOrder.provider_profiles[0]; // jshint ignore:line
    }

    function getCustomerOrderDelivery(){
      return providerOrderShowVM.providerProfile.customer_order_delivery; // jshint ignore:line
    }

    function getDateDelivery(){
      return providerOrderShowVM.customerOrderDelivery.deliver_at; // jshint ignore:line
    }

    function getShouldDisplayProviderAnswerForm(){
      return providerOrderShowVM.customerOrderDelivery.status === 'pending';
    }

    function acceptOrder(){
      ProviderCustomerOrdersService
        .acceptOrder(providerOrderShowVM.customerOrder)
        .then(respondedCustomerOrder)
        .catch(cantPerformAction);
    }

    function rejectOrder(){
      if (reasonIsBlank()) {
        providerOrderShowVM.errors.reason = true;
      } else {
        providerOrderShowVM.errors.reason = false;
        ProviderCustomerOrdersService.rejectOrder(
          providerOrderShowVM.customerOrder,
          providerOrderShowVM.customerOrderDelivery.reason
        ).then(respondedCustomerOrder)
        .catch(cantPerformAction);
      }
    }

    function reasonIsBlank(){
      return angular.element.isEmptyObject(
        angular.element.trim(providerOrderShowVM.customerOrderDelivery.reason)
      );
    }

    function cantPerformAction(reason){
      return $ionicPopup.alert({
        title: 'Error',
        template: '{{ ::("globals.pleaseTryAgain" | translate) }} ' + reason.statusText
      });
    }

    function respondedCustomerOrder (customerOrder) {
      providerOrderShowVM.customerOrder = customerOrder;
      init();
    }
  }
})();
