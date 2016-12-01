(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('LoginService', LoginService);

  function LoginService($auth,
                        $state,
                        $ionicPopup,
                        APP,
                        NativeLoginService) {

    var service = {
      loginWithFB: loginWithFB
    };

    return service;

    function loginWithFB() {
      var successState = APP.successState;
      fbAuthenticate().then(function () {
          $state.go(successState);
        }).catch(function () {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error, inténtalo nuevamente.'
          });
        });
    }

    function fbAuthenticate() {
      var isNative = !!window.cordova;
      if (isNative) {
        return NativeLoginService.loginWithFB();
      } else {
        return $auth.authenticate('facebook');
      }
    }
  }
})();
