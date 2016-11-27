(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('OfficesController', OfficesController);

  function OfficesController(OfficesService,
                              ModalService,
                              $ionicLoading,
                              $ionicPopup,
                              $scope,
                              $state,
                              $localStorage) {

    var officesVm = this;
    officesVm.showNewOffice = showNewOffice;
    officesVm.closeModal = closeModal;
    officesVm.submitOffice = submitOffice;
    officesVm.seeMore = seeMore;
    getoffices();

    function getoffices() {
      OfficesService.getOffices().then(function(results){
        officesVm.offices = results.provider_offices; //jshint ignore:line
      }, function error(resp) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Error',
          template: resp.data.error ? resp.data.error : '{{::("globals.pleaseTryAgain"|translate)}}'
        });
      });
    }

    function showNewOffice() {
      officesVm.office = {};
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/offices/new-edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      officesVm.messages = {};
    }

    function submitOffice(){
      $ionicLoading.show({
        template: '{{::("globals.saving"|translate)}}'
      });
      OfficesService.createOffice(officesVm.office).then(function success(resp){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: '{{::("office.officeSuccessSave"|translate)}}'
        });
        officesVm.offices.push(resp.provider_office); //jshint ignore:line
        officesVm.closeModal();
      }, function(response){
        officesVm.messages = response.errors ? response.errors:undefined;
        $ionicLoading.hide();
      });
    }

    function seeMore(office){
      $localStorage.setObject('office', office);
      $state.go('provider.office');
    }

  }
})();
