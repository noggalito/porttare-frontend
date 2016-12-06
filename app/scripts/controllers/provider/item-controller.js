(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProviderItemController', ProviderItemController);

  function ProviderItemController($scope,
                                  $ionicPopup,
                                  $ionicLoading,
                                  apiResources,
                                  APP,
                                  ModalService,
                                  ItemsService) {
    var providerItemVm = this,
        modalScope;

    providerItemVm.providerItem = apiResources.provider_item;  // jshint ignore:line
    providerItemVm.updateStock = updateStock;
    providerItemVm.showEditModal = launchModal;
    providerItemVm.slickSettings = { dots: true };

    init();

    function init() {
      providerItemVm.providerItem.precio = providerItemVm.providerItem.precio_cents / APP.centsInDollar;
    }

    function updateStock() {
      console.log('post to backend!');
      console.log(providerItemVm.providerItem.en_stock);
    }

    function loadImagesUrls() {
      return modalScope.modalVm.item.imagenes.map(function(imagen) {
        if (imagen.constructor === File) {
          return imagen;
        } else if (imagen.constructor === Object) {
          return imagen.imagen_url; // jshint ignore:line
        }
      });
    }

    function concatImages(files) {
      modalScope.modalVm.item.imagenes = modalScope.modalVm.item.imagenes.concat(files);
      modalScope.modalVm.imagesUrls = loadImagesUrls();
    }

    function launchModal() {
      modalScope = $scope.$new(true); // isolated
      modalScope.modalVm = providerItemVm;
      // unfortunately item is the providerItem we'll edit
      modalScope.modalVm.item = angular.copy(providerItemVm.providerItem);
      modalScope.modalVm.closeModal = closeModal;
      modalScope.modalVm.submitProcess = editItem;
      modalScope.modalVm.concatImages = concatImages;
      modalScope.modalVm.imagesUrls = loadImagesUrls();
      ModalService.showModal({
        parentScope: modalScope,
        fromTemplateUrl: 'templates/item/new-edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      providerItemVm.messages = {};
      providerItemVm.item = null;
    }

    function editItem() {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      ItemsService.editItem(modalScope.modalVm.item).then(function success(resp) {
        providerItemVm.providerItem = resp.provider_item; //jshint ignore:line
        init();

        $ionicLoading.hide().then(function () {
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("item.successUpdateItem"|translate)}}'
          }).then(closeModal);
        });
      }, error);
    }

    function error(resp){
      itemsVm.messages = resp.status===422 ? resp.data.errors:undefined;
      $ionicLoading.hide();
    }
  }
})();
