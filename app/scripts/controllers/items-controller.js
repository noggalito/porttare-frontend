(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ItemsController', ItemsController);

  function ItemsController($ionicLoading,
                           $ionicPopup,
                           $scope,
                           apiResources,
                           ItemsService,
                           ModalService,
                           ErrorHandlerService,
                           APP) {
    var itemsVm = this,
        modalScope;
    itemsVm.newItemModal = launchModal;
    // itemsVm.deleteItem = deleteItem;
    itemsVm.query = '';

    init();

    function init() {
      itemsVm.items = apiResources.provider_items; //jshint ignore:line
    }

    function error(resp){
      itemsVm.messages = resp.status===422 ? resp.data.errors:undefined;
      $ionicLoading.hide();
    }

    function concatImages(files){
      modalScope.modalVm.item.imagenes = modalScope.modalVm.item.imagenes.concat(files);
      modalScope.modalVm.imagesUrls = modalScope.modalVm.item.imagenes;
    }

    function newItem() {
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      ItemsService.newItem(modalScope.modalVm.item).then(function success(response){
        $ionicLoading.hide().then(function(){
          itemsVm.items.push(response.provider_item); //jshint ignore:line
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("item.successItemSave"|translate)}}'
          }).then(closeModal);
        });
      }, error);
    }

    // function deleteItem(itemId) {
    //   $ionicLoading.show({
    //     template: '{{::("globals.deleting"|translate)}}'
    //   });
    //   ItemsService.deleteItem(itemId)
    //     .then(function success(){
    //       $ionicLoading.hide();
    //       $ionicPopup.alert({
    //         title: 'Éxito',
    //         template: '{{::("item.successDeleteItem"|translate)}}'
    //       });
    //       itemsVm.items.splice(selectedItemIndex, 1);
    //     },
    //     function error(){
    //       $ionicLoading.hide();
    //       $ionicPopup.alert({
    //         title: 'Error',
    //         template: '{{::("globals.pleaseTryAgain"|translate)}}'
    //       });
    //     });
    // }

    function launchModal() {
      modalScope = $scope.$new(true); // isolated
      modalScope.modalVm = itemsVm;
      // unfortunately item is the providerItem we'll edit
      modalScope.modalVm.item = { imagenes: [] };
      modalScope.modalVm.closeModal = closeModal;
      modalScope.modalVm.submitProcess = newItem;
      modalScope.modalVm.concatImages = concatImages;
      modalScope.modalVm.imagesUrls = modalScope.modalVm.item.imagenes;
      ModalService.showModal({
        parentScope: modalScope,
        fromTemplateUrl: 'templates/item/new-edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      modalScope.modalVm.messages = {};
      modalScope.modalVm.item = null;
    }
  }
})();
