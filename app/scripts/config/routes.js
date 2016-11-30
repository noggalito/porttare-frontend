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
    controller: 'MenuController',
    controllerAs: 'menuVm',
    //only logged users will allow to go to /app/*
    resolve: {
      currentUser: accessIfUserAuth,
      categories: function (CategoriesService, $q, $ionicLoading, $ionicPopup, ErrorHandlerService) {
        $ionicLoading.show({
          template: '{{::("globals.loading"|translate)}}'
        });
        return CategoriesService.getCategories()
          .then(function success(res) {
            $ionicLoading.hide();
            return res.data;
          }, ErrorHandlerService.handleCommonErrorGET);
      }
    }
  })
  .state('app.cart', {
    url: '/cart',
    abstract: true
  })
  .state('app.cart.index', {
    url: '/',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/cart/index.html',
        controller: 'CartController',
        controllerAs: 'cartVm'
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
        cache: false
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
          data: function ($ionicLoading, $stateParams, $ionicPopup, CategoryService, ErrorHandlerService) {
            $ionicLoading.show({
              template: '{{::("globals.loading"|translate)}}'
            });

            var categoryId = $stateParams.id;

            return CategoryService.getCategoryProviders(categoryId)
              .then(function success(res) {
                $ionicLoading.hide();
                return res.data;
              }, ErrorHandlerService.handleCommonErrorGET);
          }
        }
      }
    }
  })
  .state('app.categories.provider', {
    url: '/:categoryId/provider/:providerId',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/provider/show.html',
        controller: 'ProviderDetailController',
        controllerAs: 'providerDetVm',
        resolve: {
          data: function(ProductsService, $stateParams) {
            return ProductsService.getProviderProducts($stateParams).then(function(res){
              return res;
            });
          }
        }
      }
    }
  })
  .state('app.categories.provider.product', {
    url: '/product/:id',
    params: {
      product: null
    },
    views: {
      'menuContent@app': {
        templateUrl: 'templates/product/show.html',
        controller: 'ProductController',
        controllerAs: 'productVm',
        resolve: {
          data: function (ProductsService, $stateParams) {
            if ($stateParams.product) {
              return $stateParams.product;
            } else {
              return ProductsService.getProduct($stateParams).then(function (res) {
                return res;
              });
            }
          }
        }
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
        templateUrl: 'templates/product/index.html',
        controller: 'ProductsController',
        controllerAs: 'productsVm'
      }
    }
  })
  .state('provider', {
    url: '/provider',
    abstract: true,
    templateUrl: 'templates/menu/menu-provider.html',
    resolve: {
      auth: function ( UserAuthService) {
              return UserAuthService.checkIfEnabledProvider();
            }
    }
  })
  .state('provider.items', {
    url: '/items',
    abstract: true
  })
  .state('provider.items.index', {
    url: '/',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/item/items.html',
        controller: 'ItemsController',
        controllerAs: 'itemsVm'
      }
    }
  })
  .state('provider.clients', {
    url: '/clients',
    abstract: true
  })
  .state('provider.clients.index', {
    url: '/',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/client/clients.html',
        controller: 'ClientsController',
        controllerAs: 'clientsVm'
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
        templateUrl: 'templates/courier/orders.html',
        controller: 'OrdersController',
        controllerAs: 'orVm',
        resolve: {
          orders: function (CourierService) {
            return CourierService.shippingRequests().then(function (res) {
              return res;
            });
          }
        }
      }
    }
  })
  .state('app.profile', {
    url: '/profile',
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/profile/profile.html',
      }
    }
  })
  .state('app.profile.info', {
    url: '/info',
    views: {
      'menuContent@profileInfo': {
        templateUrl: 'templates/profile/info/info.html',
        controller: 'ProfileInfoController',
        controllerAs: 'piVm'
      }
    }
  })
  .state('app.profile.addresses', {
    url: '/addresses',
    abstract: true
  })
  .state('app.profile.addresses.index', {
    url: '/',
    cache: false,
    views: {
      'menuContent@addressesIndex': {
        templateUrl: 'templates/profile/addresses/index.html',
        controller: 'ProfileAddressesController',
        controllerAs: 'pfaVm',
        resolve: {
          data: function ($ionicLoading, $stateParams, $ionicPopup, ProfileAddressesService, ErrorHandlerService) {
            return ProfileAddressesService.getAddresses()
              .then(function success(res) {
                $ionicLoading.hide();
                return res;
              }, ErrorHandlerService.handleCommonErrorGET);
          }
        }
      }
    }
  })
  .state('app.profile.addresses.new', {
    url: '/new',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/profile/addresses/actions.html',
        controller: 'ProfileCreateAddressesController',
        controllerAs: 'pfaVm'
      }
    }
  })
  .state('app.profile.addresses.update', {
    url: '/update/:id',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/profile/addresses/actions.html',
        controller: 'ProfileUpdateAddressesController',
        controllerAs: 'pfaVm',
        params: {
          id: null
        },
        resolve: {
          data: function ($ionicLoading, $stateParams, $ionicPopup, ProfileAddressesService, ErrorHandlerService) {
            if ($stateParams.id) {
              return ProfileAddressesService.getAddress($stateParams.id)
              .then(function success(res) {
                $ionicLoading.hide();
                return res;
              }, ErrorHandlerService.handleCommonErrorGET);
            }
          }
        }
      }
    }
  })
  .state('disabledUserError', {
    url: '/disabled-user',
    templateUrl: 'templates/error/disabled-user-error.html'
  })
  .state('app.wishlist', {
    url: '/wishlist',
    abstract: true
  })
  .state('app.wishlist.index', {
    url: '/',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/wishlist/wishlists.html',
        controller: 'WishlistsController',
        controllerAs: 'wishlistsVm',
        resolve: {
          data: function ($ionicLoading, WishlistsService, ErrorHandlerService) {
            return WishlistsService.getWishlists()
              .then(function success(res) {
                  $ionicLoading.hide();
                  return res;
                }, ErrorHandlerService.handleCommonErrorGET);
          }
        }
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
    return $auth.validateUser()
      .then(function userAuthorized() {
        $state.go(APP.successState).then(function () {
          $ionicLoading.hide();
        });
      }, function userNotAuthorized() {
        return;
      });
  }

  function accessIfUserAuth($auth, $state, $ionicLoading, APP, CartService) {
    return $auth.validateUser()
      .then(function userAuthorized(user) {
        return CartService.getCart().then(function(response){
          user.customer_order = response.customer_order; //jshint ignore:line
          return user;
        });
      }, function userNotAuthorized() {
        $state.go(APP.preloginState).then(function () {
          $ionicLoading.hide();
        });
      });
  }
}
