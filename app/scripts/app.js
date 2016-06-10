(function(){
  'use strict';
  angular.module('porttare', [
    'ionic',
    'ng-token-auth',
    'porttare.config',
    'porttare.controllers'
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

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl',
      //only logged users will allow to go to /app/*
      resolve: {
          currentUser: function($auth, $state) {
            $auth.validateUser().then(function(user){
              return user;
            }, function(){
              $state.go('login');
            });
          }
        }
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(function ($injector, $location) {
      if (isResetPassword($location.absUrl())) {
        return '/reset';
      } else {
        return '/login';
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
