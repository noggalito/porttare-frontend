(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('methodsPayment', actionChecked);

  function actionChecked() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/methods-payment/methods-payment.html',
      scope: {
        profileForm: '=',
        methods:'=',
        touched:'='
      },
      controller: methodsPaymentController,
      controllerAs: 'checkedVm',
      bindToController: true
    };

    return directive;
  }

  function methodsPaymentController($translate) {
    var checkedVm = this;// jshint ignore:line
    checkedVm.checked=checked;

    var transKeys = [
      'provider.methods.cash',
      'provider.methods.creditCard'
    ];

    $translate(transKeys).then(function (trans) {
      checkedVm.methodsPayment = [
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

    function checked(element){
      checkedVm.touched = true;
      checkedVm.methodsPayment.map(function(row){
        if (row !== element) {
          if(row.checked === false && element.checked===false ){
            checkedVm.profileForm.methodsPayment.$invalid=true;
          }else{
            checkedVm.profileForm.methodsPayment.$invalid=false;
          }
        }
      });

      checkedVm.methods= checkedVm.methodsPayment.filter(function(row){
        return row.checked;
      }).map(function(row){
        return row.value;
      });
    }
  }
})();
