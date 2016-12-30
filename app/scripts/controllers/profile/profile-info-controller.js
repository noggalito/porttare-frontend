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
    piVm.hasImageFile = hasImageFile;

    init();

    function init(){
      ProfileService.getProfile().then(function(res){
        piVm.user = res;
      });
    }

    function showNewModal() {
      piVm.userEdit = angular.copy(piVm.user);
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile/info/edit.html'
      });
    }

    function closeModal() {
      piVm.messages = {};
      ModalService.closeModal();
    }

    function submitProcess(user){
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      ProfileService.editProfile(user)
        .then(function(resp) {
          piVm.user = resp.data.data;
          $scope.$emit('currentUserUpdated', piVm.user);

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

    $scope.$on('auth:login-success', function(){
      piVm.user = $auth.user;
    });

    function hasImageFile(user){
      return ProfileService.hasImageFile(user);
    }
  }
})();
