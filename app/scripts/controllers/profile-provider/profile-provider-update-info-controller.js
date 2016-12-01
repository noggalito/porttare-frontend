(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileProviderUpdateController', ProfileProviderUpdateController);

  function ProfileProviderUpdateController(ProfileProviderUpdateService,
                                   ModalService,
                                   $ionicLoading,
                                   $ionicPopup,
                                   $scope,
                                   $auth,
                                   $translate
        ) {
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

    providerProfileVm.profileProvider  = $auth.user.provider_profile;

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
        }
      ];
    });

    providerProfileVm.laborDays = [{
      label: 'Lunes',
      name: 'mon'
    },
      {
        label: 'Martes',
        name: 'tue'
      },
      {
        label: 'Miércoles',
        name: 'wed'
      },
      {
        label: 'Jueves',
        name: 'thu'
      },
      {
        label: 'Viernes',
        name: 'fri'
      },
      {
        label: 'Sábado',
        name: 'sat'
      },
      {
        label: 'Domingo',
        name: 'sun'
      }];
    function checked(element){
      providerProfileVm.touchedPayments = true;
      providerProfileVm.checkedItems = 0;
      if(element.checked){
        providerProfileVm.checkedItems--;
      }else{
        providerProfileVm.checkedItems++;
      }
      providerProfileVm.providerProfileForm.formas_pago.$invalid = providerProfileVm.checkedItems > 0;
    }

    function checkedBank(element){
      if (element.checked) {
        providerProfileVm.accountType.map(function(row){
          providerProfileVm.banco_tipo_cuenta=providerProfileVm.accountType;
          if (row !== element) {
            row.checked = false;
          }
        });
      }
    }
    function editProfile() {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });
      providerProfileVm.profileProvider.formas_de_pago = providerProfileVm.methodsPayment.filter(function(row){
        return row.checked;
      }).map(function(row){
        return row.value;
      });
      ProfileProviderUpdateService.updateProfileProvider(providerProfileVm.profileProvider)
        .then(function success(resp) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Éxito',
            template: '{{::("provider.successUpdateProfileProvider"|translate)}}'
          });
          providerProfileVm.profileProvider = angular.copy(providerProfileVm.profileProvider);
          closeModal();
        },
          function error(resp){
            providerProfileVm.messages = resp.status===422 ? resp.data.errors:undefined;
            $ionicLoading.hide();
          });
    }

    function showNewModal() {
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile-provider/edit.html'
      });
    }

    function showEditModal() {
      providerProfileVm.profileProvider = angular.copy(providerProfileVm.profileProvider);
      providerProfileVm.showNewModal();
    }

    function closeModal() {
      providerProfileVm.profileProvider = angular.copy(providerProfileVm.profileProvider);
      ModalService.closeModal();
      providerProfileVm.messages = {};

    }
  }
})();

