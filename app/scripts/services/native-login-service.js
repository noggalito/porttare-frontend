(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('NativeLoginService', NativeLoginService);

  function NativeLoginService ($auth,
                               $http,
                               $rootScope,
                               $cordovaFacebook,
                               APP,
                               ENV) {
    var service = { loginWithFB: loginWithFB };
    var deferred;

    return service;

    function loginWithFB() {
      deferred = $auth.initDfd();
      $cordovaFacebook.login(APP.fbAuthScope).then(
        fbAuthorizationSuccess,
        authorizationFailure
      );
      return deferred.promise;
    }

    function fbAuthorizationSuccess(credentials) {
      var postData = {
        provider: 'facebook',
        access_token: credentials.authResponse.accessToken // jshint ignore:line
      };
      $http({
        method: 'POST',
        data: postData,
        url: ENV.apiHost + '/api/auth/native_login',
        headers: { 'Accept': 'application/json' }
      }).then(
        performLogin,
        authorizationFailure
      );
    }

    function performLogin(response) {
      var authData = $auth.getConfig().handleLoginResponse(response.data);
      $auth.handleValidAuth(authData, true); // this resolves the promise
      $rootScope.$broadcast('auth:login-success', $auth.user);
    }

    function authorizationFailure(error) {
      return deferred.reject(error);
    }
  }
})();
