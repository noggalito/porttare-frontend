(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('DispatchersController', DispatchersController);

  function DispatchersController(DispatchersService,
                             ModalService,
                             $ionicLoading,
                             $ionicPopup,
                             $scope,
                             $localStorage,
                             $state) {
    var dispatchersVm = this;
    dispatchersVm.showNewModal = showNewModal;
    dispatchersVm.showEditModal = showEditModal;
    dispatchersVm.closeModal = closeModal;
    dispatchersVm.submitProcess = submitProcess;
    dispatchersVm.deleteDispatcher = deleteDispatcher;
    dispatchersVm.detailDispatcher = detailDispatcher;
    dispatchersVm.query = '';
    var selectedDispatcherIndex;
    getDispatchers();
    getProviderOffices();


    function getDispatchers() {
      DispatchersService.getDispatchers()
        .then(function success(resp) {
          dispatchersVm.dispatchers = resp.provider_dispatchers; //jshint ignore:line
        });
    }

    function getProviderOffices() {
      DispatchersService.getProviderOffices()
        .then(function success(resp) {
          dispatchersVm.providerOffices = resp.provider_offices; //jshint ignore:line
        });
    }

    function error(resp){
      dispatchersVm.messages = resp.status===422 ? resp.data.errors:undefined;
      $ionicLoading.hide();
    }

    function submitProcess(id){
      (id) ? editDispatcher() : newDispatcher(); //jshint ignore:line
    }

    function newDispatcher() {
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      DispatchersService.newDispatcher(dispatchersVm.dispatcher)
        .then(function success(resp){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("dispatcher.successDispatcherSave"|translate)}}'
          });
          dispatchersVm.dispatchers.push(resp.provider_dispatcher);
          dispatchersVm.closeModal();
        }, error);
    }

    function editDispatcher() {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      DispatchersService.editDispatcher(dispatchersVm.dispatcher)
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("client.successUpdateDispatcher"|translate)}}'
          });
          dispatchersVm.dispatchers[selectedDispatcherIndex] = resp.provider_dispatcher; //jshint ignore:line
          closeModal();
        }, error);
    }

    function deleteDispatcher(clientId) {
      $ionicLoading.show({
        template: '{{::("globals.deleting"|translate)}}'
      });
      DispatchersService.deleteDispatcher(clientId)
        .then(function success(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("dispatcher.successdeleteDispatcher"|translate)}}'
          });
          dispatchersVm.dispatchers.splice(selectedDispatcherIndex, 1);
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

    function detailDispatcher(dispatcher){
      $localStorage.setObject('dispatcher', dispatcher);
      $state.go('provider.dispatchers.detail');
    }

    function showNewModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/dispatcher/new-edit.html'
      });
    }

    function showEditModal(index) {
      selectedDispatcherIndex = index;
      dispatchersVm.dispatcher = angular.copy(dispatchersVm.dispatchers[index]);
      console.log(dispatchersVm.dispatcher)
      dispatchersVm.showNewModal();
    }

    function closeModal() {
      ModalService.closeModal();
      selectedDispatcherIndex = null;
      dispatchersVm.dispatcher = null;
      dispatchersVm.messages = {};
      dispatchersVm.query = '';
    }
  }
})();
