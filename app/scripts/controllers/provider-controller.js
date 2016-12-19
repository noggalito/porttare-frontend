(function () {
  'use strict';
  /*jshint camelcase:false */
  angular
    .module('porttare.controllers')
    .controller('ProviderController', ProviderController);

  function ProviderController(ProviderService,
                              $ionicPopup,
                              $state,
                              $auth,
                              $filter,
                              $ionicLoading,
                              $ionicScrollDelegate) {
    var providerVm = this;
    initProvider();

    var stateRedirect = 'provider.items.index';
    providerVm.submit = submit;
    providerVm.step = 1;
    providerVm.paymentMethods = [];
    providerVm.matrizProvider = {};
    providerVm.touchedPayments = false;
    providerVm.removeImage = removeImage;
    // TODO translate:
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

    function initProvider(){
      providerVm.provider = {};
      providerVm.provider.representante_legal = $auth.user.name;
      providerVm.provider.email = $auth.user.email;
    }

    function removeImage(){
      providerVm.provider.logotipo = null;
    }

    function createOffice(office){
      var newOffice = angular.copy(office);
      newOffice.hora_de_apertura = $filter('formatDate')(
        newOffice.hora_de_apertura,
        'H:m Z'
      );
      newOffice.hora_de_cierre = $filter('formatDate')(
        newOffice.hora_de_cierre,
        'H:m Z'
      );
      newOffice.inicio_de_labores = newOffice.inicio_de_labores && newOffice.inicio_de_labores.name;
      newOffice.final_de_labores = newOffice.final_de_labores && newOffice.final_de_labores.name;
      return newOffice;
    }

    function createProvider() {
      $ionicLoading.show({
        template: 'enviando...'
      });

      var objectToSend = providerVm.provider;
      objectToSend.formas_de_pago = providerVm.paymentMethods;

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

  }
})();
