(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProviderController', ProviderController);

  function ProviderController(ProviderService) {
    var providerVm = this;
    providerVm.createProvider = createProvider;
    providerVm.providerForm = {};

    function createProvider() {
      ProviderService.createNewProvider(providerVm.providerForm)
        .then(function success() {

        },
        function error() {

        });
    }

  }
})();
