(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('DispatcherDetailController', DispatchersController);

  function DispatchersController(DispatchersService,
                             ModalService,
                             $ionicLoading,
                             $ionicPopup,
                             $scope,
                             $stateParams,
                             $localStorage) {
    var dispatcherVm = this;
    dispatcherVm.query = '';
    var index = $stateParams.idx;
    dispatcherVm.dispatcher = $localStorage.getObject('dispatcher');

  }
})();
