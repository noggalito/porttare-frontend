'use strict';

angular
  .module('porttare.config')
  .config(appRoutes);

function appRoutes($stateProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu/menu.html',
    controller: 'MenuController',
    controllerAs: 'menuVm',
    //only logged users will allow to go to /app/*
    resolve: {
      currentUser: function(AuthorizationService){
        return AuthorizationService.accessIfUserAuth;
      },
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
  .state('app.places', {
    url: '/places',
    abstract: true
  })
  .state('app.places.index', {
    url: '/',
    cache: false,
    views: {
      'menuContent@app': {
        controllerAs: 'placesVm',
        controller: 'PlacesController',
        templateUrl: 'templates/places/index.html',
        resolve: {
          places: function (PlacesService){
            return PlacesService.getPlaces();
          }
        }
      }
    }
  })
  .state('app.cart', {
    url: '/cart',
    abstract: true,
    resolve: {
      auth: function (AuthorizationService) {
        return AuthorizationService.choosePlaceIfNotPresent();
      }
    }
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
    abstract: true,
    resolve: {
      auth: function(AuthorizationService){
        return AuthorizationService.choosePlaceIfNotPresent();
      }
    }
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
    cache: false,
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
    abstract: true,
    resolve: {
      auth: function(AuthorizationService){
        return AuthorizationService.choosePlaceIfNotPresent();
      }
    }
  })
  .state('app.provider.welcome', {
    url: '/welcome',
    views: {
      'menuContent@app': {
        cache: false,
        templateUrl: 'templates/provider/welcome.html'
      }
    },
    resolve: {
      auth: function(AuthorizationService){
        return AuthorizationService.notShowWelcome('provider.items.index');
      }
    }
  })
  .state('app.provider.new', {
    url: '/new',
    views: {
      'menuContent@app': {
        cache: false,
        templateUrl: 'templates/provider/new.html',
        controller: 'ProviderController',
        controllerAs: 'providerVm',
        resolve: {
          auth: function(AuthorizationService){
            return AuthorizationService.notShowWelcome('provider.items.index');
          },
          providerCategories: function (CategoriesService,
                                        ErrorHandlerService){
            return CategoriesService
                     .getCategories()
                     .then(function (response){
                       return response.data.provider_categories; // jshint ignore:line
                     })
                     .catch(ErrorHandlerService.handleCommonErrorGET);
          }
        }
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
    cache: false,
    templateUrl: 'templates/menu/menu-provider.html',
    resolve: {
      provider: function($auth,$state,APP,$ionicLoading){
        $auth.validateUser().then(function userAuthorized(user) {
          if(!user.provider_profile){
            $state.go(APP.successState).then($ionicLoading.hide);
          }
        });
      },
      auth: function ( UserAuthService) {
              return UserAuthService.checkIfEnabledProvider();
            },
      providerOrders: function(ProviderCustomerOrdersService, ErrorHandlerService){
        return ProviderCustomerOrdersService
          .getProviderCustomerOrdersByStatus('submitted')
          .catch(ErrorHandlerService.handleCommonErrorGET);
      }
    },
    controller: 'ProviderMainController',
    controllerAs: 'providerMainVm'
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
  .state('provider.items', {
    url: '/items',
    abstract: true
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
            return ItemsService.getItems();
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
    cache: false,
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/client/clients.html',
        controller: 'ClientsController',
        controllerAs: 'clientsVm',
        resolve: {
          providerClients: function (ClientsService, ErrorHandlerService) {
            return ClientsService
                    .getClients()
                    .catch(ErrorHandlerService.handleCommonErrorGET);
          }
        }
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
        controllerAs: 'officesVm',
        resolve: {
          places: function(PlacesService, ErrorHandlerService){
            return PlacesService
                     .getPlaces()
                     .catch(ErrorHandlerService.handleCommonErrorGET);
          }
        }
      }
    }
  })
  .state('provider.office', {
    url: '/office/:id',
    params: {
      office: null
    },
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/offices/detail.html',
        controller: 'OfficeController',
        controllerAs: 'officesVm',
        resolve: {
          places: function(PlacesService, ErrorHandlerService){
            return PlacesService
                     .getPlaces()
                     .catch(ErrorHandlerService.handleCommonErrorGET);
          },
          office: function ($stateParams, OfficesService, ErrorHandlerService) {
            if ($stateParams.office) {
              return $stateParams.office;
            } else {
              return OfficesService.getOffice($stateParams.id).then(function (res) {
                return res.provider_office; // jshint ignore:line
              },ErrorHandlerService.handleCommonErrorGET);
            }
          }
        }
      }
    }
  })
  .state('provider.orders', {
    url: '/customer-orders',
    abstract: true
  })
  .state('provider.orders.index', {
    url: '/:status',
    cache: false,
    params: {
      status: 'submitted'
    },
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/providers/orders/index.html',
        controller: 'ProviderOrdersController',
        controllerAs: 'poVm',
        resolve: {
          status: function ($stateParams){
            return $stateParams.status;
          }
        }
      }
    }
  })
  .state('provider.orders.show', {
    url: '/show/:id',
    params: {
      customerOrder: null
    },
    views: {
      'menuContent@provider': {
        templateUrl: 'templates/providers/orders/show.html',
        controller: 'ProviderOrderShowController',
        controllerAs: 'providerOrderShowVM',
        resolve: {
          customerOrder: function ($stateParams, ProviderCustomerOrdersService) {
            if ($stateParams.customerOrder) {
              return $stateParams.customerOrder;
            } else {
              var customerOrderId = $stateParams.id;
              return ProviderCustomerOrdersService
                       .getCustomerOrder(customerOrderId);
            }
          }
        }
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
        cache: false,
        templateUrl: 'templates/courier/welcome.html',
        resolve: {
          auth: function(AuthorizationService){
            return AuthorizationService.notShowWelcome('courier.orders');
          }
        },
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
        controllerAs: 'courierVm',
        resolve: {
          auth: function(AuthorizationService){
            return AuthorizationService.notShowWelcome('courier.orders');
          }
        }
      }
    }
  })
  .state('courier', {
    url: '/courier',
    abstract: true,
    templateUrl: 'templates/menu/menu-courier.html',
    resolve:{
      auth: function($auth,$state,APP,$ionicLoading){
        $auth.validateUser().then(function userAuthorized(user) {
          if(!user.courier_profile){
            $state.go(APP.successState).then($ionicLoading.hide);;
          }
        });
      }
    }
  })
  .state('courier.orders', {
    url: '/orders',
    views: {
      'menuContent@courier': {
        templateUrl: 'templates/courier/orders.html',
        controller: 'OrdersController',
        controllerAs: 'orVm',
        resolve: {
          shippingRequests: function (ShippingRequestService) {
            return ShippingRequestService.getShippingRequestsWithStatus('new');
          }
        }
      }
    }
  })
  .state('courier.order', {
    url: '/orders/:id',
    cache: false,
    params: {
      order: null
    },
    views: {
      'menuContent@courier': {
        templateUrl: 'templates/courier/orders/show.html',
        controller: 'CourierOrderController',
        controllerAs: 'coVm',
        resolve: {
          courierOrder: function ($stateParams, ShippingRequestService) {
            if ($stateParams.order) {
              return $stateParams.order;
            } else {
              return ShippingRequestService.getShippingRequest($stateParams.id);
            }
          }
        }
      }
    }
  })
  .state('app.profile', {
    url: '/profile',
    abstract: true,
    resolve: {
      auth: function (AuthorizationService) {
        return AuthorizationService.choosePlaceIfNotPresent();
      }
    }
  })
  .state('app.profile.info', {
    url: '/info',
    views: {
      'menuContent@app': {
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
      'menuContent@app': {
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
          data: function ($stateParams, ProfileAddressesService, ErrorHandlerService) {
            if ($stateParams.id) {
              return ProfileAddressesService.getAddress($stateParams.id)
              .then(function success(res) {
                return res;
              }, ErrorHandlerService.handleCommonErrorGET);
            }
          }
        }
      }
    }
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
  })
  .state('app.customerorders.show', {
    url: '/:id',
    params: {
      customerOrder: null
    },
    views: {
      'menuContent@app': {
        templateUrl: 'templates/customer/orders/show.html',
        controller: 'CustomerOrderController',
        controllerAs: 'customerOrderVm',
        resolve: {
          customerOrder: function ($stateParams, CustomerOrdersService) {
            if ($stateParams.customerOrder) {
              return $stateParams.customerOrder;
            } else {
              var customerOrderId = $stateParams.id;
              return CustomerOrdersService
                        .getCustomerOrder(customerOrderId);
            }
          }
        }
      }
    }
  });
}
