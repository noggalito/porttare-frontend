(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileInfoController', ProfileInfoController);

  function ProfileInfoController($auth,
                                 ModalService,
                                 ProfileService,
                                 $ionicLoading,
                                 $ionicPopup,
                                 $scope) {
    var piVm = this;
    piVm.showNewModal = showNewModal;
    piVm.closeModal = closeModal;
    piVm.submitProcess = submitProcess;
    piVm.messages = {};

    init();

    function init(){
      ProfileService.getProfile().then(function(res){
        piVm.user = res;
      });
    }

    function showNewModal() {
      piVm.userEdit = angular.copy(piVm.user);
      if(piVm.user.fecha_nacimiento){//jshint ignore: line
        var fecha_nac = moment(piVm.user.fecha_nacimiento, 'YYYY/MM/DD HH:mm Z');//jshint ignore: line
        piVm.userEdit.fecha_nacimiento = fecha_nac.toDate(); //jshint ignore: line
      }
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile/info/edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
    }

    function submitProcess(user){
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      $auth.updateAccount(user)
        .then(function(resp) {
          piVm.user = resp.data.data;
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("user.successUpdateProfile"|translate)}}'
          }).then(closeModal);
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    }

    $scope.$on('auth:account-update-error', function(ev, reason) {
      if (reason && reason.errors) {
        piVm.messages = reason.errors;
      }
      $ionicPopup.alert({
        title: 'Error',
        template:'{{::("globals.pleaseTryAgain"|translate)}}'
      });
    });
  }
})();
