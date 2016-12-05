(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProviderItemController', ProviderItemController);

  function ProviderItemController(apiResources,
                                  APP,
                                  ModalService) {
    var providerItemVm = this,
        providerItem = apiResources.provider_item; // jshint ignore:line

    providerItem.precio = providerItem.precio_cents / APP.centsInDollar;
    console.log(providerItem);

    providerItemVm.providerItem = providerItem;
    providerItemVm.updateStock = updateStock;
    providerItemVm.showEditModal = showEditModal;
    providerItemVm.slickSettings = { dots: true };

    function updateStock() {
      console.log('post to backend!');
      console.log(providerItemVm.providerItem.en_stock);
    }

    function showEditModal() {
      providerItemVm.editing = angular.copy(providerItemVm.providerItem);
      launchModal();
    }

    function launchModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/item/new-edit.html'
      });
    }
  }
})();
