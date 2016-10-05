(function () {
  'use strict';

  angular
    .module('porttare.filters')
    .filter('customDate', customDate);

  function customDate() {
    return function (currentValue, formatStr) {
      return moment(currentValue).format(formatStr);
    };
  }

})();
