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
                                   $auth,
                                   $translate) {
    var providerProfileVm = this;
    providerProfileVm.showNewModal = showNewModal;
    providerProfileVm.showEditModal = showEditModal;
    providerProfileVm.closeModal = closeModal;
    providerProfileVm.edit = editProfile;
    providerProfileVm.methodsPayment = [];
    providerProfileVm.touchedPayments = false;
    providerProfileVm.checked = checked;
    providerProfileVm.checkedBank = checkedBank;
    providerProfileVm.type='';
    var transKeys = [
      'provider.methods.cash',
      'provider.methods.creditCard',
      'provider.bank.savings',
      'provider.bank.credit'
    ];

    providerProfileVm.profileProvider  = $auth.user.provider_profile;// jshint ignore:line

    $translate(transKeys).then(function (trans) {
      providerProfileVm.methodsPayment = [
        {
          value: 'efectivo',
          label: trans[transKeys[0]],
          checked: false
        },
        {
          value: 'tarjeta_credito',
          label: trans[transKeys[1]],
          checked: false
        }
      ];
      providerProfileVm.accountType = [
        {
          value: 'Ahorros',
          label: trans[transKeys[2]]
        },
        {
          value: 'Crédito',
          label: trans[transKeys[3]]
        }];
    });

    function checked(element){
      providerProfileVm.touchedPayments = true;
      providerProfileVm.checkedItems = 0;
      if(element.checked){
        providerProfileVm.checkedItems--;
      }else{
        providerProfileVm.checkedItems++;
      }
      providerProfileVm.providerProfileForm.formasPago.$invalid = providerProfileVm.checkedItems > 0;
    }

    function checkedBank(element){
      providerProfileVm.type=element.value;
    }

    function editProfile(profileEdit) {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });

      profileEdit.formas_de_pago = providerProfileVm.methodsPayment.filter(function(row){//jshint ignore:line
        return row.checked;
      }).map(function(row){
        return row.value;
      });

      if (providerProfileVm.type!=='') {
        profileEdit.banco_tipo_cuenta = providerProfileVm.type;//jshint ignore:line
      }

      ProfileService.updateProfileProvider(profileEdit)
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("provider.successUpdateProfileProvider"|translate)}}'
          });
            providerProfileVm.profileProvider = resp.provider_profile;//jshint ignore:line
            closeModal();
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
