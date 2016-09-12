(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ItemsController', ItemsController);

  function ItemsController(ItemsService,
                           $scope,
                           $ionicActionSheet,
                           $ionicLoading,
                           $ionicPopup) {
    var itemsVm = this;
    itemsVm.submitProcess = submitProcess;
    var modalInstance = null;
    itemsVm.openModal = openModal;
    itemsVm.closeModal = closeModal;
    itemsVm.showActionSheet = showActionSheet;

    getItems();

    function openModal() {
      ItemsService.modalInstance($scope)
        .then(function success(modal){
          modalInstance = modal;
          modalInstance.show();
        });
    }

    function closeModal(){
      modalInstance.remove();
      cleanData();
    }

    function showActionSheet(item) {
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
            itemsVm.item = JSON.parse(JSON.stringify(item));
            itemsVm.openModal();
            hideSheet();
          }
        }
      });
    }

    function cleanData(){
      itemsVm.item = null;
      itemsVm.messages = {};
    }

    function submitProcess(id){
      /* jshint expr: true */
      (id) ? editItem() : newItem();
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
      }, function error(response){
        if (response.status === 422){
          $ionicPopup.alert({
            title: 'Faltan datos',
            template: '{{::("globals.pleaseTryAgain"|translate)}}'
          });
          itemsVm.messages = response.data.errors;
        }
      }).finally(function () {
          $ionicLoading.hide();
      });
    }

    function getItems() {
      ItemsService.getItems()
        .then(function success(resp) {
          itemsVm.items = resp;
        });
    }

    function editItem() {
      ItemsService.editItem(itemsVm.item)
        .then(function success(resp) {
          /*jshint camelcase:false */
          if(resp.provider_item){
            var indexArray = itemsVm.items.map(function(o){return o.id;});
            var index = indexArray.indexOf(itemsVm.item.id);
            itemsVm.items[index] = itemsVm.item;
            cleanData();
            itemsVm.closeModal();
          }else{
            itemsVm.messages = resp.errors;
          }
        });
    }
  }
})();
