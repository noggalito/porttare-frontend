'use strict';

angular
  .module('porttare.controllers')
  .controller('PreController', PreController);

function PreController($auth,
                      $state,
                      $ionicPopup,
                      $localStorage,
                      LoginService,
                      $location,
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
    }).catch(function () {
      var url = $location.absUrl();
      if(url.match(/error=access_denied&error_code=([^&]+)/)){
        var error = url.match(/error_reason=(\w+)/);
        console.log('xxx',error[1]);
        $ionicPopup.alert({
          title: 'Error',
          template: error[1]
        });
      }
    });
  }
  load();
}
