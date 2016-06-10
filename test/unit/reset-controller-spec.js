(function () {
  'use strict';

  describe('ResetController', function () {
    var $rootScope,
        controller,
        deferredReset,
        $auth,
        $state,
        $ionicPopup,
        deferredStateGo,
        $ionicLoading,
        $window;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(
      function ($q,
                $rootScope,
                $controller) {

      deferredReset  = $q.defer();
      deferredStateGo   = $q.defer();
      $ionicPopup       = { alert: sinon.stub() };
      $ionicLoading     = { show: sinon.stub(), hide: sinon.stub()};
      $state            = { go: sinon.stub().returns(deferredStateGo.promise),
                            href: sinon.stub().returns('#/app/playlists')};
      $auth             = {
        updatePassword: sinon.stub()
                          .returns(deferredReset.promise)
      };
      $window           = {
        location: {href: '#/reset'}
      };

      controller = $controller('ResetController', {
        '$ionicPopup': $ionicPopup,
        '$ionicLoading': $ionicLoading,
        '$state': $state,
        '$auth': $auth,
        '$window': $window
      });
    }));

    describe('#reset_password', function() {

      beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
        controller.updatePassword();
      }));

      it('ionicLoading.show should be called', function() {
        sinon.assert.calledOnce($ionicLoading.show);
      });

      describe('when reset password is executed,', function() {
        var successState = 'app.playlists';

        it('if successful, should change state', function() {
          deferredReset.resolve();
          $rootScope.$digest();
          $rootScope.$emit('auth:password-change-success');
          sinon.assert.alwaysCalledWithExactly($state.href, successState);
          expect($window.location.href).to.equal('/#/app/playlists');
        });

        it('if unsuccessful, should show a popup', function() {
          deferredReset.reject({ errors: [] });
          $rootScope.$digest();
          var errors = { errors: {full_messages:['message']} };
          $rootScope.$emit('auth:password-change-error', errors);
          sinon.assert.calledOnce($ionicPopup.alert);
        });
      });
    });
  });
})();
