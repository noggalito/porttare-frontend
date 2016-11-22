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

    function checked(element){
      providerVm.touchedPayments = true;
      providerVm.checkedItems = 0;
      if(element.checked){
        providerVm.checkedItems--;
      }else{
        providerVm.checkedItems++;
      }
      providerVm.providerForm.methodsPayment.$invalid = providerVm.checkedItems > 0;
    }

    function checkedBank(element){
      if (element.checked) {
        providerVm.accountType.map(function(row){
          if (row !== element) {
            row.checked = false;
          }
        });
      }
    }

    function createOffice(office){
      var objectToReturn = angular.copy(office);
      objectToReturn.hora_de_apertura = moment(objectToReturn.hora_de_apertura).format('H:M Z');
      objectToReturn.hora_de_cierre = moment(objectToReturn.hora_de_cierre).format('H:M Z');
      objectToReturn.inicio_de_labores = objectToReturn.inicio_de_labores.name;
      objectToReturn.final_de_labores = objectToReturn.final_de_labores.name;
      return objectToReturn;
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
      }).join(',');

      objectToSend.offices = [createOffice(providerVm.matrizProvider)];
      ProviderService.createNewProvider(objectToSend)
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
