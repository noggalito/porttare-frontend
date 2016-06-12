(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('MapController', MapController);

  function MapController($cordovaGeolocation, $ionicLoading) {
    var mapVm = this;

    $ionicLoading.show({
      template: 'cargando...'
    });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function success(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        mapVm.map = map;
        $ionicLoading.hide();

      }, function error(err) {
        $ionicLoading.hide();
        console.log(err);
      });


  }
})();
