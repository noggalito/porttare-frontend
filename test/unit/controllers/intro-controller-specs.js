(function () {
  'use strict';

  describe('IntroController', function () {
    var ctrl, $controller, dependencies, $ionicSlideBoxDelegate, $state, $localStorage, $window;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(
      function (_$controller_, _$window_) {
        $controller = _$controller_;
        $window = _$window_;
        $localStorage = {};
        $localStorage.set = sinon.stub();
        $localStorage.get = sinon.stub();
        $state = { go: sinon.stub()};
        $ionicSlideBoxDelegate = { previous: sinon.stub(), next: sinon.stub()};
      })
    );

    afterEach(function(){
      $window.localStorage.clear();
    });

    describe('#listeners', function(){
      beforeEach(function(){

        dependencies = {
          $ionicSlideBoxDelegate: $ionicSlideBoxDelegate,
          $state: $state,
          $localStorage: $localStorage
        };

        ctrl = $controller('IntroController', dependencies);
      });

      it('should call $localstorage and $state.go on startApp()', function(){
        ctrl.startApp();
        sinon.assert.calledOnce($localStorage.set);
        sinon.assert.calledOnce($state.go);
      });

      it('should call $ionicSlideBoxDelegate.next on next()', function(){
        ctrl.next();
        sinon.assert.calledOnce($ionicSlideBoxDelegate.next);
      });

      it('should call $ionicSlideBoxDelegate.previous on previous()', function(){
        ctrl.previous();
        sinon.assert.calledOnce($ionicSlideBoxDelegate.previous);
      });

      it('should set slideIndex to the param of slideChanged()', function(){
        ctrl.slideChanged(2);
        chai.expect(ctrl.slideIndex).to.deep.equals(2);
      });

    });

  });
})();
