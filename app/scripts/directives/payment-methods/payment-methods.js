(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('paymentMethods', actionChecked);

  function actionChecked() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/payment-methods/payment-methods.html',
      scope: {
        profileForm: '=',
        methods:'=',
        touched:'='
      },
      controller: ['$translate', paymentMethodsController],
      controllerAs: 'checkedVm',
      bindToController: true
    };

    return directive;
  }

  function paymentMethodsController($translate) {
    var checkedVm = this;// jshint ignore:line
    checkedVm.checked=checked;

    var transKeys = [
      'provider.methods.cash',
      'provider.methods.creditCard'
    ];

    if (!Array.prototype.includes) {
      Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
          return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
          k = n;
        } else {
          k = len + n;
          if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
          currentElement = O[k];
          if (searchElement === currentElement ||
            (searchElement !== searchElement && currentElement !== currentElement)) {
            return true;
          }
          k++;
        }
        return false;
      };
    }

    $translate(transKeys).then(function (trans) {
      checkedVm.paymentMethods = [
        {
          value: 'efectivo',
          label: trans[transKeys[0]],
          checked: checkedVm.methods.includes('efectivo')
        },
        {
          value: 'tarjeta_credito',
          label: trans[transKeys[1]],
          checked: checkedVm.methods.includes('tarjeta_credito')
        }
      ];
    });

    function checked(element){
      checkedVm.touched = true;
      checkedVm.paymentMethods.map(function(row){
        if (row !== element) {
          if(row.checked === false && element.checked===false ){
            checkedVm.profileForm.paymentMethods.$invalid=true;
          }else{
            checkedVm.profileForm.paymentMethods.$invalid=false;
          }
        }
      });

      checkedVm.methods= checkedVm.paymentMethods.filter(function(row){
        return row.checked;
      }).map(function(row){
        return row.value;
      });
    }
  }
})();
