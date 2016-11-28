(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth) {
    var siteVm = this,
        currentUser = null;

    siteVm.userName = userName;

    $auth.validateUser()
      .then(function userAuthorized(user) {
        currentUser = user;
      });

    $rootScope.$on('$stateChangeStart', function(){
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

    function userName () {
      if (currentUser) {
        return currentUser.name || currentUser.nickname || currentUser.email;
      }
    }
  }
})();
