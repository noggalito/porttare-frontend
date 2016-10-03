(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProfileController', ProfileController);

  function ProfileController(
                            ) {
    var profileVm = this;
    profileVm.message = 'test';
  }
})();
