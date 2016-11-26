(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('BillingAddressesController', BillingAddressesController);

  function BillingAddressesController(BillingAddressesService,
                                      ModalService,
                                      $scope,
                                      $ionicPopup,
                                      $ionicLoading) {
    var billingAddressesVm= this;
    var billingAddressesIndex;
    billingAddressesVm.showNewModal = showNewModal;
    billingAddressesVm.showEditModal = showEditModal;
    billingAddressesVm.closeModal = closeModal;
    billingAddressesVm.submitModal = submitModal;
    getBillingAddresses();

    function getBillingAddresses() {
      BillingAddressesService.getBillingAddresses().then(function(results){
        billingAddressesVm.billingAddresses = results.customer_billing_addresses; //jshint ignore:line
      }, function error(resp) {
        var msg= resp.data.error ? resp.data.error : '{{::("globals.pleaseTryAgain"|translate)}}';
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Error',
          template: msg
        });
      });
    }

    function showNewModal() {
      billingAddressesVm.billingAddress = {};
      showNewEditModal();
    }

    function showEditModal(item, index) {
      billingAddressesIndex = index;
      billingAddressesVm.billingAddress = angular.copy(item);
      showNewEditModal();
    }

    function showNewEditModal(){
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/billing-addresses/new-edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      billingAddressesVm.messages = {};
    }

    function submitModal(){
      billingAddressesVm.billingAddress.id ? updateBillingAddress():saveBillingAddress();// jshint ignore:line
    }

    function saveBillingAddress(){
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      BillingAddressesService.createBillingAddress(billingAddressesVm.billingAddress).then(function success(resp){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: '{{::("billingAddresses.successSave"|translate)}}'
        });
        billingAddressesVm.billingAddresses.push(resp.customer_billing_address); //jshint ignore:line
        closeModal();
      }, function (res){
        billingAddressesVm.messages = res.errors ? res.errors:undefined;
        $ionicLoading.hide();
      });
    }

    function  updateBillingAddress(){
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      BillingAddressesService.updateBillingAddress(billingAddressesVm.billingAddress).then(function success(resp){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: '{{::("billingAddresses.successUpdate"|translate)}}'
        });
        billingAddressesVm.billingAddresses[billingAddressesIndex] = resp.customer_billing_address; //jshint ignore:line
        closeModal();
      }, function (res){
        billingAddressesVm.messages = res.status===422 ? res.data.errors:undefined;
        $ionicLoading.hide();
      });
    }

  }
})();
