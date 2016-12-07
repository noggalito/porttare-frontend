(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('MapsService', MapsService);

  function MapsService($window, ENV, $q, $ionicPopup) {
    var service = {
      loadGMaps: loadGMaps,
      renderMap: renderMap,
      renderAddressMarker: renderAddressMarker
    };
    var loadDefered,
        gmapsLoaded;

    return service;

    function loadGMaps() {
      if (gmapsLoaded) {
        return $q.resolve();
      } else {
        loadDefered = $q.defer();
        appendGMapsScript();
        gmapsLoaded = true;
        return loadDefered.promise;
      }
    }

    function appendGMapsScript() {
      $window.gMapsCallback = function() { gMapsCallback(); };
      var libraries = 'places';
      var gMapsUrl = '//maps.google.com/maps/api/js?libraries=' + libraries + '&callback=gMapsCallback&key=';
      var script = document.createElement('script');
      script.src = gMapsUrl + ENV.gMapsKey;
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    function gMapsCallback(){
      loadDefered.resolve();
      removeGMapsCallback();
    }

    function removeGMapsCallback(){
      delete $window.gMapsCallback;
    }

    function renderMap(domId) {
      return new google.maps.Map(
        document.getElementById(domId),
        mapOptionsDefault()
      );
    }

    function renderAddressMarker(map, options) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(options, function(results, status) {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);
          displayMarker(map, results[0].geometry.location);
        } else {
          var positionDefault = mapPositionDefault();
          map.setCenter(positionDefault);
          $ionicPopup.alert({
            title: 'Error',
            template: '{{::("office.locationNotFound"|translate)}}' + options.address
          });
        }
      });
    }

    function displayMarker(map, marker){
      new google.maps.Marker({
        map: map,
        position: marker
      });
    }

    function mapOptionsDefault(){
      return {
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        disableDefaultUI: true,
        center: mapPositionDefault()
      };
    }

    function mapPositionDefault(){
      var latitude = -3.996704;
      var longitude = -79.201699;
      return new google.maps.LatLng(latitude, longitude);
    }

  }
})();
