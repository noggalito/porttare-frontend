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
    'ngFileUpload'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

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
