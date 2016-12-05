(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('MapsService', MapsService);

  function MapsService($window, ENV, $q, $ionicPopup) {
    var service = {
      loadGMap: loadGMap,
      loadGMapAddress: loadGMapAddress
    };
    var deferred,
        gmapsLoaded;

    return service;

    function loadGMap() {
      if (gmapsLoaded) {
        return $q.resolve();
      } else {
        deferred = $q.defer();
        appendGMapsScript();
        gmapsLoaded = true;
        return deferred.promise;
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
      deferred.resolve();
      removeGMapsCallback();
    }

    function removeGMapsCallback(){
      delete $window.gMapsCallback;
    }

    function loadGMapAddress(address) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
        var options = mapOptionsDefault();
        var map = new google.maps.Map(document.getElementById('map'), options);
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);
          displayMarker(map, results[0].geometry.location);
        }else{
          var positionDefault = mapPositionDefault();
          map.setCenter(positionDefault);
          displayMarker(map, positionDefault);
          $ionicPopup.alert({
            title: 'Error',
            template: '{{::("office.locationNotFound"|translate)}}'
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
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.VERTICAL_BAR,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        }
      };
    }

    function mapPositionDefault(){
      var latitude = -4.0078909;
      var longitude = -79.21127690000003;
      return new google.maps.LatLng(latitude, longitude);
    }

  }
})();
