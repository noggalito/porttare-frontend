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
                            $filter,
                            GeolocationService) {

    var officesVm = this;
    officesVm.showEditModal = showEditModal;
    officesVm.showDeleteModal = showDeleteModal;
    officesVm.closeModal = closeModal;
    officesVm.submitModal = submitModal;
    officesVm.submitDeleteModal = submitDeleteModal;
    initOffice($localStorage.getObject('office'));
    initMap();

    function initMap(){
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>{{::("globals.loading"|translate)}}...!'}
      );
      GeolocationService.getCurrentPosition().then(function success(position){
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false
        };
        new google.maps.Map(document.getElementById('map'), mapOptions);
        $ionicLoading.hide();
      },function(resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data.error ? resp.data.error : '{{::("globals.pleaseTryAgain"|translate)}}'
          });
      });
    }

    function initOffice(office){
      officesVm.officeDetail = office;
      convertStringToDate();
    }

    function convertStringToDate(){
      var date = $filter('date')(new Date(), 'yyyy/MM/dd');
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
      officesVm.office = angular.copy(officesVm.officeDetail);
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
      loading();
      OfficesService.deleteOffice(officesVm.office).then(function success(resp){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Éxito',
          template: '{{::("office.officeSuccessDelete"|translate)}} {{::("office.officeSuccess"|translate|uppercase)}}'
        });
        initOffice(resp.provider_office); //jshint ignore:line
        officesVm.closeModal();
      }, error);
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
