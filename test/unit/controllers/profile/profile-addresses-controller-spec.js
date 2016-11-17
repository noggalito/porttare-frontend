(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('ProfileAddressesController', function () {
    var ctrl,
      $controller,
      dependencies,
      data,
      $state;

    beforeEach(module('porttare.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.factory('$state', function(){
        return {
          go: sinon.stub()
        };
      });
    }));

    beforeEach(inject(function ($q,
                                _$controller_,
                                _$state_) {

        $controller = _$controller_;
        $state = _$state_;
        data = {
          customer_addresses: [{
            nombre: 'test 1'
          }]
        };
        dependencies = {
          data: data,
          $state: $state,
        };

        ctrl = $controller('ProfileAddressesController', dependencies);
      }));

    it('Should add data to scope', function () {
      expect(ctrl.addresses).to.equal(data.customer_addresses);
    });

    it('Should redirect to view: update', function () {
      var id = '1',
          updateView = 'app.profile.addresses.update';

      ctrl.redirectToUpdateAddressView(id);
      sinon.assert.calledOnce($state.go);
      sinon.assert.calledWith($state.go, updateView, { id: id });
    });

    it('Should not redirect', function () {
      var id = '1',
          updateView = 'app.profile.addresses.update';

      ctrl.redirectToUpdateAddressView();
      sinon.assert.neverCalledWith($state.go, updateView, { id: id });
    });

    it('Should redirect to view: new', function () {
      var newView = 'app.profile.addresses.new';
      ctrl.redirectToNewAddressView();
      sinon.assert.calledOnce($state.go);
      sinon.assert.calledWith($state.go, newView);
    });
  });
})();
