(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('GeolocationService', GeolocationService);

  function GeolocationService($cordovaGeolocation) {

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    var service = {
      getCurrentPosition: getCurrentPosition
    };

    return service;

    function getCurrentPosition() {
      return $cordovaGeolocation
        .getCurrentPosition(posOptions);
    }

  }
})();
