'use strict';

angular
  .module('porttare.controllers')
  .controller('PreController', PreController);

function PreController($auth,
                      $state,
                      $ionicPopup,
                      $localStorage,
                      LoginService,
                      APP) {
  var preVm = this;
  preVm.loginWithFB = LoginService.loginWithFB;
  var successState = APP.successState;

  function load(){
    if (!$localStorage.get('hasViewedTutorial')) {
      $state.go('intro');
    }
    $auth.validateUser().then(function(){
      $state.go(successState);
    });
  }

  load();

}
