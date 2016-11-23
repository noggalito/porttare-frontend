(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('MapsService', MapsService);

  function MapsService($window, ENV, $q) {
    var service = {
      loadGMap: loadGMap
    };
    var deferred;

    return service;

    function loadGMap() {
      loadScript();
      return deferred.promise;
    }

    function loadScript(){
      deferred = $q.defer();
      $window.launchGMap = function(){
        showGMap();
      };
      var libraries = 'places';
      var gMapsUrl = '//maps.google.com/maps/api/js?libraries=' + libraries + '&callback=launchGMap&key=';
      var script = document.createElement('script');
      script.src = gMapsUrl + ENV.gMapsKey;
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);
    }

    function showGMap(){
      deferred.resolve();
    }
  }
})();
