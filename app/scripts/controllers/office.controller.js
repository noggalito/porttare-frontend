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
    officesVm.showEditModal = showEditModal;
    officesVm.showDeleteModal = showDeleteModal;
    officesVm.closeModal = closeModal;
    officesVm.submitModal = submitModal;
    officesVm.submitDeleteModal = submitDeleteModal;
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

    function showEditModal() {
      officesVm.office = angular.copy(officesVm.officeDetail);
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/offices/new-edit.html'
      });
    }

    function showDeleteModal() {
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

    function submitModal(){
      loading();
      OfficesService.updateOffice(officesVm.office).then(function success(resp){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: '{{::("office.officeSuccessUpdate"|translate)}}'
        });
        initOffice(resp.provider_office); //jshint ignore:line
        officesVm.closeModal();
      }, error);
    }

    function submitDeleteModal(){
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

    function error(resp){
      officesVm.messages = resp.status===422 ? resp.data.errors:undefined;
      $ionicLoading.hide();
    }

  }
})();
