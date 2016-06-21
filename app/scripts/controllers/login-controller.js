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
                            $window,
                            $ionicHistory) {
    var loginVm = this;
    loginVm.login = login;
    loginVm.resetPassword = resetPassword;
    loginVm.logout = logout;
    loginVm.loginForm = {};
    var successState = 'app.playlists';
    var loginState = 'login';

    $rootScope.$on('auth:validation-success', function () {
      $state.go(successState);
    });

    function load(){
      if ($window.localStorage && !$window.localStorage.getItem('hasViewedTutorial')) {
        $state.go('intro');
      }
    }

    load();

    function login() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitLogin(loginVm.loginForm)
        .then(function () {
          $state.go(successState);
        })
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Error',
            template: resp.errors.join(', ')
          });
        })
        .finally(function(){
          $ionicLoading.hide();
        });
    }

    function resetPassword() {
      loginVm.resetPasswordForm = {};
      var resetPasswordPopup = $ionicPopup.show({
        template: '<input type="email" ng-model="loginVm.resetPasswordForm.email"' +
        'placeholder="Ingresa tu correo electrónico">',
        title: 'Restablecer Contraseña',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Enviar</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!loginVm.resetPasswordForm.email) {
                e.preventDefault();
                $ionicPopup.alert({
                  title: 'El correo electrónico ingresado es inválido.'
                });
              } else {
                return loginVm.resetPasswordForm;
              }
            }
          }
        ]
      });

      resetPasswordPopup.then(function (resetPasswordForm) {
        $auth.requestPasswordReset(resetPasswordForm)
          .then(function () {
            $ionicLoading.show({
              template: 'Se enviaron las intrucciones al correo.',
              noBackdrop: true,
              duration: 2000
            });
          })
          .catch(function () {
            $ionicPopup.alert({
              title: 'Error',
              template: 'Hubo un error enviando la información.'
            });
          });
      });
    }

    function logout() {
      $ionicLoading.show({
        template: 'Cerrando sesión...'
      });
      $auth.signOut()
        .then(function () {
          $ionicHistory.clearCache().then(function () {
            $state.go(loginState, {}, { location: 'replace' });
          });
        })
        .catch(function () {
          $ionicPopup.alert({
            title: 'Error',
            template: 'Hubo un error, intentalo nuevamente.'
          });
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    }

  }
})();
