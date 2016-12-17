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
      categories: function (CategoriesService, $ionicLoading, ErrorHandlerService) {
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
    cache: false,
    views: {
      'menuContent@app': {
        templateUrl: 'templates/cart/index.html',
        controller: 'CartController',
        controllerAs: 'cartVm',
        resolve: {
          deliveryAddresses:
            function (ProfileAddressesService,
                      ErrorHandlerService) {
              return ProfileAddressesService
                       .getAddresses()
                       .catch(ErrorHandlerService.handleCommonErrorGET);
          },
          billingAddresses:
            function (BillingAddressesService,
                      ErrorHandlerService) {
              return BillingAddressesService
                       .getBillingAddresses()
                       .catch(ErrorHandlerService.handleCommonErrorGET);
          }
        }
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
          data: function ($ionicLoading, $stateParams, CategoryService, ErrorHandlerService) {
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
          providerItem: function (ProductsService, $stateParams) {
            if ($stateParams.product) {
              return $stateParams.product;
            } else {
              return ProductsService.getProduct($stateParams);
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
  .state('provider.profile-provider', {
    url: '/profile',
    abstract: true,
    views: {
      'menuContent': {
        templateUrl:'templates/profile-provider/profileProvider.html'
      }
    }
  })
  .state('provider.profile-provider.info', {
    url: '/info',
    views: {
      'menuContent@profileProviderInfo': {
        templateUrl: 'templates/profile-provider/info.html',
        controller: 'ProfileProviderUpdateController',
        controllerAs: 'providerProfileVm'
      }
    }
  })
  .state('provider.profile-provider.metrics', {
    url: '/metrics',
    views: {
      'menuContent@profileProviderMetrics': {
        templateUrl: 'templates/profile-provider/metrics.html'
      }
    }
  })
  .state('provider.profile-provider.managements', {
    url: '/managements',
    views: {
      'menuContent@profileProviderManagements': {
        templateUrl: 'templates/profile-provider/managements.html'
      }
    }
  })
  .state('provider.items.index', {
    url: '/',
    cache: false,
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/item/items.html',
        controller: 'ItemsController',
        controllerAs: 'itemsVm',
        resolve: {
          apiResources: function (ItemsService) {
            return ItemsService.getItems().then(function (response) {
              return response;
            });
          }
        }
      }
    }
  })
  .state('provider.items.show', {
    url: '/:id',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/item/show.html',
        controller: 'ProviderItemController',
        controllerAs: 'providerItemVm',
        resolve: {
          apiResources: function ($ionicLoading, $stateParams, ItemsService, ErrorHandlerService) {
            $ionicLoading.show({
              template: '{{::("globals.loading"|translate)}}'
            });

            return ItemsService.getItem($stateParams)
              .then(function success(response) {
                $ionicLoading.hide();
                return response;
              }, ErrorHandlerService.handleCommonErrorGET);
          }
        }
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
  .state('provider.offices', {
    cache: false,
    url: '/offices',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/offices/offices.html',
        controller: 'OfficesController',
        controllerAs: 'officesVm'
      }
    }
  })
  .state('provider.office', {
    url: '/office/:id',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/offices/detail.html',
        controller: 'OfficeController',
        controllerAs: 'officesVm'
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
          customerAddresses: function (ProfileAddressesService, ErrorHandlerService) {
            return ProfileAddressesService
                     .getAddresses()
                     .catch(ErrorHandlerService.handleCommonErrorGET);
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
          data: function ($ionicLoading, $stateParams, ProfileAddressesService, ErrorHandlerService) {
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
    cache: false,
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
  })
  .state('app.billing', {
    url: '/billing',
    abstract: true
  })
  .state('app.billing.addresses', {
    url: '/addresses',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/billing-addresses/index.html',
        controller: 'BillingAddressesController',
        controllerAs: 'billingAddressesVm'
      }
    }
  })
  .state('provider.dispatchers', {
    url: '/dispatchers',
    abstract: true
  })
  .state('provider.dispatchers.index', {
    cache: false,
    url: '/',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/dispatchers/dispatchers.html',
        controller: 'DispatchersController',
        controllerAs: 'dispatchersVm'
      }
    }
  })
  .state('provider.dispatchers.show', {
    url: '/:id',
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/dispatchers/detail.html',
        controller: 'DispatcherController',
        controllerAs: 'dispatchersVm'
      }
    }
  })
  .state('app.customerorders', {
    url: '/customer_orders',
    abstract: true
  })
  .state('app.customerorders.index', {
    cache: false,
    url: '/',
    views: {
      'menuContent@app': {
        controllerAs: 'customerOrdersVm',
        controller: 'CustomerOrdersIndexController',
        templateUrl: 'templates/customer/orders/index.html',
        resolve: {
          customerOrders: function (CustomerOrdersService, ErrorHandlerService){
            return CustomerOrdersService
                     .getCustomerOrders()
                     .catch(ErrorHandlerService.handleCommonErrorGET);
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
