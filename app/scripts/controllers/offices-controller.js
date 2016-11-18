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
    officesVm.showNewModal = showNewModal;
    officesVm.closeModal = closeModal;
    officesVm.submitModal = submitModal;
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

    function showNewModal() {
      officesVm.office = {};
      officesVm.office.hora_de_apertura = new Date(); //jshint ignore:line
      officesVm.office.hora_de_cierre = new Date(); //jshint ignore:line
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/offices/new-edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      officesVm.office= {};
      officesVm.messages = {};
    }

    function submitModal(){
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
      }, error);
    }

    function error(resp){
      officesVm.messages = resp.status===422 ? resp.data.errors:undefined;
      $ionicLoading.hide();
    }

    function seeMore(office){
      $localStorage.setObject('office', office);
      $state.go('provider.office');
    }

  }
})();
