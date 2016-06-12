(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('MapController', MapController);

  function MapController($cordovaGeolocation, $ionicLoading, $ionicPopup) {
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

        var latLng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          center: latLng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        mapVm.map = map;

        new google.maps.Marker({
          position: latLng,
          map: map

        });

        $ionicLoading.hide();

      }, function error() {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Error',
          template: 'Hubo un error al cargar el mapa.'
        });
      });

  }
})();
