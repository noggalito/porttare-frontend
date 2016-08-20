(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('LoginService', LoginService);

  function LoginService($auth, $state, $ionicPopup) {

    var service = {
      loginWithFB: loginWithFB
    };

    return service;

    function loginWithFB() {
      var successState = 'app.category';
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
