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
    dispatchersVm.closeModal = closeModal;
    dispatchersVm.submitProcess = submitProcess;
    dispatchersVm.detailDispatcher = detailDispatcher;
    dispatchersVm.query = '';
    var selectedDispatcherIndex;
    getDispatchers();
    getProviderOffices();


    function getDispatchers() {
      DispatchersService.getDispatchers()
        .then(function success(resp) {
          localStorage.removeItem('dispatcher');
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
      if (!id) {
        newDispatcher();
      }else {
        $ionicPopup.alert({
          title: 'Error',
          template: '{{::("globals.pleaseTryAgain"|translate)}}'
        });
      }
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
          dispatchersVm.dispatchers.push(resp.provider_dispatcher); //jshint ignore:line
          dispatchersVm.closeModal();
        }, error);
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

    function closeModal() {
      ModalService.closeModal();
      selectedDispatcherIndex = null;
      dispatchersVm.dispatcher = null;
      dispatchersVm.messages = {};
      dispatchersVm.query = '';
    }
  }
})();
