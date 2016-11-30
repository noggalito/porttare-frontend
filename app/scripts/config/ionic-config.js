(function () {
'use strict';

  angular
    .module('porttare')
    .config(ionicConfig);

  function ionicConfig($ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    // enable JS scrolling instead of native
    $ionicConfigProvider.scrolling.jsScrolling(true);
  }
})();
