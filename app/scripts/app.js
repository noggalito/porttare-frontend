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
    .state('app.categories', {
      url: '/categories',
      abstract: true
    })
    .state('app.categories.index', {
      url: '/',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/category/index.html',
          controller: 'CategoriesController',
          controllerAs: 'categoryVm',
          resolve: {
            data: function (CategoriesService, $q, $ionicLoading, $ionicPopup) {
              $ionicLoading.show({
                template: 'cargando...'
              });
              return CategoriesService.getCategories()
                .then(function success(res) {
                  $ionicLoading.hide();
                  return res.data;
                }, function error(res) {
                  $ionicLoading.hide();
                  var message = res.data.error ? res.data.error :
                    'Hubo un error, intentalo nuevamente.';
                  $ionicPopup.alert({
                    title: 'Error',
                    template: message
                  });
                });
            }
          }
        }
      }
    })
    .state('app.categories.show', {
      url: '/:id',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/category/show.html',
          controller: 'CategoryController',
          controllerAs: 'categoryVm',
          resolve: {
            data: function () {

              //TODO remove this when we have the endpoint
              var providers = [
                {id: 1, 'razon_social': 'Empresa 1', imagen: '../images/ionic.png'},
                {id: 2, 'razon_social': 'Empresa 2', imagen: '../images/ionic.png'},
                {id: 3, 'razon_social': 'Empresa 3', imagen: '../images/ionic.png'},
                {id: 4, 'razon_social': 'Empresa 4', imagen: '../images/ionic.png'},
                {id: 5, 'razon_social': 'Empresa 5', imagen: '../images/ionic.png'}
              ];
              var responsedata = {
                category: {
                  titulo: 'Medicinas',
                  imagen: '../images/bg.png',
                  descripcion: 'Paracetamol, aspirinas, pastillas de dolor ' +
                    'de cabeza y muchas más, en un sólo lugar'
                },
                providers: providers
              };

              return responsedata;
            }
          }
        }
      },
      resolve: {
        data: function () {

          //TODO remove this when we have the endpoint
          var providers = [
            {id: 1, 'razon_social': 'Empresa 1', imagen: '../images/bg.png'},
            {id: 2, 'razon_social': 'Empresa 2', imagen: '../images/bg.png'},
            {id: 3, 'razon_social': 'Empresa 3', imagen: '../images/bg.png'},
            {id: 4, 'razon_social': 'Empresa 4', imagen: '../images/bg.png'},
            {id: 5, 'razon_social': 'Empresa 5', imagen: '../images/bg.png'}
          ];
          var responsedata = {
            category: {
              titulo: 'Medicinas',
              imagen: '../images/bg.png'
            },
            providers: providers
          };

          return responsedata;
        }
      }
    })
    .state('app.categories.provider', {
      url: '/:category_id/provider/:id',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/provider/show.html',
          controller: 'ProviderDetailController',
          controllerAs: 'providerDetVm',
        }
      }
    })
    .state('app.items', {
      url: '/items',
      abstract: true
    })
    .state('app.items.index', {
      url: '/',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/item/items.html',
          controller: 'ItemsController',
          controllerAs: 'itemsVm'
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
    .state('app.provider', {
      url: '/provider',
      abstract: true
    })
    .state('app.provider.welcome', {
      url: '/welcome',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/provider/welcome.html',
          controller: 'ProviderController',
          controllerAs: 'providerVm1',
        }
      }
    })
    .state('app.provider.new', {
      url: '/new',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/provider/new.html',
          controller: 'ProviderController',
          controllerAs: 'providerVm',
        }
      }
    })
    .state('app.products', {
      url: '/products',
      abstract: true
    })
    .state('app.products.index', {
      url: '/',
      views: {
        'menuContent@app': {
          templateUrl: 'templates/products/index.html',
          controller: 'ProductsController',
          controllerAs: 'productsVm',
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
