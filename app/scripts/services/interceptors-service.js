'use strict';

angular
  .module('porttare.services')
  .factory('InterceptorsService', InterceptorsService);

function InterceptorsService($injector, $q) {
  var service = {
    responseError: responseError
  };

  return service;

  function responseError(rejection) {
    if (rejection.status === 401 && !rejection.config.url.match('api/auth/user/sign_in')) {
      $injector.get('$ionicPopup').alert({
        title: 'Ups!',
        template: 'No tienes permisos para realizar eso!'
      });
    }
    return $q.reject(rejection);
  }
}
