'use strict';

angular
  .module('porttare.controllers')
  .controller('PreController', PreController);

function PreController($auth, $state, $ionicPopup, $localStorage, LoginService) {
  var preVm = this;
  preVm.loginWithFB = LoginService.loginWithFB;
  var successState = 'app.category';

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
