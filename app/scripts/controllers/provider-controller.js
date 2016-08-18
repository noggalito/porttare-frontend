(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('ProviderController', ProviderController);

  function ProviderController(ProviderService, $ionicPopup, $state) {
    var providerVm = this;
    var successState = 'app.category';
    providerVm.createProvider = createProvider;
    providerVm.providerForm = {};
    providerVm.messages={};
    providerVm.selections = [];
    providerVm.methodsPayment = [
      {
        value: 'efectivo',
        label: 'Efecivo'
      },
      {
        value: 'tarjeta_credito',
        label: 'Tarjeta de crédito'
      }
    ];

    providerVm.toggleCheck = function (method) {
      if (providerVm.selections.indexOf(method.value) === -1) {
        providerVm.selections.push(method.value);
      } else {
        providerVm.selections.splice(providerVm.selections.indexOf(method.value), 1);
      }
    };

    function createProvider() {
      if(providerVm.selections.length > 0){
        providerVm.providerForm.forma_de_pago = providerVm.selections.join(',');
      }
      ProviderService.createNewProvider(providerVm.providerForm)
        .then(function success() {
          $state.go(successState).then(function(){
            $ionicPopup.alert({
              title: 'Alerta',
              template: 'Proveedor creado satisfactoriamente'
            });
          });
        },
        function error(resp) {
          if (resp.data.errors) {
            providerVm.messages = resp.data.errors;
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resp.data.error ? resp.data.error :
                'Hubo un error, intentalo nuevamente.'
            });
          }
        });
    }

  }
})();
