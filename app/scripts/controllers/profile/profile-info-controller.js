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
                                 $rootScope,
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
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile/info/edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
    }

    function submitProcess(user){
      $ionicLoading.show({template: '{{::("globals.sending"|translate)}}'});

      //$auth.updateAccount(user)
      ProfileService.editProfile(user)
        .then(function (response) {
          piVm.user = response.data.data;
          $rootScope.$broadcast('userUpdated', piVm.user);

          $ionicLoading.hide().then(function () {
            $ionicPopup.alert({
              title: 'Éxito',
              template: '{{::("user.successUpdateProfile"|translate)}}'
            }).then(closeModal);
          });
        })
        .catch(function error(resp) {
          if (resp.data && resp.data.errors) {
            piVm.messages = resp.data.errors;
          }
          $ionicLoading.hide();
        });
    }

  }
})();
