(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('methodsPayment', actionChecked);

  function actionChecked() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/methods-payment/methods-payment.html',
      controller: ['$translate','$scope',methodsPaymentController],
      scope: {
        vm: '='
      },
      controllerAs: 'checkedVm'
    };

    return directive;
  }

  function methodsPaymentController($translate,$scope) {
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
      $scope.vm.touchedPayments = true;
      checkedVm.methodsPayment.map(function(row){
        if (row !== element) {
          if(row.checked === false && element.checked===false ){
            $scope.vm.providerProfileForm.methodsPayment.$invalid=true;
          }else{
            $scope.vm.providerProfileForm.methodsPayment.$invalid=false;
          }
        }
      });

      $scope.vm.methodsPayment= checkedVm.methodsPayment.filter(function(row){
        return row.checked;
      }).map(function(row){
        return row.value;
      });
    }
  }
})();
