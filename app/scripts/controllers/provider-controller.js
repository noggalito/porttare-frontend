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
    providerVm.providerForm = {
      forma_de_pago: []
    };
    providerVm.messages = {
      required: 'Este campo es requerido',
      onlyNumbers: 'Solo se permiten números',
      invalidEmail: 'Correo electrónico inválido'
    };
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
      if (providerVm.providerForm.forma_de_pago
        .indexOf(method.value) === -1) {
        providerVm.providerForm.forma_de_pago.push(method.value);
      } else {
        providerVm.providerForm.forma_de_pago
          .splice(providerVm.providerForm.forma_de_pago.indexOf(method.value), 1);
      }
    };

    function createProvider() {
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
          $ionicPopup.alert({
            title: 'Error',
            template: resp.data.error ? resp.data.error :
              'Hubo un error, intentalo nuevamente.'
          });
        });
    }

  }
})();
