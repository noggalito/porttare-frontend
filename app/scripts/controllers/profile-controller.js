/*jshint camelcase: false */
(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileController', ProfileController);

  function ProfileController($auth,
                            ModalService,
                            ProfileService,
                            $ionicLoading,
                            $ionicPopup,
                            $scope) {
    var profileVm = this;
    profileVm.showNewModal = showNewModal;
    profileVm.closeModal = closeModal;
    profileVm.submitProcess = submitProcess;
    profileVm.messages = {};
    init();

    function init(){
      ProfileService.getProfile().then(function(res){
        profileVm.user = res;
      });
    }

    function showNewModal() {
      profileVm.userEdit= angular.copy(profileVm.user);
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile/edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
    }

    function submitProcess(user){
      $auth.updateAccount(user)
        .then(function() {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("user.successUpdateProfile"|translate)}}'
          });
          closeModal();
        })
        .catch(function() {
          $ionicPopup.alert({
            title: 'Error',
            template:'Hubo un error, intentalo nuevamente.'
          });
          $ionicLoading.hide();
        });
    }
  }
})();
