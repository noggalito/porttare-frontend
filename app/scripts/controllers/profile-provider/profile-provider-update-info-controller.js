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

    var transKeys = [
      'provider.methods.cash',
      'provider.methods.creditCard',
      'provider.bank.savings',
      'provider.bank.credit'
    ];
    init();

    function init(){
      providerProfileVm.profileProvider  = $auth.user.provider_profile;// jshint ignore:line
    }

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
          label: trans[transKeys[2]],
          checked: false
        },
        {
          value: 'Crédito',
          label: trans[transKeys[3]],
          checked: false
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
      if (element.checked) {
        providerProfileVm.accountType.map(function(row){
          if (row !== element) {
            row.checked = false;
          }
        });
      }
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
            providerProfileVm.errors = resp.errors;
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
