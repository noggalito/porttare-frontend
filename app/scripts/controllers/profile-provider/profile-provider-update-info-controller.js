(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileProviderUpdateController', ProfileProviderUpdateController);

  function ProfileProviderUpdateController(ProfileService,
                                           ModalService,
                                           $ionicLoading,
                                           $ionicPopup,
                                           $scope,
                                           $auth) {
    var providerProfileVm = this;
    providerProfileVm.showNewModal = showNewModal;
    providerProfileVm.showEditModal = showEditModal;
    providerProfileVm.closeModal = closeModal;
    providerProfileVm.edit = editProfile;
    providerProfileVm.touchedPayments=false;
    providerProfileVm.methodsPayment=[];
    providerProfileVm.profileEdit={};
    providerProfileVm.profileProvider  = $auth.user.provider_profile;// jshint ignore:line

    function editProfile(profileEdit) {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });

      profileEdit.formas_de_pago = providerProfileVm.methodsPayment;//jshint ignore:line

      ProfileService.updateProfileProvider(profileEdit)
        .then(function success(resp) {
          $ionicLoading.hide();
          providerProfileVm.profileProvider = resp.provider_profile;//jshint ignore:line
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("provider.successUpdateProfileProvider"|translate)}}'
          }).then(closeModal);
        },
        function error(resp){
          providerProfileVm.errors = resp;
          $ionicLoading.hide();
        });
    }

    function showNewModal() {
      providerProfileVm.profileEdit = angular.copy(providerProfileVm.profileProvider);
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile-provider/edit.html'
      });
    }

    function showEditModal() {
      providerProfileVm.showNewModal();
    }

    function closeModal() {
      ModalService.closeModal();
    }
  }
})();
