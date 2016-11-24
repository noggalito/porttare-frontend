(function () {
'use strict';

  angular
    .module('porttare')
    .config(scrollingConfig);

  function scrollingConfig($ionicConfigProvider) {
    // enable JS scrolling instead of native
    $ionicConfigProvider.scrolling.jsScrolling(true);
  }
})();
