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
    var stateRedirect = 'provider.items';
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
    providerVm.matrizProvider.hora_de_apertura = new Date();
    providerVm.matrizProvider.hora_de_cierre = new Date();
    providerVm.dayNames = APP.abbrDays;
    providerVm.cities = APP.cities;
    //preselect selects on view;
    providerVm.matrizProvider.inicio_de_labores = providerVm.dayNames[0];
    providerVm.matrizProvider.final_de_labores = providerVm.dayNames[6];
    providerVm.matrizProvider.ciudad = providerVm.cities[0];

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
      providerVm.providerForm.offices_attributes = [providerVm.matrizProvider];
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
        function error(err) {
          $ionicLoading.hide();
          var defaultMessage = 'Hubo un error enviando la información.',
              messsage = '',
              hasData = !!err.data,
              isObject = hasData ? angular.isObject(err.data.errors) : false;
          if (isObject) {
            messsage = nestedMessages(err.data.errors);
          }else{
            messsage = hasData ? err.data.errors[0] : defaultMessage;
          }
          $ionicPopup.alert({
            title: 'Error',
            template: messsage
          });
          providerVm.step = 1;
        });
    }

    function nestedMessages(errors) {
      var messages = [];
      angular.forEach(errors, function(value, key) {
        messages.push('<div>' + key + ': ' + value + '</div>');
      });
      messages = messages.join('\n');
      return messages;
    }

    function submit() {
      if(providerVm.step === 2){
        createProvider();
      }
      providerVm.step += 1;
    }

  }
})();
