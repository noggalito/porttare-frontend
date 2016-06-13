(function () {
  'use strict';

  describe('MapController', function () {
    var $rootScope,
      controller,
      deferredGeolocation,
      $ionicPopup,
      GeolocationService,
      $ionicLoading;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(
      function ($q,
        $rootScope,
        $controller) {
        deferredGeolocation = $q.defer();
        $ionicPopup = { alert: sinon.stub() };
        $ionicLoading = { show: sinon.stub(), hide: sinon.stub() };
        GeolocationService = { getCurrentPosition: sinon.stub().returns(deferredGeolocation.promise) }

        controller = $controller('MapController', {
          '$ionicPopup': $ionicPopup,
          '$ionicLoading': $ionicLoading,
          'GeolocationService': GeolocationService
        });
      }));

    describe('#geolocation map', function () {

      beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
        GeolocationService.getCurrentPosition();
      }));

      it('ionicLoading.show should be called', function () {
        sinon.assert.calledOnce($ionicLoading.show);
      });

      describe('when map is loaded', function () {

        it('DOM element with #map ID', function () {
          expect('#map').to.exist;
        });

        it('if successful, should ', function () {
          var mapElement = document.createElement('div');
          sinon.stub(document, 'getElementById');
          document.getElementById.withArgs('map').returns(mapElement);

          deferredGeolocation.resolve({
            coords:
            {
              latitude: -3.9866901,
              longitude: -79.19683399999997
            }
          });
          $rootScope.$digest();
          expect(controller.map).to.exist;
        });

        it('if unsuccessful, should show a popup', function () {
          deferredGeolocation.reject();
          $rootScope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });
      });
    });
  });
})();
