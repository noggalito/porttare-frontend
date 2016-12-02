(function(){
'use strict';

  angular
    .module('porttare.controllers')
    .controller('RegisterController', RegisterController);

  function RegisterController($ionicLoading,
                              $auth,
                              $ionicPopup,
                              $state,
                              $scope,
                              SessionService) {
    var registerVm = this;
    registerVm.register = register;
    registerVm.loginWithFB = SessionService.loginWithFB;

    function register() {
      if (!registerVm.registerForm.$invalid) {
        $ionicLoading.show({
          template: 'cargando...'
        });
        $auth.submitRegistration(registerVm.user)
          .then(function() {
            $state.go('login').then(function(){
              $ionicPopup.alert({
                title: 'Alerta',
                template: 'Usuario creado satisfactoriamente'
              });
            });
          })
          .finally(function(){
            $ionicLoading.hide();
          });
      }else{
        $ionicPopup.alert({
          title: 'Alerta',
          template: 'Error en el formulario'
        });
      }
    }

    $scope.$on('auth:registration-email-error', function(event, response){
      registerVm.errors = response.errors;
    });

  }
})();
