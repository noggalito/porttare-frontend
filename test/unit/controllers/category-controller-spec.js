(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('CategoryController', function () {
    var ctrl,
      resolve,
      dependencies,
      $controller,
      $scope;

    beforeEach(module('porttare.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.value('data', {
        provider_category: {
          provider_profiles: []
        }
      });
    }));

    beforeEach(inject(function (_$rootScope_,
        _$controller_,
        data) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        resolve = data;
      })
    );

    beforeEach(function () {
      dependencies = {
        data: resolve
      };

      ctrl = $controller('CategoryController', dependencies);
    });

    describe('on init', function () {
      it('category should be object', function () {
        expect(ctrl.category).to.be.an('object');
      });

      it('providers should exist', function () {
        expect(ctrl.providers).to.exist; //jshint ignore:line
      });

    });

  });
})();
