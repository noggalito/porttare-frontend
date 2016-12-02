'use strict';

angular
  .module('porttare.services')
  .factory('InterceptorsService', InterceptorsService);

function InterceptorsService($injector, $q) {
  var service = {
    responseError: responseError
  };
  var currentAlert;

  return service;

  function responseError(rejection) {
    if (rejection.status === 401 && !rejection.config.url.match('api/auth/user/sign_in')) {
      closeCurrentAlert();
      createAlert();
    }
    return $q.reject(rejection);
  }

  function createAlert() {
    currentAlert = $injector.get('$ionicPopup').alert({
      title: 'Ups!',
      template: 'No tienes permisos para realizar eso!'
    });
    currentAlert.then(unsetCurrentAlert);
  }

  function unsetCurrentAlert() {
    currentAlert = null;
  }

  function closeCurrentAlert() {
    if (currentAlert) {
      currentAlert.close();
    }
  }
}
