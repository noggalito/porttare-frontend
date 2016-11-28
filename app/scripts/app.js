(function(){
  'use strict';
  angular.module('porttare', [
    'ionic',
    'ng-token-auth',
    'porttare.config',
    'porttare.controllers',
    'porttare.services',
    'porttare.directives',
    'porttare.translations',
    'porttare.filters',
    'ngCordova',
    'slickCarousel',
    'ngFileUpload',
    'ngMessages',
    'ion-datetime-picker'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova &&
          window.cordova.plugins &&
          window.cordova.plugins.Keyboard) {
        // show accessory bar and enable scrolling
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(false);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });

  angular.module('porttare.config', []);
  angular.module('porttare.controllers', []);
  angular.module('porttare.directives', []);
  angular.module('porttare.services', []);
  angular.module('porttare.filters', []);
})();
