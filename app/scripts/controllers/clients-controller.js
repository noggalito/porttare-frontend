(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ClientsController', ClientsController);

  function ClientsController(ClientsService,
                             ModalService,
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
      /* jshint expr: true */
      (id) ? editClient() : newClient();
    }

    function newClient() {
      ClientsService.newClient(clientsVm.client)
        .then(function success(resp){
          if(resp.status==201){
            /* jshint camelcase:false */
            clientsVm.clients.push(resp.data.provider_client);
            clientsVm.closeModal();
          }else{
            clientsVm.messages = resp.data.errors;
          }
        });
    }

    function editClient() {
      ClientsService.editClient(clientsVm.client)
        .then(function success(resp) {
          if(resp.status==202){
            var indexArray = clientsVm.clients.map(function(o){return o.id;});
            var index = indexArray.indexOf(clientsVm.client.id);
            /* jshint camelcase:false */
            clientsVm.clients[index] = resp.data.provider_client;
            closeModal();
          }else{
            clientsVm.messages = resp.data.errors;
          }
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
      resetData();
    }

    function resetData(){
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
          if(index == 0) {
            clientsVm.client = JSON.parse(JSON.stringify(client));
            clientsVm.showModal();
            hideSheet();
          }
        }
      });
    }
  }
})();
