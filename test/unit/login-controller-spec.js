(function () {
  'use strict';

  describe('LoginController', function () {
    var $rootScope,
        controller,
        deferredLogin,
        $auth,
        $state,
        $scope,
        $ionicPopup,
        $ionicLoading;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(
      function ($q,
                $rootScope,
                $controller) {

      deferredLogin     = $q.defer();
      $ionicPopup       = { alert: sinon.stub() };
      $ionicLoading     = { show: sinon.stub(), hide: sinon.stub()};
      $state            = { go: sinon.stub() };
      $auth             = {
        submitLogin: sinon.stub()
                          .returns(deferredLogin.promise)
      };

      controller = $controller('LoginController', {
        '$ionicPopup': $ionicPopup,
        '$ionicLoading': $ionicLoading,
        '$state': $state,
        '$auth': $auth,
        '$scope': $scope
      });
    }));

    describe('#login', function() {

      beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
        controller.loginForm.email = 'test1';
        controller.loginForm.password = 'password1';
        controller.login();
      }));

      it('should call submitLogin on authService', function() {
        sinon.assert.alwaysCalledWithExactly($auth.submitLogin, {
          email: 'test1',
          password: 'password1'
        });
      });

      describe('when the login is executed,', function() {
        var successState = 'app.playlists';

        it('if successful, should change state', function() {
          deferredLogin.resolve();
          $rootScope.$digest();

          sinon.assert.alwaysCalledWithExactly($state.go, successState);
        });

        it('if unsuccessful, should show a popup', function() {
          deferredLogin.reject({ errors: [] });
          $rootScope.$digest();

          sinon.assert.calledOnce($ionicPopup.alert);
        });

        it('if already authenticated, change state', function () {
          $rootScope.$emit('auth:validation-success');

          sinon.assert.alwaysCalledWithExactly($state.go, successState);
        });
      });
    });
  });
})();
