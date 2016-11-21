'use strict';

angular
  .module('porttare.config')
  .config(routes);

function routes($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    controller: 'LoginController',
    controllerAs: 'loginVm',
    templateUrl: 'templates/login/login.html',
    resolve: {
      auth: accessIfUserNotAuth
    }
  })

  .state('register', {
    url: '/register',
    controller: 'RegisterController',
    controllerAs: 'registerVm',
    templateUrl: 'templates/register/register.html',
    resolve: {
      auth: accessIfUserNotAuth
    }
  })
  .state('reset', {
    url: '/reset',
    controller: 'ResetController',
    controllerAs: 'resetVm',
    templateUrl: 'templates/reset/reset.html',
    resolve: {
      auth: accessIfUserAuth
    }
  })
  .state('send', {
    url: '/send',
    controller: 'ResetController',
    controllerAs: 'resetVm',
    templateUrl: 'templates/reset/send.html',
    resolve: {
      auth: accessIfUserNotAuth
    }
  })
  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro/intro.html',
    controller: 'IntroController',
    controllerAs: 'introVm',
    resolve: {
      auth: accessIfUserNotAuth
    }
  })
  .state('prelogin', {
    url: '/prelogin',
    templateUrl: 'templates/prelogin/prelogin.html',
    controller: 'PreController',
    controllerAs: 'preVm',
    resolve: {
      auth: accessIfUserNotAuth
    }
  })
  .state('error', {
    url: '/error',
    templateUrl: 'templates/error/error.html',
    controller: 'ErrorController',
    controllerAs: 'errVm'
  })
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu/menu.html',
    //only logged users will allow to go to /app/*
    resolve: {
      currentUser: accessIfUserAuth
    }
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profileVm'
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
              template: '{{::("globals.loading"|translate)}}'
            });
            return CategoriesService.getCategories()
              .then(function success(res) {
                $ionicLoading.hide();
                return res.data;
              }, function error(res) {
                $ionicLoading.hide();
                var message = res.data.error ? res.data.error :
                  '{{::("globals.pleaseTryAgain"|translate)}}';
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
          data: function ($ionicLoading, $stateParams, $ionicPopup, CategoryService) {
            $ionicLoading.show({
              template: '{{::("globals.loading"|translate)}}'
            });

            var categoryId = $stateParams.id;

            return CategoryService.getCategoryProviders(categoryId)
              .then(function success(res) {
                $ionicLoading.hide();
                return res.data;
              }, function error(res) {
                $ionicLoading.hide();
                var message = res.data.error ? res.data.error :
                  '{{::("globals.pleaseTryAgain"|translate)}}';
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
  .state('app.categories.provider', {
    url: '/:category_id/provider/:id',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/provider/show.html',
        controller: 'ProviderDetailController',
        controllerAs: 'providerDetVm'
      }
    }
  })
  .state('app.items', {
    url: '/items',
    abstract: true
  })
  .state('app.clients', {
    url: '/clients',
    abstract: true
  })
  .state('app.clients.index', {
    url: '/',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/client/clients.html',
        controller: 'ClientsController',
        controllerAs: 'clientsVm'
      }
    }
  })
  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map/map.html',
        controller: 'MapController',
        controllerAs: 'mapVm'
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
        controllerAs: 'providerVm1'
      }
    }
  })
  .state('app.provider.new', {
    url: '/new',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/provider/new.html',
        controller: 'ProviderController',
        controllerAs: 'providerVm'
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
        controllerAs: 'productsVm'
      }
    }
  })
  .state('provider', {
    url: '/provider',
    abstract: true,
    templateUrl: 'templates/menu/menu-provider.html'
  })
  .state('provider.items', {
    url: '/items',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/item/items.html',
        controller: 'ItemsController',
        controllerAs: 'itemsVm'
      }
    }
  })
  .state('app.courier', {
    url: '/courier',
    abstract: true
  })
  .state('app.courier.welcome', {
    url: '/welcome',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/courier/welcome.html',
        controller: 'CourierController',
        controllerAs: 'courierWelVm'
      }
    }
  })
  .state('app.courier.new', {
    url: '/new',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/courier/new.html',
        controller: 'CourierController',
        controllerAs: 'courierVm'
      }
    }
  })
  .state('courier', {
    url: '/courier',
    abstract: true,
    templateUrl: 'templates/menu/menu-courier.html'
  })
  .state('courier.orders', {
    url: '/orders',
    views: {
      'menuContent@courier': {
        templateUrl: 'templates/courier/orders.html'
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

  function accessIfUserNotAuth($auth, $state, $ionicLoading, APP) {
    $auth.validateUser()
      .then(function userAuthorized() {
        $state.go(APP.successState).then(function () {
          $ionicLoading.hide();
        });
      }, function userNotAuthorized() {
        return;
      });
  }

  function accessIfUserAuth($auth, $state, $ionicLoading, APP) {
    $auth.validateUser()
      .then(function userAuthorized(user) {
        return user;
      }, function userNotAuthorized() {
        $state.go(APP.preloginState).then(function () {
          $ionicLoading.hide();
        });
      });
  }
}
