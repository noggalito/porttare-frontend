(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('TermsAndCondController', TermsAndCondController);

  function TermsAndCondController($q, $auth, APP, UserAuthService, $state, $ionicLoading, $ionicPopup){

    var terCondVm = this;
    terCondVm.acceptTermsCond = acceptTermsCond;

    function acceptTermsCond() {
      var data = $auth.user;
      UserAuthService.acceptTermsCond(data)
        .then(function success() {
          $state.go(APP.successState)
            .then( function (){
              $ionicLoading.hide();
          });
        }, function error(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Error',
            template: '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
    }
  }
})();
