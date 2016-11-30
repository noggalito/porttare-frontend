(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('OfficesController', OfficesController);

  function OfficesController(OfficesService,
                              ModalService,
                              ErrorHandlerService,
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
    getOffices();

    function getOffices() {
      OfficesService.getOffices().then(function(results){
        officesVm.offices = results.provider_offices; //jshint ignore:line
      }, ErrorHandlerService.handleCommonErrorGET);
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
