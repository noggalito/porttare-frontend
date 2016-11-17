(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('ProfileController', function () {
    var ctrl,
      $controller,
      dependencies,
      userData;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(function ($q, _$controller_) {
        userData = {
          name: 'test'
        };
        $controller = _$controller_;
        dependencies = {
          currentUser: userData
        };

        ctrl = $controller('ProfileController', dependencies);
      }));

    it('Should add data to scope', function () {
      expect(ctrl.user).to.equal(userData);
    });
  });
})();
