(function () {
  'use strict';

  describe('SiteController', function () {
    var ctrl, $controller, dependencies, $rootScope, $ionicLoading, $auth;

    var LoginService,
        deferLoginWithFB,
        APP,
        $state;

    beforeEach(module('porttare.controllers'));

    beforeEach(inject(
      function ($q,
                _$controller_,
                _$rootScope_) {

        deferLoginWithFB  = $q.defer();
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $ionicLoading = { show: sinon.stub(), hide: sinon.stub()};
        $state        = {
          go: sinon.stub(),
          includes: function(){
            return true;
          }
        };
        LoginService  = {
          loginWithFB: sinon.stub().returns(deferLoginWithFB.promise)
        };
        APP = {
          successState: 'app.categories.index'
        };
      })
    );

    describe('#listeners', function(){
      beforeEach(function(){
        $auth = { user: {id: 1}};

        dependencies = {
          $ionicLoading: $ionicLoading,
          $auth: $auth,
          LoginService: LoginService,
          $state: $state,
          APP: APP
        };

        ctrl = $controller('SiteController', dependencies);
      });

      it('should call $ionicLoading.show in stateChangeStart', function(){
        $rootScope.$broadcast('$stateChangeStart', {name: 'fakestate'});
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.show);
      });

      it('should call $ionicLoading.hode in stateChangeSuccess', function(){
        $rootScope.$broadcast('$stateChangeSuccess');
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });

      it('should call $ionicLoading.hode in stateChangeError', function(){
        $rootScope.$broadcast('$stateChangeError');
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });
    });

    describe('without user', function(){
      beforeEach(function(){
        $auth = { user: {}};

        dependencies = {
          $ionicLoading: $ionicLoading,
          $auth: $auth,
          LoginService: LoginService,
          $state: $state,
          APP: APP
        };
        ctrl = $controller('SiteController', dependencies);
      });

      it('should call $ionicLoading.show in stateChangeStart to login and no user', function(){
        $rootScope.$broadcast('$stateChangeStart', {name: 'login'});
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.show);
      });
    });

  });
})();
