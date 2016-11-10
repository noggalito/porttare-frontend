(function () {
  'use strict';

  angular
    .module('porttare.filters')
    .filter('age', age);

  function age() {
    return function (value) {
      var years = moment().diff(value, 'years',false);
      return years;
   };
  }

})();
