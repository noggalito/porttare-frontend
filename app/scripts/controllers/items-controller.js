(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ItemsController', ItemsController);

  function ItemsController(ItemsService,
                           $scope,
                           $ionicActionSheet) {
    var itemsVm = this;
    itemsVm.items = null;
    itemsVm.item = null;
    itemsVm.submitProcess = submitProcess;
    var modalInstance = null;
    itemsVm.openModal = openModal;
    itemsVm.closeModal = closeModal;
    itemsVm.showActionSheet = showActionSheet;
    itemsVm.messages = {};

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
            console.log(item);
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
      ItemsService.newItem(itemsVm.item)
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
