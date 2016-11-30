(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('OfficeController', OfficeController);

  function OfficeController(OfficesService,
                            ModalService,
                            $ionicLoading,
                            $ionicPopup,
                            $scope,
                            $localStorage,
                            MapsService) {

    var officesVm = this;
    officesVm.showEditOffice = showEditOffice;
    officesVm.showDeleteOffice = showDeleteOffice;
    officesVm.closeModal = closeModal;
    officesVm.submitOffice = submitOffice;
    officesVm.submitOfficeDelete = submitOfficeDelete;
    initOffice($localStorage.getObject('office'));

    function initOffice(office){
      officesVm.officeDetail = office;
      convertStringToDate();
      MapsService.loadGMap().then(function(){
        MapsService.loadGMapAddress(officesVm.officeDetail.direccion);
      });
    }


    function convertStringToDate(){
      var date = moment(new Date()).format('YYYY/MM/DD');
      var hora_de_apertura= date +' '+ officesVm.officeDetail.hora_de_apertura; //jshint ignore:line
      var hora_de_cierre= date +' '+ officesVm.officeDetail.hora_de_cierre; //jshint ignore:line
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
        loading();
        OfficesService.updateOffice(officesVm.office).then(function success(resp){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("office.officeSuccessUpdate"|translate)}}'
          });
          initOffice(resp.provider_office); //jshint ignore:line
          officesVm.closeModal();
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

    function loading(){
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
    }
  }
})();
