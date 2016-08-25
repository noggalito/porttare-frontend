(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('LoginService', LoginService);

  function LoginService($auth, $state, $ionicPopup, APP) {

    var service = {
      loginWithFB: loginWithFB
    };

    return service;

    function loginWithFB() {
      var successState = APP.successState;
      $auth.authenticate('facebook')
        .then(function () {
          $state.go(successState);
        })
        .catch(function () {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error, intentalo nuevamente.'
          });
        });
    }
  }
})();
