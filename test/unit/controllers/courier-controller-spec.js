(function () {
  'use strict';

  describe('CourierController', function () {
    var ctrl,
      $controller,
      dependencies,
      $rootScope,
      $ionicLoading,
      CourierService,
      deferCreateCourier,
      deferStateGo,
      $state,
      $ionicPopup,
      APP;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(
      function ($q,
        _$controller_,
        _$rootScope_) {

        deferCreateCourier = $q.defer();
        deferStateGo = $q.defer();
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $ionicLoading = {
          show: sinon.stub(),
          hide: sinon.stub()
        };
        $state = {
          go: sinon.stub().returns(deferStateGo.promise)
        };
        $ionicPopup = {
          alert: sinon.stub()
        };
        CourierService = {
          createNewCourier: sinon.stub().returns(deferCreateCourier.promise)
        };
        APP = {
          successState: 'app.categories.index'
        };
      })
    );

    describe('Manage options', function () {
      beforeEach(function () {
        dependencies = {
          $ionicLoading: $ionicLoading,
          $ionicPopup: $ionicPopup,
          $state: $state,
          CourierService: CourierService,
          APP: APP
        };

        ctrl = $controller('CourierController', dependencies);
      });

      it('should load array with options', function () {
        expect(ctrl.locations).to.not.empty;
        expect(ctrl.licenses).to.not.empty;
        expect(ctrl.mobilization).to.not.empty;
      });

    });

    describe('Create courier', function () {
      beforeEach(function () {
        dependencies = {
          $ionicLoading: $ionicLoading,
          $ionicPopup: $ionicPopup,
          $state: $state,
          CourierService: CourierService,
          APP: APP
        };

        ctrl = $controller('CourierController', dependencies);
      });

      beforeEach(inject(function () {
        ctrl.createCourier();
      }));

      it('ionicLoading.show should be called', function () {
        sinon.assert.calledOnce($ionicLoading.show);
      });

      it('if successful, ionicLoading.hide should be called', function () {
        deferCreateCourier.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });

      it('if successful, should change state', function () {
        var successState = 'app.categories.index';
        deferCreateCourier.resolve();
        $rootScope.$digest();
        sinon.assert.alwaysCalledWithExactly($state.go, successState);
      });

      it('if successful, should show a alert', function () {
        deferCreateCourier.resolve();
        $rootScope.$digest();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicPopup.alert);
      });

      it('if unsuccessful, should show a alert', function () {
        deferCreateCourier.reject({ data: { error: 'error' } });
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicPopup.alert);
      });

      it('if unsuccessful by validation error, should create a object', function () {
        ctrl.messages = {};
        var backendErrors = {
          errors: [
            { field: 'message' }
          ]
        };
        deferCreateCourier.reject(backendErrors);
        $rootScope.$digest();
        expect(ctrl.messages).to.not.empty;
      });
    });
  });
})();
