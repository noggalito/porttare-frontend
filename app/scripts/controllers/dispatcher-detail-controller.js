(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('DispatcherDetailController', DispatchersController);

  function DispatchersController(DispatchersService,
                              ModalService,
                              $ionicLoading,
                              $ionicPopup,
                              $scope,
                              $state,
                              $stateParams,
                              $localStorage) {

    var dispatchersVm = this;
    dispatchersVm.showNewModal = showNewModal;
    dispatchersVm.showEditModal = showEditModal;
    dispatchersVm.closeModal = closeModal;
    dispatchersVm.submitProcess = submitProcess;
    dispatchersVm.deleteDispatcher = deleteDispatcher;
    dispatchersVm.query = '';
    dispatchersVm.detailDispatcher = $localStorage.getObject('dispatcher');
    getProviderOffices();

    function getProviderOffices() {
      DispatchersService.getProviderOffices()
        .then(function success(resp) {
          dispatchersVm.providerOffices = resp.provider_offices; //jshint ignore:line
        });
    }

    function submitProcess(id) {
      if (id) {
        editDispatcher();
      }else {
        $ionicPopup.alert({
          title: 'Error',
          template: '{{::("globals.pleaseTryAgain"|translate)}}'
        });
      }
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
            template: '{{::("dispatcher.successUpdateDispatcher"|translate)}}'
          });
          dispatchersVm.detailDispatcher = resp.provider_dispatcher; //jshint ignore:line
          closeModal();
        },
        function error(resp) {
          dispatchersVm.messages = resp.status === 422 ? resp.data.errors : undefined;
          $ionicLoading.hide();
        });
    }

    function deleteDispatcher() {
      $ionicLoading.show({
        template: '{{::("globals.deleting"|translate)}}'
      });
      DispatchersService.deleteDispatcher(dispatchersVm.detailDispatcher.id)
        .then(function success(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("dispatcher.successDeleteDispatcher"|translate)}}'
          });
          localStorage.removeItem('dispatcher');
          $state.go('provider.dispatchers.index');
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
        fromTemplateUrl: 'templates/dispatcher/new-edit.html'
      });
    }

    function showEditModal() {
      dispatchersVm.dispatcher = angular.copy(dispatchersVm.detailDispatcher);
      dispatchersVm.showNewModal();
    }

    function closeModal() {
      ModalService.closeModal();
      dispatchersVm.dispatcher = null;
      dispatchersVm.messages = {};
    }
  }
})();
