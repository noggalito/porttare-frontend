(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('LoginController', LoginController);

  function LoginController( $rootScope,
                            $state,
                            $ionicLoading,
                            $ionicPopup,
                            $auth,
                            $ionicHistory,
                            APP,
                            SessionService) {
    var loginVm = this;
    loginVm.login = login;
    loginVm.logout = logout;
    loginVm.loginWithFB = SessionService.loginWithFB;
    loginVm.loginForm = {};
    var successState = APP.successState,
        preloginState = APP.preloginState,
        placesState = APP.placesState;

    $rootScope.$on('auth:login-error', cantLogin);

    function login() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitLogin(loginVm.loginForm)
        .then(loggedIn)
        .finally($ionicLoading.hide);
    }

    function loggedIn() {
      loginVm.loginForm = {};
      if ($auth.user.current_place) { //jshint ignore:line
        $state.go(successState);
      } else {
        $state.go(placesState);
      }
    }

    function cantLogin(ev, resp) {
      loginVm.loginForm.password = null;

      var errMessage;
      if (resp) {
        errMessage = resp.errors[0];
      }

      $ionicPopup.alert({
        title: 'Error',
        template: (errMessage || 'Ups, algo salió mal')
      });
    }

    function logout() {
      $ionicLoading.show({
        template: 'Cerrando sesión...'
      });
      SessionService.logOut()
        .then(function () {
          $ionicHistory.clearHistory();
          $state.go(preloginState, {}, { location: 'replace' });
        })
        .catch(function () {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error, inténtalo nuevamente.'
          });
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    }
  }
})();
