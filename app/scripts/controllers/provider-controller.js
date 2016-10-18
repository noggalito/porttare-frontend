(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('ProviderController', ProviderController);

  function ProviderController(ProviderService,
                              $translate,
                              $ionicPopup,
                              $state,
                              $ionicLoading,
                              APP) {
    var providerVm = this;
    var successState = APP.successState;
    var transKeys = [
      'provider.methods.cash',
      'provider.methods.creditCard'
    ];
    providerVm.toggleCheck = toggleCheck;
    providerVm.submit = submit;
    providerVm.providerForm = {};
    providerVm.step = 1;
    providerVm.selections = [];
    providerVm.methodsPayment = [];
    providerVm.matrizProvider = {};
    providerVm.matrizProvider.horario = new Date();
    $translate(transKeys).then(function (trans) {
      providerVm.methodsPayment = [
        {
          value: 'efectivo',
          label: trans[transKeys[0]]
        },
        {
          value: 'tarjeta_credito',
          label: trans[transKeys[1]]
        }
      ];
    });

    function toggleCheck(method) {
      if (providerVm.selections.indexOf(method.value) === -1) {
        providerVm.selections.push(method.value);
      } else {
        providerVm.selections.splice(providerVm.selections.indexOf(method.value), 1);
      }
    }

    function createProvider() {
      $ionicLoading.show({
        template: 'enviando...'
      });
      if(providerVm.selections.length > 0){
        providerVm.providerForm.forma_de_pago = providerVm.selections.join(',');
      }

      providerVm.providerForm.offices = [providerVm.matrizProvider];

      ProviderService.createNewProvider(providerVm.providerForm)
        .then(function success() {
          $ionicLoading.hide();
          $state.go(successState).then(function(){
            $ionicPopup.alert({
              title: 'Alerta',
              template: 'Proveedor creado satisfactoriamente'
            });
          });
        },
        function error() {
          $ionicLoading.hide();
          providerVm.step = 1;
        });
    }

    function submit() {
      if(providerVm.step === 2){
        createProvider();
      }
      providerVm.step += 1;
    }

  }
})();
