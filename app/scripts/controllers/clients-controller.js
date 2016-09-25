(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ClientsController', ClientsController);

  function ClientsController(ClientsService,
                             ModalService,
                             $ionicLoading,
                             $ionicPopup,
                             $scope
                            ) {
    var clientsVm = this;
    clientsVm.showNewModal = showNewModal;
    clientsVm.showEditModal = showEditModal;
    clientsVm.closeModal = closeModal;
    clientsVm.submitProcess = submitProcess;
    clientsVm.disableClient = disableClient;
    clientsVm.listOptions = [
      {option: 'Nombres', filterField: 'nombres'},
      {option: 'Antigüedad', filterField: 'created_at'}
    ];
    clientsVm.query = '';

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

    function disableClient(clientId) {
      $ionicLoading.show({
        template: '{{::("globals.disabling"|translate)}}'
      });
      ClientsService.disableClient(clientsVm.client)
        .then(function success(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successDisableClient"|translate)}}'
          });
          var indexArray = clientsVm.clients.map(function(o){return o.id;});
          var index = indexArray.indexOf(clientId);
          clientsVm.clients.splice(index, 1);
          closeModal();
        },
        function error(resp){
          clientsVm.messages = resp.status===422 ? resp.data.errors:undefined;
          $ionicLoading.hide();
        });
    }

    function showNewModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/client/new-edit.html'
      });
    }

    function showEditModal(client) {
      clientsVm.client = JSON.parse(JSON.stringify(client));
      clientsVm.showNewModal();
    }

    function closeModal() {
      ModalService.closeModal();
      clientsVm.client = null;
      clientsVm.messages = {};
      clientsVm.query = '';
    }
  }
})();
