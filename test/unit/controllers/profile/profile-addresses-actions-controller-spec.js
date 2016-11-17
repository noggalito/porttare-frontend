(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('ProfileAddressesActionsController', function () {
    var ctrl,
      $controller,
      dependencies,
      $state,
      $ionicLoading,
      ProfileAddressesService,
      $ionicPopup,
      deferUpdateAddresses,
      deferCreateAddresses,
      deferStateGo,
      $rootScope,
      localData;

    beforeEach(module('porttare.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.factory('$ionicLoading', function () {
        return {
          show: sinon.stub(),
          hide: sinon.stub()
        };
      });
      $provide.factory('ProfileAddressesService', function ($q) {
        deferUpdateAddresses = $q.defer();
        deferCreateAddresses = $q.defer();
        return {
          updateAddresses: sinon.stub().returns(deferUpdateAddresses.promise),
          createAddresses: sinon.stub().returns(deferCreateAddresses.promise)
        };
      });
      $provide.factory('$ionicPopup', function () {
        return {
          alert: sinon.stub()
        };
      });
      $provide.factory('$state', function ($q) {
        deferStateGo = $q.defer();
        return {
          go: sinon.stub().returns(deferStateGo.promise)
        };
      });
    }));

    beforeEach(inject(function (_$rootScope_,
                                _$controller_,
                                _$state_,
                                _$ionicLoading_,
                                _ProfileAddressesService_,
                                _$ionicPopup_) {

      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $ionicLoading = _$ionicLoading_;
      ProfileAddressesService = _ProfileAddressesService_;
      $ionicPopup = _$ionicPopup_;
      $state = _$state_;
      localData = {
        nombre: 'test 1',
        id: '1'
      };

      dependencies = {
        data: localData,
        $state: $state,
        $ionicLoading: $ionicLoading,
        ProfileAddressesService: ProfileAddressesService,
        $ionicPopup: $ionicPopup,
      };

      ctrl = $controller('ProfileAddressesActionsController', dependencies);


    }));

    it('Should add data to scope', function () {
      expect(ctrl.addressFormData).to.equal(localData);
      expect(ctrl.inUpdateMode).to.be.equal(true);
    });

    describe('Create address', function () {

      beforeEach(function () {
        ctrl.inUpdateMode = false;
      });

      it('Should start loading', function () {
        ctrl.processAddress();
        sinon.assert.calledOnce($ionicLoading.show);
        sinon.assert.calledWithExactly($ionicLoading.show, {
          template: '{{::("globals.loading"|translate)}}'
        });
      });

      it('Should call to createAddresses', function () {
        ctrl.addressFormData = {
          nombre: 'test2',
          direccion_uno: 'test'
        };
        ctrl.processAddress();
        sinon.assert.calledOnce(ProfileAddressesService.createAddresses);
        sinon.assert.calledWithExactly(ProfileAddressesService.createAddresses, ctrl.addressFormData);
      });

      it('On success', function () {
        var addressListState = 'app.profile.addresses.index';
        ctrl.addressFormData = {
          nombre: 'test2',
          direccion_uno: 'test'
        };
        ctrl.processAddress();
        deferCreateAddresses.resolve();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($state.go);
        sinon.assert.calledWithExactly($state.go, addressListState);
      });

      it('On success: Should hide loading', function () {
        ctrl.processAddress();
        deferCreateAddresses.resolve();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });

      it('On error', function () {
        ctrl.processAddress();
        deferCreateAddresses.reject();
        $rootScope.$digest();
        sinon.assert.calledWithExactly($ionicPopup.alert, {
          title: 'Error',
          template: '{{::("globals.pleaseTryAgain"|translate)}}'
        });
      });

      it('On error: with data', function () {
        ctrl.processAddress();
        deferCreateAddresses.reject({
          error: 'error message'
        });
        $rootScope.$digest();
        sinon.assert.calledWithExactly($ionicPopup.alert, {
          title: 'Error',
          template: 'error message'
        });
      });

      it('On error: Should hide loading', function () {
        ctrl.processAddress();
        deferCreateAddresses.resolve();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });
    });

    describe('Update address', function () {

      beforeEach(function () {
        ctrl.inUpdateMode = true;
      });

      it('Should start loading', function () {
        ctrl.processAddress();
        sinon.assert.calledOnce($ionicLoading.show);
        sinon.assert.calledWithExactly($ionicLoading.show, {
          template: '{{::("globals.loading"|translate)}}'
        });
      });

      it('Should call to updateAddresses', function () {
        ctrl.addressFormData = {
          id: '1',
          nombre: 'test2',
          direccion_uno: 'test'
        };
        ctrl.processAddress();
        sinon.assert.calledOnce(ProfileAddressesService.updateAddresses);
        sinon.assert.calledWithExactly(ProfileAddressesService.updateAddresses, ctrl.addressFormData);
      });

      it('On success', function () {
        var addressListState = 'app.profile.addresses.index';
        ctrl.addressFormData = {
          nombre: 'test2',
          direccion_uno: 'test'
        };
        ctrl.processAddress();
        deferUpdateAddresses.resolve();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($state.go);
        sinon.assert.calledWithExactly($state.go, addressListState);
      });

      it('On success: Should hide loading', function () {
        ctrl.processAddress();
        deferUpdateAddresses.resolve();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });

      it('On error', function () {
        ctrl.processAddress();
        deferUpdateAddresses.reject();
        $rootScope.$digest();
        sinon.assert.calledWithExactly($ionicPopup.alert, {
          title: 'Error',
          template: '{{::("globals.pleaseTryAgain"|translate)}}'
        });
      });

      it('On error: with data', function () {
        ctrl.processAddress();
        deferUpdateAddresses.reject({
          error: 'error message'
        });
        $rootScope.$digest();
        sinon.assert.calledWithExactly($ionicPopup.alert, {
          title: 'Error',
          template: 'error message'
        });
      });

      it('On error: Should hide loading', function () {
        ctrl.processAddress();
        deferUpdateAddresses.resolve();
        deferStateGo.resolve();
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });

    });

  });
})();
