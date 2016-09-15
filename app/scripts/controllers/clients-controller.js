(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ClientsController', ClientsController);

  function ClientsController(ClientsService,
                             ModalService,
                             $ionicLoading,
                             $ionicPopup,
                             $scope,
                             $ionicActionSheet) {
    var clientsVm = this;
    clientsVm.query = '';
    clientsVm.showModal = showModal;
    clientsVm.closeModal = closeModal;
    clientsVm.submitProcess = submitProcess;
    clientsVm.showActionSheet = showActionSheet;

    getClients();

    function getClients() {
      ClientsService.getClients()
        .then(function success(resp) {
          clientsVm.clients = resp;
        });
    }

    function submitProcess(id){
      (id) ? editClient() : newClient(); //jshint ignore:line
    }

    function newClient() {
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      ClientsService.newClient(clientsVm.client)
        .then(function success(resp){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successClientSave"|translate)}}'
          });
          clientsVm.clients.push(resp);
          clientsVm.closeModal();
        },
        function error(resp){
          clientsVm.messages = resp.status===422 ? resp.data.errors:undefined;
          $ionicLoading.hide();
        });
    }

    function editClient() {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      ClientsService.editClient(clientsVm.client)
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successUpdateClient"|translate)}}'
          });
          var indexArray = clientsVm.clients.map(function(o){return o.id;});
          var index = indexArray.indexOf(clientsVm.client.id);
          clientsVm.clients[index] = resp;
          closeModal();
        },
        function error(resp){
          clientsVm.messages = resp.status===422 ? resp.data.errors:undefined;
          $ionicLoading.hide();
        });
    }

    function showModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/client/new-edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      clientsVm.client = null;
      clientsVm.messages = {};
      clientsVm.query = '';
    }

    function showActionSheet(client) {
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Editar' }
        ],
        destructiveText: 'Eliminar',
        titleText: 'Opciones del Cliente',
        cancelText: 'Cancelar',
        destructiveButtonClicked: function(){
          // Pendient
        },
        buttonClicked: function(index) {
          if(index === 0) {
            clientsVm.client = JSON.parse(JSON.stringify(client));
            clientsVm.showModal();
            hideSheet();
          }
        }
      });
    }
  }
})();
