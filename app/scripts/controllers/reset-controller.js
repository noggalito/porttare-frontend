(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ResetController', ResetController);

  function ResetController($ionicLoading, $auth, $ionicPopup, $state, $rootScope, $window) {
    var resetVm = this;
    resetVm.updatePassword = updatePassword;
    resetVm.updatePasswordForm = {};
    var successState = 'app.playlists';

    $rootScope.$on('auth:password-change-error', function (event, data) {
      $ionicPopup.alert({
        title: 'Error',
        template: data.errors.full_messages[0]//jshint ignore:line
      });
    });

    $rootScope.$on('auth:password-change-success', function () {
      $window.location.href = '/' + $state.href(successState);
    });

    function updatePassword() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.updatePassword(resetVm.updatePasswordForm)
        .finally(function () {
          $ionicLoading.hide();
        });
    }
  }
})();
