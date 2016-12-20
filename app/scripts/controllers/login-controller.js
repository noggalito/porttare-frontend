(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('LoginController', LoginController);

  function LoginController( $rootScope,
                            $scope,
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
    var successState = APP.successState;
    var preloginState = APP.preloginState;

    function login() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitLogin(loginVm.loginForm)
        .then(function () {
          $state.go(successState);
        })
        .catch(function (resp) {
          loginVm.loginForm.password = null;

          $ionicPopup.alert({
            title: 'Error',
            template: resp.errors[0]
          });
        })
        .finally(function(){
          $ionicLoading.hide();
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
