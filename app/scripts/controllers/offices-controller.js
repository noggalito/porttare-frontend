(function () {
'use strict';

  angular
    .module('porttare.controllers')
    .controller('OfficesController', OfficesController);

  function OfficesController($scope,
                             $ionicPopup,
                             $ionicLoading,
                             APP,
                             OfficesService,
                             ModalService,
                             ErrorHandlerService) {

    var officesVm = this;
    officesVm.showNewOffice = showNewOffice;
    officesVm.closeModal = closeModal;
    officesVm.submitOffice = submitOffice;
    getOffices();

    function getOffices() {
      OfficesService.getOffices().then(function(results){
        officesVm.offices = results.provider_offices; //jshint ignore:line
      }, ErrorHandlerService.handleCommonErrorGET);
    }

    function showNewOffice() {
      officesVm.office = buildNewOffice();
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/offices/new-edit.html'
      });
    }

    function buildNewOffice(){
      var newOffice = {
        weekdays_attributes: []
      };
      angular.forEach(APP.weekdays, function (wday){
        newOffice.weekdays_attributes.push({
          day: wday
        });
      });
      console.log(newOffice);
      // TODO why was this here?
      // newOffice.enabled = false;
      return newOffice;
    }

    function closeModal() {
      ModalService.closeModal();
      officesVm.messages = {};
    }

    function submitOffice(){
      if(officesVm.form.$valid){
        $ionicLoading.show({
          template: '{{::("globals.saving"|translate)}}'
        });
        OfficesService.createOffice(officesVm.office).then(function success(resp){
          $ionicLoading.hide().then(function(){
            officesVm.offices.push(resp.provider_office); //jshint ignore:line
            $ionicPopup.alert({
              title: 'Éxito',
              template: '{{::("office.officeSuccessSave"|translate)}}'
            }).then(function(){
              closeModal();
            });
          });
        }, function(response){
          officesVm.messages = response.status===422 ? response.data.errors:undefined;
          $ionicLoading.hide();
        });
      }
    }
  }
})();
