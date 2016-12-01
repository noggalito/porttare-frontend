(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('NativeLoginService', NativeLoginService);

  function NativeLoginService ($q,
                               $auth,
                               $http,
                               $cordovaFacebook,
                               APP,
                               ENV) {
    var service = { loginWithFB: loginWithFB };
    var deferred;

    return service;

    function loginWithFB() {
      deferred = $q.defer();
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
        url: ENV.apiHost + '/api/auth/native_login'
      }).then(function () {
        return validateUser();
      }, authorizationFailure);
    }

    function authorizationFailure(error) {
      return deferred.reject(error);
    }

    function validateUser() {
       $auth.validateUser().then(function (){
         deferred.resolve();
       }, authorizationFailure);
    }
  }
})();
