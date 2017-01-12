(function () {
  'use strict';

  angular
    .module('porttare')
    .run(statusBarConfig);

  function statusBarConfig($rootScope){
    document.addEventListener(
      'deviceready',
      styleDefaultStatusBar,
      false
    );
    $rootScope.$on(
      'porttare:styleDefaultStatusBar',
      styleDefaultStatusBar
    );

    function styleDefaultStatusBar() {
      if (!window.cordova) { return; }
      if (cordova.platformId === 'android') {
        window.StatusBar.backgroundColorByHexString('#FDC30D');
      } else {
        window.StatusBar.styleDefault();
        window.StatusBar.styleLightContent();
      }
    }
  }
})();
