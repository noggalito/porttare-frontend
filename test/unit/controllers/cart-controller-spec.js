(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('CartController', function () {
    var ctrl,
      $q,
      $controller,
      dependencies,
      $scope,
      $state,
      CartService,
      ModalService,
      $ionicLoading,
      deferCheckout,
      deferStateGo,
      $auth,
      $ionicPopup,
      $translate,
      translateDeferred,
      billingAddresses,
      deliveryAddresses;

    beforeEach(module('porttare.controllers'));
    beforeEach(module('porttare.services', function ($provide) {
      $provide.factory('CartService', function ($q) {
        deferCheckout = $q.defer();
        return {
          checkout: sinon.stub().returns(deferCheckout.promise)
        };
      });
      $provide.factory('$auth', function () {
        return {
          user: {
            customer_order: []
          }
        };
      });
      $provide.factory('ModalService', function () {
        return {
          showModal: sinon.stub(),
          closeModal: sinon.stub()
        };
      });
      $provide.value('APP', {
        deliveryMethods: []
      });
      $provide.factory('$ionicLoading', function () {
        return {
          show: sinon.stub(),
          hide: sinon.stub()
        };
      });
      $provide.factory('$ionicPopup', function ($q) {
        return {
          alert: sinon.stub().returns($q.defer().promise)
        };
      });
      $provide.factory('$state', function ($q) {
        deferStateGo = $q.defer();
        return {
          go: sinon.stub().returns(deferStateGo.promise)
        };
      });
      $provide.factory('$translate', function ($q) {
        translateDeferred = $q.defer();
        return sinon.stub().returns(translateDeferred.promise);
      });
    }));

    beforeEach(inject(function (_$q_, _$rootScope_, _$controller_,
      _CartService_, _$ionicPopup_,
      _$state_, _ModalService_, _$ionicLoading_, _$auth_, _APP_, _$translate_) {

      $scope = _$rootScope_.$new();
      $q = _$q_;
      $controller = _$controller_;
      $state = _$state_;
      CartService = _CartService_;
      ModalService = _ModalService_;
      deliveryAddresses = [];
      billingAddresses = [];
      $ionicLoading = _$ionicLoading_;
      $auth = _$auth_;
      $ionicPopup= _$ionicPopup_;
      $translate = _$translate_;

      dependencies = {
        $scope: $scope,
        CartService: CartService,
        ModalService: ModalService,
        $ionicPopup: $ionicPopup,
        $state: $state,
        $ionicLoading: $ionicLoading,
        $auth: $auth,
        deliveryAddresses: deliveryAddresses,
        billingAddresses: billingAddresses,
        APP: _APP_,
        $q: _$q_
      };

      ctrl = $controller('CartController', dependencies);
    }));

    describe('Order checkout', function () {
      it('Should start loading', function () {
        ctrl.runCheckout();
        sinon.assert.calledOnce($ionicLoading.show);

      });
      it('Should run checkout', function () {
        sinon.spy($scope, '$emit');
        ctrl.runCheckout();
        deferCheckout.resolve();
        $scope.$digest();
        sinon.assert.calledOnce($state.go);
      });
      it('Should run checkout', function () {
        ctrl.runCheckout();
        deferCheckout.resolve();
        $scope.$digest();
        deferStateGo.resolve();
        $scope.$digest();
        expect($auth.user.customer_order).to.be.equal(null);
        sinon.assert.calledOnce($ionicPopup.alert);
      });
      it('Should emit a broadcast', function () {
        sinon.spy($scope, '$emit');
        ctrl.runCheckout();
        deferCheckout.resolve();
        $scope.$digest();
        deferStateGo.resolve();
        $scope.$digest();
        sinon.assert.calledWith($scope.$emit, 'order-finished');
      });
    });
  });
})();
