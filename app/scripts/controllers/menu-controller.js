(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('MenuController', MenuController);

  function MenuController(currentUser) {
    var menuVm = this;
    menuVm.user = currentUser;
  }
})();
