(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, $state, APP) {

    var successState = APP.successState;

    $rootScope.$on('$stateChangeStart', function(){
      $ionicLoading.show({
        template: 'cargando...'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      // Check if user is authenticated
      if (isSimpleState($state)) {
        $auth.validateUser()
          .then(function(){
            $ionicLoading.hide();
            $state.go(successState);
          })
          .catch(function () {
            $ionicLoading.hide();
          });
      } else {
        $ionicLoading.hide();
      }
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

    function isSimpleState(state) {
      var valid = !state.includes('app') &&
          !state.is('reset') &&
          !state.is('error');
      return valid;
    }
  }
})();
