(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileController', ProfileController);

  function ProfileController(currentUser) {
    var pfVm = this;
    pfVm.user = currentUser;
  }
})();
