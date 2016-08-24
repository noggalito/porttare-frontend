(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ItemController', ItemController);

  function ItemController(ItemService,
                          $ionicPopup,
                          $ionicLoading,
                          $ionicModal,
                          $scope,
                          $timeout,
                          $ionicActionSheet) {
    var itemVm = this;
    itemVm.newItem = newItem;
    itemVm.items = items;
    itemVm.editItem = editItem;
    itemVm.action = '';
    itemVm.showActionSheet = showActionSheet;

    itemVm.modal = modal;
    itemVm.openModal = openModal;
    itemVm.closeModal = closeModal;
    itemVm.cleanForm = cleanForm;

    itemVm.messages={};
    itemVm.itemForm = {};

    // initialize items
    itemVm.items();
    itemVm.modal();

    // Manage modal item
    function cleanForm() {
      itemVm.itemForm = {};
      itemVm.messages = {};
    }

    function modal(){
      $ionicModal.fromTemplateUrl('my-modal-item.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal){
        itemVm.modal = modal;
      });
    }

    function openModal(action){
      itemVm.action = action;
      cleanForm();
      itemVm.modal.show();
    }

    function closeModal(){
      itemVm.modal.hide();
      itemVm.cleanForm();
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
            itemVm.openModal('edit');
            hideSheet();
          }
        }
      });
      // Hide the sheet after five seconds
      $timeout(function() {
        hideSheet();
      }, 5000);
    }

    // Create a new item from provider
    function newItem() {
      $ionicLoading.show({
        template: 'Guardando...'
      });
      ItemService.newItem(itemVm.itemForm)
        .then(function () {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: 'El {{::("item.item"|translate)}} se creo Correctamente!'
          });
          itemVm.closeModal();
        })
        .catch(function (resp) {
          if (resp.data.errors){
            $ionicPopup.alert({
              title: 'Datos Incompletos',
              template: 'Intentalo nuevamente.'
            });
            itemVm.messages = resp.data.errors;
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resp.data.error ? resp.data :
                'Hubo un error, intentalo nuevamente.'
            });
          }
        })
        .finally(function () {
          $ionicLoading.hide();
          items();
        });
    }

    // List all provider items
    function items() {
      ItemService.items()
        .then(function (resp) {
          /*jshint camelcase:false */
          itemVm.items = resp.data.provider_items;
        })
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data.error ? resp.data :
              'Hubo un error, intentalo nuevamente.'
          });
        });
    }

    // Edit item provider
    function editItem(id) {
      $ionicLoading.show({
        template: 'Actualizando...'
      });
      ItemService.editItem(id)
        .then(function success(resp) {
          /*jshint camelcase:false */
          itemVm.items = resp.data.provider_items;
          $ionicLoading.hide();
          $ionicPopup.alert({
              title: 'Éxito',
              template: 'El {{::("item.item"|translate)}} se actualizó Correctamente!'
            });
          itemVm.closeModal();
        })
        .catch(function (resp) {
          if (resp.data.errors){
            $ionicPopup.alert({
              title: 'Datos Incompletos',
              template: 'Intentalo nuevamente.'
            });
            itemVm.messages = resp.data.errors;
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resp.data.error ? resp.data :
                'Hubo un error, intentalo nuevamente.'
            });
          }
        })
        .finally(function () {
          $ionicLoading.hide();
          items();
        });
    }
  }
})();
