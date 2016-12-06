(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('ProviderController', ProviderController);

  function ProviderController(ProfileService,
                              ProviderService,
                              ModalService,
                              $translate,
                              $ionicPopup,
                              $state,
                              $auth,
                              $ionicLoading,
                              $ionicScrollDelegate,
                              $scope) {
    var providerVm = this;
    initProvider();


    var stateRedirect = 'provider.items.index';
    var transKeys = [
      'provider.methods.cash',
      'provider.methods.creditCard',
      'provider.bank.savings',
      'provider.bank.credit'
    ];
    providerVm.submit = submit;
    providerVm.step = 1;
    providerVm.methodsPayment = [];
    providerVm.matrizProvider = {};
    providerVm.touchedPayments = false;
    providerVm.checked = checked;
    providerVm.checkedBank = checkedBank;
    providerVm.showNewModal = showNewModal;
    providerVm.showEditModal=showEditModal;
    providerVm.closeModal = closeModal;
    providerVm.edit = editProfile;
    providerVm.type='';

    providerVm.laborDays = [{
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

    $translate(transKeys).then(function (trans) {
      providerVm.methodsPayment = [
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
      providerVm.accountType = [
        {
          value: 'Ahorros',
          label: trans[transKeys[2]]
        },
        {
          value: 'Crédito',
          label: trans[transKeys[3]]
        }
      ];
    });

    function initProvider(){
      providerVm.profileProvider  = $auth.user.provider_profile;
      providerVm.provider = {};
      providerVm.provider.representante_legal = $auth.user.name;
      providerVm.provider.email = $auth.user.email;
    }

    function checked(element){
      providerVm.touchedPayments = true;
        if (!element.checked) {
          providerVm.methodsPayment.map(function(row){
            if (row !== element) {
              row.checked == false?
                providerVm.providerProfileForm.methodsPayment.$invalid=true :
                providerVm.providerProfileForm.methodsPayment.$invalid=false ;
            }
          });
        }
    }

    function checkedBank(element){
      providerVm.type=element.value;
    }

    function createOffice(office){
      var newOffice = angular.copy(office);
      newOffice.hora_de_apertura = moment(newOffice.hora_de_apertura).format('H:m Z');
      newOffice.hora_de_cierre = moment(newOffice.hora_de_cierre).format('H:m Z');
      newOffice.inicio_de_labores = newOffice.inicio_de_labores && newOffice.inicio_de_labores.name;
      newOffice.final_de_labores = newOffice.final_de_labores && newOffice.final_de_labores.name;
      return newOffice;
    }

    function createProvider() {
      $ionicLoading.show({
        template: 'enviando...'
      });

      var objectToSend = angular.copy(providerVm.provider);
      objectToSend.formas_de_pago = providerVm.methodsPayment.filter(function(row){
        return row.checked;
      }).map(function(row){
        return row.value;
      });

      objectToSend.offices_attributes = [createOffice(providerVm.matrizProvider)];
      ProviderService.createNewProvider(objectToSend)
        .then(function success(provider) {
          //update auth user
          $auth.user.provider_profile = provider.provider_profile;
          $ionicLoading.hide();
          $state.go(stateRedirect).then(function(){
            $ionicPopup.alert({
              title: 'Alerta',
              template: 'Proveedor creado satisfactoriamente'
            });
          });
        },
        function error(responseError) {
          providerVm.errors = responseError.errors;
          $ionicLoading.hide();
          providerVm.step = 1;
        });
    }

    function submit() {
      if(providerVm.step === 2){
        createProvider();
      }
      providerVm.step += 1;
      $ionicScrollDelegate.scrollTop();
    }

    function editProfile(profileEdit) {
      $ionicLoading.show({
        template: '{{::("globals.updating"|translate)}}'
      });

      profileEdit.formas_de_pago = providerVm.methodsPayment.filter(function(row){//jshint ignore:line
        return row.checked;
      }).map(function(row){
        return row.value;
      });

      if (providerVm.type!=='') {
        profileEdit.banco_tipo_cuenta = providerVm.type;//jshint ignore:line
      }

      ProfileService.updateProfileProvider(profileEdit)
        .then(function success(resp) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Éxito',
              template: '{{::("provider.successUpdateProfileProvider"|translate)}}'
            });
            providerVm.profileProvider = resp.provider_profile;//jshint ignore:line
            closeModal();
          },
          function error(resp){
            providerVm.errors = resp;
            $ionicLoading.hide();
          });
    }

    function showEditModal() {
      providerVm.showNewModal();
    }

    function showNewModal() {
      providerVm.profileEdit = angular.copy(providerVm.profileProvider);
      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/profile-provider/edit.html'
      });
    }

    function closeModal() {
      ModalService.closeModal();
    }
  }
})();
