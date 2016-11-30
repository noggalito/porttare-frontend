(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('UserAuthService', UserAuthService);

  function UserAuthService($auth, $state, $ionicLoading) {
    var service = {
      checkIfEnabledProvider : checkIfEnabledProvider
    };

    return service;

    function checkIfEnabledProvider() {
      return $auth.validateUser()
      .then(function userAuthorized(user) {
        if (user.provider_profile.status === 'disabled') { //jshint ignore:line
          $state.go('disabledUserError').then(function () {
            $ionicLoading.hide();
          });
        }
        return;
      }, function userNotAuthorized() {
          return;
      });
    }
  }
})();
