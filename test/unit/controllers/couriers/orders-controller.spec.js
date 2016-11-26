(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('OrdersController', function () {
    var ctrl,
      $translate,
      $controller,
      $rootScope,
      $scope,
      dependencies,
      deferCreateProvider,
      deferStateGo,
      deferTranslate,
      orders;

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
        $scope = $rootScope.$new();
        $translate = sinon.stub().returns(deferTranslate.promise);
        orders = {
          shipping_requests: []
        };
        dependencies = {
          orders: orders,
          $translate: $translate
        };
        ctrl = $controller('OrdersController', dependencies);
      })
    );

    describe('on load', function(){
      it('should controller.orders be the same of data', function(){
        chai.expect(ctrl.orders).to.deep.equals(dependencies.orders.shipping_requests);
      });
    });

  });
})();
