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
                              $ionicScrollDelegate) {
    var providerVm = this;
    var stateRedirect = 'provider.items';
    var transKeys = [
      'provider.methods.cash',
      'provider.methods.creditCard'
    ];
    providerVm.submit = submit;
    providerVm.step = 1;
    providerVm.methodsPayment = [];
    providerVm.matrizProvider = {};
    providerVm.matrizProvider.horario = new Date();
    providerVm.touchedPayments = false;

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
    });

    providerVm.checked = function(element){
      providerVm.touchedPayments = true;
      providerVm.checkedItems = 0;
      if(element.checked){
        providerVm.checkedItems--;
      }else{
        providerVm.checkedItems++;
      }
      providerVm.providerForm.methodsPayment.$invalid = providerVm.checkedItems > 0;
      console.log(providerVm.providerForm.methodsPayment.$invalid);
    };

    function createProvider() {
      $ionicLoading.show({
        template: 'enviando...'
      });

      providerVm.providerForm.formas_de_pago = providerVm.methodsPayment.filter(function(row){
        return row.checked;
      }).map(function(row){
        return row.value;
      }).join(',');

      providerVm.providerForm.offices = [providerVm.matrizProvider];
      ProviderService.createNewProvider(providerVm.providerForm)
        .then(function success() {
          $ionicLoading.hide();
          $state.go(stateRedirect).then(function(){
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
      $ionicScrollDelegate.scrollTop();
    }

  }
})();
