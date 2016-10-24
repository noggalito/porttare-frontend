(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ClientsController', ClientsController);

  function ClientsController(ClientsService,
                             ModalService,
                             $ionicLoading,
                             $ionicPopup,
                             $scope) {
    var clientsVm = this;
    clientsVm.showNewModal = showNewModal;
    clientsVm.showEditModal = showEditModal;
    clientsVm.closeModal = closeModal;
    clientsVm.submitProcess = submitProcess;
    clientsVm.deleteClient = deleteClient;
    clientsVm.listOptions = [
      {name: 'Nombres', filterField: 'nombres'},
      {name: 'Antigüedad', filterField: 'created_at'}
    ];
    clientsVm.query = '';
    var selectedClientIndex;
    getClients();

    function getClients() {
      ClientsService.getClients()
        .then(function success(resp) {
          clientsVm.clients = resp.provider_clients; //jshint ignore:line
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
          clientsVm.clients[selectedClientIndex] = resp.provider_client; //jshint ignore:line
          closeModal();
        },
        function error(resp){
          clientsVm.messages = resp.status===422 ? resp.data.errors:undefined;
          $ionicLoading.hide();
        });
    }

    function deleteClient(clientId) {
      $ionicLoading.show({
        template: '{{::("globals.deleting"|translate)}}'
      });
      ClientsService.deleteClient(clientId)
        .then(function success(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successDeleteClient"|translate)}}'
          });
          clientsVm.clients.splice(selectedClientIndex, 1);
          closeModal();
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
        fromTemplateUrl: 'templates/client/new-edit.html'
      });
    }

    function showEditModal(index) {
      selectedClientIndex = index;
      clientsVm.client = angular.copy(clientsVm.clients[index]);
      clientsVm.showNewModal();
    }

    function closeModal() {
      ModalService.closeModal();
      selectedClientIndex = null;
      clientsVm.client = null;
      clientsVm.messages = {};
      clientsVm.query = '';
    }
  }
})();
