(function () {
  'use strict';

  describe('LoginController', function () {
    var $rootScope,
        controller,
        deferredLogin,
        deferPasswordReset,
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
      deferPasswordReset= $q.defer();
      $ionicPopup       = {
        alert: sinon.stub().returns(deferredLogin.promise),
        show: sinon.stub().returns(deferredLogin.promise)
      };
      $ionicLoading     = { show: sinon.stub(), hide: sinon.stub()};
      $state            = { go: sinon.stub() };
      $auth             = {
        submitLogin: sinon.stub()
                          .returns(deferredLogin.promise),
        requestPasswordReset: sinon.stub()
                          .returns(deferPasswordReset.promise)
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

    describe('#resetPassword', function () {
      beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
        controller.resetPassword();
      }));

      it('should call resetPassword on authService', function () {
        deferredLogin.resolve({ email: 'test1@test.com' });
        $rootScope.$digest();
        sinon.assert.alwaysCalledWithExactly($auth.requestPasswordReset, {
          email: 'test1@test.com'
        });
      });

      describe('when restore password is selected,', function () {
        var successMessage = 'Se enviaron las intrucciones al correo.';

        it('if successful, should show a message', function () {
          deferredLogin.promise.then(function () {
            deferPasswordReset.resolve();
          });
          deferredLogin.resolve();
          $rootScope.$digest();
          sinon.assert.calledWithMatch($ionicLoading.show, {
            template: successMessage
          });


        });

        it('if unsuccessful, should show an alert', function () {
          deferredLogin.promise.then(function () {
            deferPasswordReset.reject();
          });
          deferredLogin.resolve();
          $rootScope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });

      });
    });
  });
})();
