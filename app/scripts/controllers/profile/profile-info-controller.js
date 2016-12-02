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
      piVm.userEdit= angular.copy(piVm.user);
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile/info/edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
    }

    function submitProcess(user){
      $auth.updateAccount(user)
        .then(function(response) {
          piVm.user = response.data.user;
          $ionicLoading.hide().then(function(){
            $ionicPopup.alert({
              title: 'Éxito',
              template: '{{::("user.successUpdateProfile"|translate)}}'
            }).then(function(){
              closeModal();
            });
          });
        })
        .catch(function() {
          $ionicPopup.alert({
            title: 'Error',
            template:'Hubo un error, inténtalo nuevamente.'
          });
          $ionicLoading.hide();
        });
    }

  }
})();
