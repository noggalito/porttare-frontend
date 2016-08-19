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
    'ngCordova'
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
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
      url: '/login',
      controller: 'LoginController',
      controllerAs: 'loginVm',
      templateUrl: 'templates/login/login.html'
    })

    .state('register', {
      url: '/register',
      controller: 'RegisterController',
      controllerAs: 'registerVm',
      templateUrl: 'templates/register/register.html'
    })
    .state('reset', {
      url: '/reset',
      controller: 'ResetController',
      controllerAs: 'resetVm',
      templateUrl: 'templates/reset/reset.html'
    })
    .state('send', {
      url: '/send',
      controller: 'ResetController',
      controllerAs: 'resetVm',
      templateUrl: 'templates/reset/send.html'
    })
    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/intro/intro.html',
      controller: 'IntroController',
      controllerAs: 'introVm'
    })
    .state('prelogin', {
      url: '/prelogin',
      templateUrl: 'templates/prelogin/prelogin.html',
      controller: 'PreController',
      controllerAs: 'preVm'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu/menu.html',
      controller: 'AppCtrl',
      //only logged users will allow to go to /app/*
      resolve: {
          currentUser: function($auth, $state) {
            $auth.validateUser().then(function(user){
              return user;
            }, function(){
              $state.go('prelogin');
            });
          }
        }
    })
    .state('app.category', {
      url: '/category',
      views: {
        'menuContent': {
          templateUrl: 'templates/category/category.html',
          controller: 'CategoryController',
          controllerAs: 'categoryVm',
        }
      }
    })
    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map/map.html',
          controller: 'MapController',
          controllerAs: 'mapVm',
        }
      }
    })
    .state('app.welcome_provider', {
      url: '/welcome_provider',
      views: {
        'menuContent': {
          templateUrl: 'templates/provider/welcome.html'
        }
      }
    })
    .state('app.provider', {
      url: '/provider',
      views: {
        'menuContent': {
          templateUrl: 'templates/provider/new.html',
          controller: 'ProviderController',
          controllerAs: 'providerVm',
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector, $location) {
      if (isResetPassword($location.absUrl())) {
        return '/reset';
      } else {
        return '/prelogin';
      }
    });

    function isResetPassword(href) {
      var param = href.match(/reset_password=([^&]+)/);
      return (param && param[1] === 'true') ? true : false;
    }
  });

  angular.module('porttare.config', []);
  angular.module('porttare.controllers', []);
})();
