(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProviderDetailController', ProviderDetailController);

  function ProviderDetailController() {
    var providerDetVm = this;

    providerDetVm.provider = {id: 1, name: 'provider1', imagen: '../images/bg.png'};
  }
})();
