(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('OfficeController', OfficeController);

  function OfficeController(OfficesService,
                            ModalService,
                            ErrorHandlerService,
                            $ionicLoading,
                            $ionicPopup,
                            $scope,
                            $stateParams,
                            MapsService) {

    var officesVm = this;
    officesVm.showEditOffice = showEditOffice;
    officesVm.showDeleteOffice = showDeleteOffice;
    officesVm.closeModal = closeModal;
    officesVm.submitOffice = submitOffice;
    officesVm.submitOfficeDelete = submitOfficeDelete;
    getOffice();

    function getOffice(){
      loading('globals.loading');
      OfficesService.getOffice($stateParams.id).then(function success(resp){
        officesVm.officeDetail = resp.provider_office; //jshint ignore:line
        loadOffice();
      }, ErrorHandlerService.handleCommonErrorGET);
    }

    function loadOffice(){
      convertStringToDate();
      MapsService.loadGMap().then(function(){
        $ionicLoading.hide();
        MapsService.loadGMapAddress(officesVm.officeDetail.direccion);
      });
    }

    function convertStringToDate(){
      var hora_de_apertura= moment(officesVm.officeDetail.hora_de_apertura, 'HH:mm Z').format('YYYY/MM/DD HH:mm Z');//jshint ignore:line
      var hora_de_cierre= moment(officesVm.officeDetail.hora_de_cierre, 'HH:mm Z').format('YYYY/MM/DD HH:mm Z'); //jshint ignore:line
      officesVm.officeDetail.hora_de_apertura = new Date(hora_de_apertura); //jshint ignore:line
      officesVm.officeDetail.hora_de_cierre = new Date(hora_de_cierre); //jshint ignore:line
    }

    function showEditOffice() {
      officesVm.office = angular.copy(officesVm.officeDetail);
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/offices/new-edit.html'
      });
    }

    function showDeleteOffice() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/offices/delete.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
      officesVm.office = {};
      officesVm.messages = {};
    }

    function submitOffice(){
      if(officesVm.form.$valid){
        loading('globals.updating');
        OfficesService.updateOffice(officesVm.office).then(function success(resp){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("office.officeSuccessUpdate"|translate)}}'
          });
          officesVm.closeModal();
          officesVm.officeDetail = resp.provider_office; //jshint ignore:line
          loadOffice();
        }, function(rpta){
          officesVm.messages = rpta.status===422 ? rpta.data.errors:undefined;
          $ionicLoading.hide();
        });
      }
    }

    function submitOfficeDelete(){
      officesVm.closeModal();
      $ionicPopup.alert({
        title: 'Error',
        template: '{{::("office.taskInProgress"|translate|uppercase)}} !!!'
      });
    }

    function loading(template){
      $ionicLoading.show({
        template: '{{::("'+template+'"|translate)}}'
      });
    }
  }
})();
