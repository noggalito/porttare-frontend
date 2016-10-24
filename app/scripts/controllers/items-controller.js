(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ItemsController', ItemsController);

  function ItemsController(ItemsService,
                           ModalService,
                           $ionicActionSheet,
                           $ionicLoading,
                           $ionicPopup,
                           $scope) {
    var itemsVm = this;
    itemsVm.showNewModal = showNewModal;
    itemsVm.showEditModal = showEditModal;
    itemsVm.closeModal = closeModal;
    itemsVm.submitProcess = submitProcess;
    itemsVm.deleteItem = deleteItem;
    itemsVm.showActionSheet = showActionSheet;
    itemsVm.query = '';
    var selectedItemIndex;

    getItems();

    function getItems() {
      ItemsService.getItems()
        .then(function success(resp) {
          itemsVm.items = resp.provider_items; //jshint ignore:line
        },
        function error(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data ? resp.data.error :
              '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }

    function submitProcess(id){
      (id) ? editItem() : newItem(); //jshint ignore:line
    }

    function error(resp){
      itemsVm.messages = resp.status===422 ? resp.data.errors:undefined;
      $ionicLoading.hide();
    }

    function newItem() {
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      ItemsService.newItem(itemsVm.item).then(function success(response){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: '{{::("item.successItemSave"|translate)}}'
        });
        itemsVm.items.push(response.provider_item); //jshint ignore:line
        itemsVm.closeModal();
      }, error);
    }

    function editItem() {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
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

    function showNewModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/item/new-edit.html'
      });
    }

    function showEditModal(item) {
      itemsVm.item = JSON.parse(JSON.stringify(item));
      itemsVm.showNewModal();
    }

    function closeModal() {
      ModalService.closeModal();
      selectedItemIndex = null;
      itemsVm.item = null;
      itemsVm.messages = {};
    }

    function showActionSheet(itemIndex) {
      selectedItemIndex = itemIndex;
      itemsVm.item = angular.copy(itemsVm.items[selectedItemIndex]);
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Editar' }
        ],
        destructiveText: 'Eliminar',
        titleText: 'Opciones del Artículo',
        cancelText: 'Cancelar',
        destructiveButtonClicked: function(){
          itemsVm.deleteItem(itemsVm.item.id);
          hideSheet();
        },
        buttonClicked: function(index) {
          if(index === 0) {
            itemsVm.showEditModal(itemsVm.item);
            hideSheet();
          }
        }
      });
    }
  }
})();
