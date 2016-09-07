(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ClientsController', ClientsController);

  function ClientsController(ClientsService,
                             $scope,
                             $ionicActionSheet) {
    var clientsVm = this;
    clientsVm.query = '';
    clientsVm.submitProcess = submitProcess;
    var modalInstance = null;
    clientsVm.openModal = openModal;
    clientsVm.closeModal = closeModal;
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
          /* jshint camelcase:false */
          clientsVm.clients.push(resp.data.provider_client);
          clientsVm.closeModal();
        },
        function error(resp){
          clientsVm.messages = resp.data.errors;
        });
    }

    function editClient() {
      ClientsService.editClient(clientsVm.client)
        .then(function success(resp) {
          var indexArray = clientsVm.clients.map(function(o){return o.id;});
          var index = indexArray.indexOf(clientsVm.client.id);
          /* jshint camelcase:false */
          clientsVm.clients[index] = resp.data.provider_client;
          cleanData();
          clientsVm.closeModal();
        },
        function error(resp){
          clientsVm.messages = resp.data.errors;
        });
    }

    function openModal() {
      ClientsService.modalInstance($scope)
        .then(function success(modal){
          modalInstance = modal;
          modalInstance.show();
        });
    }

    function closeModal(){
      modalInstance.remove();
      cleanData();
    }

    function cleanData(){
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
            clientsVm.openModal();
            hideSheet();
          }
        }
      });
    }
  }
})();
