(function () {
  'use strict';

  angular
    .module('porttare.filters')
    .filter('customDate', customDate);

  function customDate() {
    return function (currentValue, formatStr) {
      var _date = new Date(currentValue);
      return moment(_date).format(formatStr);
    };
  }

})();
