(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ModalService', ModalService);

  function ModalService($ionicModal) {

    var service = {
      showModal: showModal,
      closeModal: closeModal
    };

    var modalInstance = {
      scope: null
    };

    return service;

    function showModal(options){

      var myOptions = {
        animation: 'slide-in-up'
      };

      angular.extend(myOptions, options);

      modalInstance.scope = myOptions.parentScope;

      $ionicModal.fromTemplateUrl(myOptions.fromTemplateUrl, {
        scope: modalInstance.scope,
        animation: myOptions.animation,
        backdropClickToClose: false,
        hardwareBackButtonClose: false,
        focusFirstInput: true
      }).then(function(modal){
        modalInstance.scope.modal = modal;
        modalInstance.scope.modal.show();
      });
    }

    function closeModal(){
      modalInstance.scope.modal.remove();
      modalInstance.scope = null;
    }
  }
})();
