(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ItemsController', ItemsController);

  function ItemsController(ItemsService,
                          $ionicModal,
                          $scope,
                          $ionicActionSheet) {
    var itemsVm = this;
    itemsVm.newItem = newItem;
    itemsVm.items = items;
    itemsVm.editItem = editItem;
    itemsVm.action = '';
    itemsVm.showActionSheet = showActionSheet;

    itemsVm.modal = modal;
    itemsVm.openModal = openModal;
    itemsVm.closeModal = closeModal;
    itemsVm.cleanForm = cleanForm;

    itemsVm.messages={};
    itemsVm.itemForm = {};

    // initialize items
    itemsVm.items();
    itemsVm.modal();

    // Manage modal item
    function modal(){
      $ionicModal.fromTemplateUrl('my-modal-item.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal){
        itemsVm.modal = modal;
      });
    }

    function openModal(action){
      itemsVm.action = action;
      cleanForm();
      itemsVm.modal.show();
    }

    function closeModal(){
      itemsVm.modal.hide();
      itemsVm.cleanForm();
    }

    function cleanForm() {
      itemsVm.itemForm = {};
      itemsVm.messages = {};
    }

    // Show the action sheet for item options
    function showActionSheet() {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Editar' }
        ],
        destructiveText: 'Eliminar',
        titleText: 'Opciones del Artículo',
        cancelText: 'Cancelar',
        destructiveButtonClicked: function(){
          // Pendient
        },
        buttonClicked: function(index) {
          if(index === 0) {
            itemsVm.openModal('edit');
            hideSheet();
          }
        }
      });
    }

    // Create a new item from provider
    function newItem() {
      ItemsService.newItem(itemsVm.itemForm)
        .then(function success(resp){
          /*jshint camelcase:false */
          if(resp.provider_item){
            itemsVm.items.push(resp.provider_item);
            itemsVm.closeModal();
          }else{
            itemsVm.messages = resp.errors;
          }
        });
    }

    // List all provider items
    function items() {
      ItemsService.items()
        .then(function (resp) {
          itemsVm.items = resp;
        });
    }

    // Edit item provider
    function editItem(id) {
      ItemsService.editItem(id)
        .then(function success(resp) {
          /*jshint camelcase:false */
          if(resp.provider_item){
            itemsVm.items.push(resp.provider_item);
            itemsVm.closeModal();
          }else{
            itemsVm.messages = resp.errors;
          }
        });
    }
  }
})();
