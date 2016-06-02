(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('LoginController', LoginController);

  function LoginController($rootScope, $scope, $state, $ionicLoading, $ionicPopup, $auth) {
    var loginVm = this;
    loginVm.login = login;
    loginVm.resetPassword = resetPassword;
    loginVm.loginForm = {};
    var successState = 'app.playlists';

    $rootScope.$on('auth:validation-success', function () {
      $state.go(successState);
    });

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
      loginVm.resetPassword = {};
      var resetPasswordPopup = $ionicPopup.show({
        template: '<input type="email" ng-model="loginVm.resetPassword.email"' +
        'placeholder="Ingresa tu correo electrónico">',
        title: 'Restablecer Contraseña',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Enviar</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!loginVm.resetPassword.email) {
                e.preventDefault();
              } else {
                return loginVm.resetPassword.email;
              }
            }
          }
        ]
      });

      resetPasswordPopup.then(function (email) {
        $auth.requestPasswordReset(email)
          .then(function () {
            $ionicLoading.show({
              template: 'Se enviaron las intrucciones al correo.',
              noBackdrop: true,
              duration: 2000
            });
          })
          .catch(function (resp) {
            $ionicPopup.alert({
              title: 'Error',
              template: 'Hubo un error enviando la información.'
            });
          });
      });


    }
  }
})();
