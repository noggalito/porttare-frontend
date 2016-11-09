(function () {
  'use strict';

  describe('ProviderController', function () {
    var ctrl,
      $controller,
      dependencies,
      $rootScope,
      $ionicLoading,
      ProviderService,
      deferCreateProvider,
      deferStateGo,
      $state,
      $ionicPopup,
      $translate,
      stateRedirect,
      deferTranslate;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(
      function ($q,
        _$controller_,
        _$rootScope_) {

        deferCreateProvider = $q.defer();
        deferStateGo = $q.defer();
        deferTranslate = $q.defer();
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
        $translate = sinon.stub().returns(deferTranslate.promise);
        ProviderService = {
          createNewProvider: sinon.stub().returns(deferCreateProvider.promise)
        };
        stateRedirect = 'provider.items';
      })
    );

    describe('Manage options', function () {
      beforeEach(function () {
        dependencies = {
          $ionicLoading: $ionicLoading,
          ProviderService: ProviderService,
          $ionicPopup: $ionicPopup,
          $state: $state,
          $translate: $translate
        };

        ctrl = $controller('ProviderController', dependencies);
      });

      beforeEach(inject(function () {
        ctrl.selections = [];
      }));

      it('should add/remove element to array', function () {
        ctrl.toggleCheck({ value: 'test' });
        expect(ctrl.selections).to.not.empty; //jshint ignore:line
        ctrl.toggleCheck({ value: 'test' });
        expect(ctrl.selections).to.be.empty; //jshint ignore:line
      });

    });

    describe('Create provider', function () {
      beforeEach(function () {
        dependencies = {
          $ionicLoading: $ionicLoading,
          ProviderService: ProviderService,
          $ionicPopup: $ionicPopup,
          $state: $state,
          $translate: $translate
        };

        ctrl = $controller('ProviderController', dependencies);
      });

      beforeEach(inject(function () {
        ctrl.step = 2;
        ctrl.submit();
      }));

      it('ionicLoading.show should be called', function () {
        sinon.assert.calledOnce($ionicLoading.show);
      });

      it('if successful, ionicLoading.hide should be called', function () {
        deferCreateProvider.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });

      it('if successful, should change state', function () {
        deferCreateProvider.resolve();
        $rootScope.$digest();
        sinon.assert.alwaysCalledWithExactly($state.go, stateRedirect);
      });

      it('if successful, should show a alert', function () {
        deferCreateProvider.resolve();
        $rootScope.$digest();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicPopup.alert);
      });

      it('if unsuccessful, should show first template', function () {
        deferCreateProvider.reject({ data: { error: 'error' } });
        $rootScope.$digest();
        expect(ctrl.step).to.be.equal(1);
      });

    });
  });
})();
