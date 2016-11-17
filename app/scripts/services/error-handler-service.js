(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ErrorHandlerService', ErrorHandlerService);

  function ErrorHandlerService($ionicLoading, $ionicPopup) {

    var service = {
      handleCommonErrorGET: handleCommonErrorGET
    };

    return service;

    function handleCommonErrorGET(backendResponse) {
      $ionicLoading.hide();
      var message = null;
      if (backendResponse && backendResponse.error) {
        message = backendResponse.error;
      } else {
        message = '{{::("globals.pleaseTryAgain"|translate)}}';
      }
      $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    }

  }
})();
