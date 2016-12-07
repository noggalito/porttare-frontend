(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('accountType', actionRadioButton);

  function actionRadioButton() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/account-type/account-type.html',
      scope: {
        providerProfileVm: '='
      },
      controller: accountTypeController,
      controllerAs: 'radioButtonVm',
      bindToController: true
    };

    return directive;
  }

  function accountTypeController($translate) {
    var radioButtonVm=this;// jshint ignore:line
    radioButtonVm.radioButtonBank = radioButtonBank;

    var transKeys = [
      'provider.bank.savings',
      'provider.bank.credit'
    ];

    $translate(transKeys).then(function (trans) {
      radioButtonVm.accountType = [
        {
          value: 'Ahorros',
          label: trans[transKeys[0]]
        },
        {
          value: 'Crédito',
          label: trans[transKeys[1]]
        }];
    });

    function radioButtonBank(element){
      radioButtonVm.providerProfileVm.type=element.value;
    }
  }
})();

