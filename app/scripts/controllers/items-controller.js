(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ItemsController', ItemsController);

  function ItemsController(ItemsService,
                           ModalService,
                           $ionicLoading,
                           $ionicPopup,
                           $scope,
                           ErrorHandlerService,
                           APP) {
    var itemsVm = this;
    itemsVm.launchModal = launchModal;
    itemsVm.showEditModal = showEditModal;
    itemsVm.closeModal = closeModal;
    itemsVm.submitProcess = submitProcess;
    itemsVm.deleteItem = deleteItem;
    itemsVm.query = '';
    itemsVm.concatImages = concatImages;
    itemsVm.images = [];
    itemsVm.imagesUrls = [];
    var selectedItemIndex;

    getItems();

    function getItems() {
      ItemsService.getItems()
        .then(function success(resp) {
          itemsVm.items = resp.provider_items; //jshint ignore:line
        },ErrorHandlerService.handleCommonErrorGET);
    }

    function loadImageUrls() {
      itemsVm.imagesUrls = itemsVm.images.map(function(imagen) {
        if (imagen.constructor === File) {
          return imagen;
        } else if (imagen.constructor === Object) {
          return imagen.imagen_url; // jshint ignore:line
        }
      });
    }

    function submitProcess(id){
      (id) ? editItem() : newItem(); //jshint ignore:line
    }

    function error(resp){
      itemsVm.messages = resp.status===422 ? resp.data.errors:undefined;
      $ionicLoading.hide();
    }

    function concatImages(files){
      resetImages(itemsVm.images.concat(files));
    }

    function newItem() {
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      itemsVm.item.imagenes = itemsVm.images;
      ItemsService.newItem(itemsVm.item).then(function success(response){
        $ionicLoading.hide().then(function(){
          itemsVm.items.push(response.data.provider_item); //jshint ignore:line
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("item.successItemSave"|translate)}}'
          }).then(function(){
            itemsVm.closeModal();
          });
        });
      }, error);
    }

    function editItem() {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      itemsVm.item.imagenes = itemsVm.images;
      ItemsService.editItem(itemsVm.item)
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("item.successUpdateItem"|translate)}}'
          });
          itemsVm.items[selectedItemIndex] = resp.provider_item; //jshint ignore:line
          itemsVm.closeModal();
        }, error);
    }

    function deleteItem(itemId) {
      $ionicLoading.show({
        template: '{{::("globals.deleting"|translate)}}'
      });
      ItemsService.deleteItem(itemId)
        .then(function success(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("item.successDeleteItem"|translate)}}'
          });
          itemsVm.items.splice(selectedItemIndex, 1);
        },
        function error(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Error',
            template: '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }

    function resetImages(newImages) {
      itemsVm.images = newImages;
      loadImageUrls();
    }

    function launchModal() {
      resetImages(
        itemsVm.item ? itemsVm.item.imagenes : []
      );
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/item/new-edit.html'
      });
    }

    function showEditModal(index) {
      selectedItemIndex = index;
      itemsVm.item = angular.copy(itemsVm.items[index]);
      itemsVm.item.precio = itemsVm.item.precio_cents/APP.centsInDollar; //jshint ignore:line
      itemsVm.launchModal();
    }

    function closeModal() {
      ModalService.closeModal();
      selectedItemIndex = null;
      itemsVm.item = null;
      itemsVm.messages = {};
    }
  }
})();
