(function () {
'use strict';

  angular
    .module('porttare.services')
    .factory('AuthorizationService', AuthorizationService);

  function AuthorizationService($auth, $state, $ionicLoading, APP) {
    var service = {
      accessIfUserNotAuth: accessIfUserNotAuth,
      notShowWelcomeProviderCourier: notShowWelcomeProviderCourier,
      choosePlaceIfNotPresent: choosePlaceIfNotPresent,
      accessIfUserAuth: accessIfUserAuth,
    };

    return service;

    function accessIfUserNotAuth() {
      return $auth.validateUser()
        .then(function userAuthorized() {
          $state.go(APP.successState).then($ionicLoading.hide);
        }, function userNotAuthorized() {
          return;
        });
    }

    function choosePlaceIfNotPresent(){
      return $auth.validateUser()
        .then(function userAuthorized(user){
          if (!user.current_place) { // jshint ignore:line
            return $state.go(APP.placesState).then($ionicLoading.hide);
          }
        }, function notAuthorized(){
          return;
        });
    }

    function notShowWelcomeProviderCourier() {
      return $auth.validateUser()
        .then(function userAuthorized(user) {
          if (!user.provider_profile && !user.courier_profile) {//jshint ignore:line
            return;
          }else{
            if(user.courier_profile || user.provider_profile ){//jshint ignore:line
              $state.go('app.categories.index').then(function () {
                $ionicLoading.hide();
              });
            }
          }
        }, function userNotAuthorized() {
          return;
        });
    }
  }

  function accessIfUserAuth($auth, $state, APP, UserAuthService, CartService) {
    return $auth.validateUser()
      .then(function userAuthorized(user) {
          if (user.agreed_tos) { //jshint ignore:line
            return CartService.getCart().then(function(response){
              user.customer_order = response.customer_order; //jshint ignore:line
              return user;
            });
          } else {
            $state.go('termsAndCond');
          }
      }, function userNotAuthorized() {
        $state.go(APP.preloginState);
      });
  }
})();
