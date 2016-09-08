(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProviderDetailController', ProviderDetailController);

  function ProviderDetailController() {
    var providerDetVm = this;

    providerDetVm.provider = {
      id: 1,
      name: 'provider1',
      image: '../images/bg.png',
      horary: '07h00 - 18h00',
      available: true,
      description: 'restaurant',
      products:[
        {
          id: 1,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        },{
          id: 1,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        },{
          id: 1,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        },{
          id: 1,
          image: '../images/bg.png',
          price: '$2,00',
          description: 'Cerveza 750ml'
        }
      ]
    };
  }
})();
