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
    officesVm.updateOfficeState = updateOfficeState;
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
      MapsService.loadGMaps().then(function(){
        $ionicLoading.hide();
        var map = MapsService.renderMap('office-map');
        MapsService.renderAddressMarker(map, {
          address: officesVm.officeDetail.direccion,
          componentRestrictions: {
            country: 'EC',
            locality: officesVm.officeDetail.ciudad
          }
        });
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
      officesVm.office = {};
      officesVm.messages = {};
      return ModalService.closeModal();
    }

    function submitOffice(){
      if(officesVm.form.$valid){
        loading('globals.updating');
        OfficesService.updateOffice(officesVm.office).then(function success(resp){
          $ionicLoading.hide().then(function(){
            officesVm.officeDetail = resp.provider_office; //jshint ignore:line
            loadOffice();
            closeModal().then(function () {
              $ionicPopup.alert({
                title: 'Éxito',
                template: '{{::("office.officeSuccessUpdate"|translate)}}'
              });
            });
          });
        }, function(rpta){
          officesVm.messages = rpta.status===422 ? rpta.data.errors:undefined;
          $ionicLoading.hide();
        });
      }
    }

    function submitOfficeDelete(){
      $ionicPopup.alert({
        title: 'Error',
        template: '{{::("office.taskInProgress"|translate)}} !!!'
      }).then(function(){
        officesVm.closeModal();
      });
    }

    function loading(template){
      $ionicLoading.show({
        template: '{{::("'+template+'"|translate)}}'
      });
    }

    function updateOfficeState() {
      console.log('updateOfficeState!' + officesVm.officeDetail.enabled);
    }
  }
})();
